/**
 * NVIDIA ACE Avatar Provider
 * https://developer.nvidia.com/ace
 *
 * NVIDIA ACE (Avatar Cloud Engine) is an enterprise-grade AI avatar system
 * supporting Audio2Face, Riva TTS, and real-time animation.
 *
 * This connector is architecture-ready. You need:
 *   - An NVIDIA Cloud Functions endpoint (or on-prem deployment)
 *   - An NVIDIA NGC API token
 *
 * Configure in Settings → Avatar Engine → NVIDIA ACE.
 */

(function (global) {
  'use strict';

  function NVIDIAProvider() {
    this.name      = 'nvidia';
    this._endpoint = null;
    this._token    = null;
    this._avatarId = null;
    this._videoEl  = null;
  }

  NVIDIAProvider.prototype.init = function (opts) {
    this._endpoint = (opts.config && opts.config.nvidiaEndpoint) || '';
    this._token    = (opts.config && opts.config.nvidiaToken)    || '';
    this._avatarId = (opts.config && opts.config.nvidiaAvatarId) || 'claire';
    this._videoEl  = opts.videoEl || null;
    if (!this._endpoint || !this._token) {
      throw new Error('NVIDIA ACE: endpoint and token are required');
    }
  };

  NVIDIAProvider.prototype.isAvailable = function (config) {
    return !!(config && config.nvidiaEndpoint && config.nvidiaToken);
  };

  // ── Connectivity test ─────────────────────────────────────────────────────
  NVIDIAProvider.prototype.test = async function () {
    var res = await fetch(this._endpoint + '/health', {
      headers: { Authorization: 'Bearer ' + this._token }
    });
    if (!res.ok) throw new Error('NVIDIA ACE health check failed: ' + res.status);
  };

  // ── Main present ──────────────────────────────────────────────────────────
  NVIDIAProvider.prototype.present = async function (opts) {
    if (!this._endpoint || !this._token) {
      throw new Error('NVIDIA ACE not configured');
    }
    var text = (opts && (opts.simplified || opts.text)) || '';
    if (!text.trim()) return;

    // POST to your NVIDIA ACE deployment
    // The response schema depends on your specific deployment.
    // Adjust the request/response handling to match your environment.
    var res = await fetch(this._endpoint + '/v1/ace/animate', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + this._token
      },
      body: JSON.stringify({
        text:      text,
        language:  (opts && opts.lang) || 'ms',
        avatar_id: this._avatarId,
        style:     'bim_presenter',
        quality:   'hd'
      })
    });

    if (!res.ok) throw new Error('NVIDIA ACE request failed: ' + res.status);
    var data = await res.json();

    if (data.video_url && this._videoEl) {
      this._videoEl.src = data.video_url;
      this._videoEl.style.display = 'block';
      await this._videoEl.play().catch(function () {});
    } else if (data.stream_url && this._videoEl) {
      this._videoEl.src = data.stream_url;
      this._videoEl.style.display = 'block';
      await this._videoEl.play().catch(function () {});
    }
  };

  // ── Stop ──────────────────────────────────────────────────────────────────
  NVIDIAProvider.prototype.stop = function () {
    if (this._videoEl) {
      this._videoEl.pause();
      this._videoEl.src = '';
      this._videoEl.style.display = 'none';
    }
  };

  global.NVIDIAProvider = NVIDIAProvider;

})(window);
