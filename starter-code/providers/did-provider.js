/**
 * D-ID Avatar Provider
 * https://docs.d-id.com/reference/create-a-talk
 *
 * D-ID generates a talking-head video from a photo + text.
 * The user can supply their own presenter photo URL in settings.
 *
 * API key must be set in Settings → Avatar Engine → D-ID API Key.
 */

(function (global) {
  'use strict';

  var BASE = 'https://api.d-id.com';

  function DIDProvider() {
    this.name          = 'did';
    this._key          = null;
    this._presenterUrl = null;
    this._voiceId      = null;
    this._videoEl      = null;
  }

  DIDProvider.prototype.init = function (opts) {
    this._key          = (opts.config && opts.config.didApiKey)         || '';
    this._presenterUrl = (opts.config && opts.config.didPresenterUrl)   ||
      'https://create-images-results.d-id.com/DefaultPresenters/Noelle_f/image.jpeg';
    this._voiceId      = (opts.config && opts.config.didVoiceId)        || 'en-US-JennyNeural';
    this._videoEl      = opts.videoEl || null;
    if (!this._key) throw new Error('D-ID API key not configured');
  };

  DIDProvider.prototype.isAvailable = function (config) {
    return !!(config && config.didApiKey);
  };

  // ── Auth header ───────────────────────────────────────────────────────────
  DIDProvider.prototype._auth = function () {
    return 'Basic ' + btoa(this._key + ':');
  };

  // ── Connectivity test ─────────────────────────────────────────────────────
  DIDProvider.prototype.test = async function () {
    var res = await fetch(BASE + '/talks?limit=1', {
      headers: { Authorization: this._auth() }
    });
    if (!res.ok) throw new Error('D-ID ping failed: HTTP ' + res.status);
  };

  // ── Main present ──────────────────────────────────────────────────────────
  DIDProvider.prototype.present = async function (opts) {
    if (!this._key) throw new Error('D-ID API key not configured');
    var text = (opts && (opts.simplified || opts.text)) || '';
    if (!text.trim()) return;

    // Create a talk
    var createRes = await fetch(BASE + '/talks', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': this._auth()
      },
      body: JSON.stringify({
        source_url: this._presenterUrl,
        script: {
          type:     'text',
          input:    text,
          provider: {
            type:     'microsoft',
            voice_id: this._voiceId
          }
        },
        config: {
          stitch:   true,
          fluent:   true,
          pad_audio: 0
        }
      })
    });

    if (!createRes.ok) {
      var errBody = await createRes.text();
      throw new Error('D-ID create failed: ' + createRes.status + ' ' + errBody);
    }

    var createData = await createRes.json();
    var talkId     = createData.id;
    if (!talkId) throw new Error('D-ID: no talk id returned');

    // Poll until done
    var videoUrl = await this._pollTalk(talkId);

    if (this._videoEl) {
      this._videoEl.src = videoUrl;
      this._videoEl.style.display = 'block';
      await this._videoEl.play().catch(function () {});
    }
  };

  DIDProvider.prototype._pollTalk = function (talkId) {
    var self = this;
    return new Promise(function (resolve, reject) {
      var attempts = 0;
      function check() {
        if (attempts++ > 40) { reject(new Error('D-ID poll timed out')); return; }
        fetch(BASE + '/talks/' + talkId, {
          headers: { Authorization: self._auth() }
        })
        .then(function (r) { return r.json(); })
        .then(function (d) {
          if (d.status === 'done')  resolve(d.result_url);
          else if (d.status === 'error') reject(new Error('D-ID talk error: ' + (d.error || '')));
          else setTimeout(check, 2500);
        })
        .catch(reject);
      }
      check();
    });
  };

  // ── Stop ──────────────────────────────────────────────────────────────────
  DIDProvider.prototype.stop = function () {
    if (this._videoEl) {
      this._videoEl.pause();
      this._videoEl.src = '';
      this._videoEl.style.display = 'none';
    }
  };

  global.DIDProvider = DIDProvider;

})(window);
