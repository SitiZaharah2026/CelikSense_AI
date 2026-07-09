/**
 * AvatarEngine — Professional AI Avatar Abstraction Layer
 * CelikSense AI · BIM Sign Language Platform
 *
 * Architecture:
 *   AvatarEngine.present({ text, simplified, word, poses, lang })
 *       │
 *       ▼
 *   Active Provider (HeyGen → D-ID → NVIDIA → RPM → Placeholder)
 *       │
 *       ▼
 *   <video> or <canvas> in the presenter panel
 *
 * Providers are hot-swappable. If one fails, the engine auto-fails over
 * to the next available provider without breaking the UI.
 *
 * Settings are stored in localStorage under key 'cs_avatar_engine'.
 * API keys are NEVER hardcoded here — users must enter them in Settings.
 */

(function (global) {
  'use strict';

  // ── Priority order — higher index = lower priority ──────────────────────
  var PROVIDER_PRIORITY = ['heygen', 'did', 'nvidia', 'rpm', 'placeholder'];

  // ── Internal state ────────────────────────────────────────────────────────
  var _config   = {};
  var _provider = null;
  var _videoEl  = null;
  var _canvasEl = null;
  var _statusEl = null;
  var _initialized = false;

  // ── Config persistence ────────────────────────────────────────────────────
  function _loadConfig() {
    try { _config = JSON.parse(localStorage.getItem('cs_avatar_engine') || '{}'); }
    catch (e) { _config = {}; }
  }

  function _saveConfig(patch) {
    if (patch) Object.assign(_config, patch);
    try { localStorage.setItem('cs_avatar_engine', JSON.stringify(_config)); }
    catch (e) {}
  }

  // ── Status display ────────────────────────────────────────────────────────
  function _setStatus(msg, isError) {
    if (_statusEl) {
      _statusEl.textContent = msg;
      _statusEl.style.color = isError ? '#f87171' : 'rgba(255,255,255,0.4)';
    }
  }

  // ── Provider factory ──────────────────────────────────────────────────────
  function _makeProvider(name) {
    switch (name) {
      case 'heygen':      return global.HeyGenProvider   ? new global.HeyGenProvider()   : null;
      case 'did':         return global.DIDProvider       ? new global.DIDProvider()       : null;
      case 'nvidia':      return global.NVIDIAProvider    ? new global.NVIDIAProvider()    : null;
      case 'rpm':         return global.RPMProvider       ? new global.RPMProvider()       : null;
      case 'placeholder': return new PlaceholderProvider();
      default:            return new PlaceholderProvider();
    }
  }

  function _initProvider(name) {
    var p = _makeProvider(name);
    if (!p) return null;
    try {
      p.init({ config: _config, videoEl: _videoEl, canvasEl: _canvasEl });
      return p;
    } catch (e) {
      console.warn('[AvatarEngine] Provider "' + name + '" init failed:', e.message);
      return null;
    }
  }

  // ── Failover ──────────────────────────────────────────────────────────────
  async function _present_with_failover(opts) {
    var preferred = _config.provider || 'placeholder';
    var startIdx  = PROVIDER_PRIORITY.indexOf(preferred);
    if (startIdx < 0) startIdx = PROVIDER_PRIORITY.length - 1;

    for (var i = startIdx; i < PROVIDER_PRIORITY.length; i++) {
      var name = PROVIDER_PRIORITY[i];
      var p    = _initProvider(name);
      if (!p) continue;

      if (i > startIdx) {
        _setStatus('Switching to backup avatar provider: ' + name + '…');
        if (AvatarEngine.onProviderSwitch) AvatarEngine.onProviderSwitch(name);
        var banner = document.getElementById('aeFailoverBanner');
        if (banner) {
          banner.textContent = 'Switching to backup avatar provider: ' + name + '…';
          banner.style.display = 'block';
          setTimeout(function () { banner.style.display = 'none'; }, 4000);
        }
      }

      try {
        await p.present(opts);
        _provider = p;
        _setStatus('');
        return;
      } catch (e) {
        console.warn('[AvatarEngine] "' + name + '" present() failed:', e.message);
        _setStatus('Provider ' + name + ' failed, trying next…', true);
      }
    }
    _setStatus('Avatar unavailable. Please check settings.', true);
  }

  // ══════════════════════════════════════════════════════════════════════════
  // PlaceholderProvider — always-available canvas fallback
  // Delegates to AvatarRenderer (sign-language.html's canvas presenter)
  // ══════════════════════════════════════════════════════════════════════════
  function PlaceholderProvider() { this.name = 'placeholder'; }

  PlaceholderProvider.prototype.init = function (opts) {
    this._canvasEl = opts.canvasEl;
    if (global.AvatarRenderer) AvatarRenderer.init();
  };

  PlaceholderProvider.prototype.isAvailable = function () { return true; };

  PlaceholderProvider.prototype.present = function (opts) {
    if (global.AvatarRenderer) {
      AvatarRenderer.show();
      if (opts && opts.pose) AvatarRenderer.setPose(opts.pose);
    }
    return Promise.resolve();
  };

  PlaceholderProvider.prototype.stop = function () {
    if (global.AvatarRenderer) AvatarRenderer.hide();
  };

  // ══════════════════════════════════════════════════════════════════════════
  // PUBLIC API
  // ══════════════════════════════════════════════════════════════════════════
  var AvatarEngine = {

    /** Provider names in priority order */
    PROVIDERS: PROVIDER_PRIORITY,

    /** Friendly display names for UI */
    PROVIDER_LABELS: {
      heygen:      'HeyGen Avatar API',
      did:         'D-ID API',
      nvidia:      'NVIDIA ACE',
      rpm:         'Ready Player Me',
      placeholder: 'Canvas Presenter (Offline)'
    },

    /**
     * init(opts)
     * Call once on page load.
     * opts: { videoEl, canvasEl, statusEl }
     */
    init: function (opts) {
      opts = opts || {};
      _loadConfig();
      _videoEl  = opts.videoEl  || document.getElementById('aeVideoEl');
      _canvasEl = opts.canvasEl || document.getElementById('avatarCanvas');
      _statusEl = opts.statusEl || document.getElementById('aeProviderStatus');
      _initialized = true;

      var preferred = _config.provider || 'placeholder';
      _provider = _initProvider(preferred);
      if (!_provider) _provider = _initProvider('placeholder');

      _setStatus('');
    },

    /**
     * present(opts)
     * Main entry point for avatar presentation.
     * opts: {
     *   text       — original text
     *   simplified — AI-simplified text (preferred for speech)
     *   word       — current BIM word being signed
     *   poses      — array of BIM pose objects
     *   pose       — current BIM pose object
     *   lang       — 'ms' or 'en'
     * }
     */
    present: async function (opts) {
      if (!_initialized) this.init();
      await _present_with_failover(opts || {});
    },

    /** Stop the current provider */
    stop: function () {
      if (_provider && _provider.stop) _provider.stop();
    },

    /** Read config (no API keys returned) */
    getConfig: function () {
      var safe = Object.assign({}, _config);
      // Mask keys for UI display
      if (safe.heygenApiKey) safe.heygenApiKey = '●●●●●●●●';
      if (safe.didApiKey)    safe.didApiKey    = '●●●●●●●●';
      if (safe.nvidiaToken)  safe.nvidiaToken  = '●●●●●●●●';
      return safe;
    },

    /** Write config — pass only keys you want to update */
    setConfig: function (patch) { _saveConfig(patch); },

    /** Get the name of the currently active provider */
    getActiveProvider: function () {
      return (_provider && _provider.name) || _config.provider || 'placeholder';
    },

    /**
     * setProvider(name)
     * Switch provider at runtime — engine re-initialises the new provider.
     */
    setProvider: function (name) {
      _saveConfig({ provider: name });
      _provider = _initProvider(name);
      if (!_provider) _provider = _initProvider('placeholder');
    },

    /**
     * isProviderAvailable(name)
     * Returns true if the provider JS is loaded AND required config is present.
     */
    isProviderAvailable: function (name) {
      var p = _makeProvider(name);
      return p ? p.isAvailable(_config) : false;
    },

    /**
     * testProvider(name)
     * Async: attempts to initialise and ping the named provider.
     * Returns { ok: true } or { ok: false, error: '...' }
     */
    testProvider: async function (name) {
      var p = _makeProvider(name);
      if (!p) return { ok: false, error: 'Provider JS not loaded' };
      try {
        p.init({ config: _config, videoEl: _videoEl, canvasEl: _canvasEl });
        if (p.test) await p.test();
        return { ok: true };
      } catch (e) {
        return { ok: false, error: e.message };
      }
    },

    /** Called when engine switches provider due to failure */
    onProviderSwitch: null
  };

  global.AvatarEngine = AvatarEngine;

})(window);
