/**
 * HeyGen Avatar Provider
 * https://docs.heygen.com/reference/streaming-new-v1
 *
 * Supports two modes:
 *   1. Streaming API (WebRTC) — near real-time, preferred
 *   2. Video Generate API     — async fallback
 *
 * API key must be set in Settings → Avatar Engine → HeyGen API Key.
 * NEVER hardcode keys here.
 */

(function (global) {
  'use strict';

  function HeyGenProvider() {
    this.name      = 'heygen';
    this._key      = null;
    this._avatarId = null;
    this._voiceId  = null;
    this._videoEl  = null;
    this._sessionId   = null;
    this._peerConn    = null;
    this._dataChannel = null;
  }

  HeyGenProvider.prototype.init = function (opts) {
    this._key      = (opts.config && opts.config.heygenApiKey)   || '';
    this._avatarId = (opts.config && opts.config.heygenAvatarId) || 'Angela-inblackskirt-20220820';
    this._voiceId  = (opts.config && opts.config.heygenVoiceId)  || 'en-US-JennyNeural';
    this._videoEl  = opts.videoEl || null;
    if (!this._key) throw new Error('HeyGen API key not configured');
  };

  HeyGenProvider.prototype.isAvailable = function (config) {
    return !!(config && config.heygenApiKey);
  };

  // ── Connectivity test ─────────────────────────────────────────────────────
  HeyGenProvider.prototype.test = async function () {
    var res = await fetch('https://api.heygen.com/v2/avatars?limit=1', {
      headers: { 'X-Api-Key': this._key }
    });
    if (!res.ok) throw new Error('HeyGen ping failed: HTTP ' + res.status);
  };

  // ── Main present ──────────────────────────────────────────────────────────
  HeyGenProvider.prototype.present = async function (opts) {
    if (!this._key) throw new Error('HeyGen API key not configured');
    var text = (opts && (opts.simplified || opts.text)) || '';
    if (!text.trim()) return;

    // Try streaming first; fall back to async generate
    try {
      await this._streamPresent(text);
    } catch (e) {
      console.warn('[HeyGen] Streaming failed, trying async generate:', e.message);
      await this._generateVideo(text);
    }
  };

  // ── Mode 1: WebRTC Streaming ──────────────────────────────────────────────
  HeyGenProvider.prototype._streamPresent = async function (text) {
    // If a session is already live, just send a new task
    if (this._sessionId && this._peerConn && this._peerConn.connectionState === 'connected') {
      return this._sendTask(text);
    }

    // Create new streaming session
    var sessRes = await fetch('https://api.heygen.com/v1/streaming.new', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': this._key },
      body: JSON.stringify({
        quality:     'high',
        avatar_name: this._avatarId,
        voice:       { voice_id: this._voiceId },
        video_encoding: 'H264'
      })
    });
    if (!sessRes.ok) {
      var errBody = await sessRes.text();
      throw new Error('HeyGen streaming.new failed: ' + sessRes.status + ' ' + errBody);
    }
    var sessData = await sessRes.json();
    this._sessionId = sessData.data.session_id;
    var sdpOffer    = sessData.data.sdp;
    var iceServers  = sessData.data.ice_servers2 || sessData.data.ice_servers || [];

    // Build peer connection
    var self = this;
    this._peerConn = new RTCPeerConnection({ iceServers: iceServers });

    this._peerConn.ontrack = function (e) {
      if (self._videoEl && e.streams && e.streams[0]) {
        self._videoEl.srcObject = e.streams[0];
        self._videoEl.style.display = 'block';
        self._videoEl.play().catch(function () {});
      }
    };

    // ICE candidates → send to HeyGen
    var iceCandidates = [];
    this._peerConn.onicecandidate = function (e) {
      if (e.candidate) iceCandidates.push(e.candidate);
    };

    await this._peerConn.setRemoteDescription(new RTCSessionDescription(sdpOffer));
    var answer = await this._peerConn.createAnswer();
    await this._peerConn.setLocalDescription(answer);

    // Wait briefly for ICE gathering
    await new Promise(function (resolve) { setTimeout(resolve, 500); });

    // Start session
    var startRes = await fetch('https://api.heygen.com/v1/streaming.start', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': this._key },
      body: JSON.stringify({ session_id: this._sessionId, sdp: answer })
    });
    if (!startRes.ok) throw new Error('HeyGen streaming.start failed: ' + startRes.status);

    // Now send the text task
    await this._sendTask(text);
  };

  HeyGenProvider.prototype._sendTask = async function (text) {
    if (!this._sessionId) return;
    var res = await fetch('https://api.heygen.com/v1/streaming.task', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': this._key },
      body: JSON.stringify({
        session_id: this._sessionId,
        text:       text,
        task_type:  'repeat'
      })
    });
    if (!res.ok) console.warn('[HeyGen] streaming.task failed:', res.status);
  };

  // ── Mode 2: Async Video Generation ───────────────────────────────────────
  HeyGenProvider.prototype._generateVideo = async function (text) {
    var genRes = await fetch('https://api.heygen.com/v2/video/generate', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': this._key },
      body: JSON.stringify({
        video_inputs: [{
          character: { type: 'avatar', avatar_id: this._avatarId, scale: 1.0 },
          voice:     { type: 'text',   input_text: text, voice_id: this._voiceId }
        }],
        dimension: { width: 1280, height: 720 },
        aspect_ratio: '16:9'
      })
    });
    if (!genRes.ok) throw new Error('HeyGen generate failed: ' + genRes.status);
    var genData = await genRes.json();
    var videoId = genData.data && genData.data.video_id;
    if (!videoId) throw new Error('HeyGen: no video_id in response');

    var videoUrl = await this._pollVideo(videoId);
    if (this._videoEl) {
      this._videoEl.src = videoUrl;
      this._videoEl.style.display = 'block';
      await this._videoEl.play().catch(function () {});
    }
  };

  HeyGenProvider.prototype._pollVideo = function (videoId) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var attempts = 0;
      function check() {
        if (attempts++ > 40) { reject(new Error('HeyGen video timed out')); return; }
        fetch('https://api.heygen.com/v1/video_status.get?video_id=' + videoId, {
          headers: { 'X-Api-Key': self._key }
        })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          var s = d.data && d.data.status;
          if (s === 'completed') resolve(d.data.video_url);
          else if (s === 'failed') reject(new Error('HeyGen video failed: ' + (d.data.error || '')));
          else setTimeout(check, 2500);
        })
        .catch(reject);
      }
      check();
    });
  };

  // ── Stop / cleanup ─────────────────────────────────────────────────────────
  HeyGenProvider.prototype.stop = function () {
    if (this._sessionId) {
      fetch('https://api.heygen.com/v1/streaming.stop', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', 'X-Api-Key': this._key },
        body: JSON.stringify({ session_id: this._sessionId })
      }).catch(function () {});
      this._sessionId = null;
    }
    if (this._peerConn) { this._peerConn.close(); this._peerConn = null; }
    if (this._videoEl) {
      this._videoEl.srcObject = null;
      this._videoEl.src       = '';
      this._videoEl.style.display = 'none';
    }
  };

  global.HeyGenProvider = HeyGenProvider;

})(window);
