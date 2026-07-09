/**
 * Ready Player Me Avatar Provider
 * https://docs.readyplayer.me/ready-player-me/integration-guides/web-browser
 *
 * RPM provides photorealistic 3D avatars embeddable via iframe or GLB export.
 * No API key required for basic use — users create their avatar in-app.
 *
 * This provider embeds the RPM iframe in the presenter panel.
 * After the user creates their avatar, the GLB URL is saved and reused.
 *
 * Configure subdomain in Settings → Avatar Engine → Ready Player Me.
 */

(function (global) {
  'use strict';

  function RPMProvider() {
    this.name        = 'rpm';
    this._subdomain  = null;
    this._avatarUrl  = null;
    this._container  = null;
    this._frame      = null;
  }

  RPMProvider.prototype.init = function (opts) {
    this._subdomain = (opts.config && opts.config.rpmSubdomain) || 'celiksense';
    this._avatarUrl = (opts.config && opts.config.rpmAvatarUrl) || null;
    // Use the video element's parent as the container
    this._container = opts.videoEl ? opts.videoEl.parentElement : document.getElementById('tvPresenterPanel');
  };

  RPMProvider.prototype.isAvailable = function () { return true; };

  // ── Connectivity test ─────────────────────────────────────────────────────
  RPMProvider.prototype.test = async function () {
    // RPM is always available (no API key needed)
    return;
  };

  // ── Main present ──────────────────────────────────────────────────────────
  RPMProvider.prototype.present = async function (opts) {
    if (!this._avatarUrl) {
      // No avatar yet — open the RPM creator
      this._avatarUrl = await this._openCreator();
      // Save the URL
      if (global.AvatarEngine) {
        AvatarEngine.setConfig({ rpmAvatarUrl: this._avatarUrl });
      }
    }
    this._showAvatar();
  };

  // ── Open RPM creator iframe ────────────────────────────────────────────────
  RPMProvider.prototype._openCreator = function () {
    var self = this;
    var creatorUrl = 'https://' + this._subdomain + '.readyplayer.me/avatar?frameApi&clearCache';

    return new Promise(function (resolve, reject) {
      var overlay = document.createElement('div');
      overlay.style.cssText = [
        'position:fixed;top:0;left:0;width:100%;height:100%;',
        'background:rgba(0,0,0,0.92);z-index:99999;',
        'display:flex;flex-direction:column;align-items:center;justify-content:center;'
      ].join('');

      var header = document.createElement('div');
      header.style.cssText = 'color:#fff;font-size:14px;font-weight:600;margin-bottom:12px;opacity:0.7;';
      header.textContent = 'Create your Ready Player Me avatar';
      overlay.appendChild(header);

      var frame = document.createElement('iframe');
      frame.src = creatorUrl;
      frame.allow = 'camera *; microphone *';
      frame.style.cssText = 'width:90vw;max-width:800px;height:80vh;border:none;border-radius:12px;';
      overlay.appendChild(frame);

      var closeBtn = document.createElement('button');
      closeBtn.textContent = 'Cancel';
      closeBtn.style.cssText = [
        'margin-top:12px;padding:8px 24px;',
        'background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.2);',
        'color:#fff;border-radius:8px;cursor:pointer;font-size:13px;'
      ].join('');
      closeBtn.onclick = function () {
        document.body.removeChild(overlay);
        reject(new Error('RPM: user cancelled avatar creation'));
      };
      overlay.appendChild(closeBtn);

      document.body.appendChild(overlay);

      function onMessage(e) {
        if (!e.data || e.data.source !== 'readyplayerme') return;
        if (e.data.eventName === 'v1.avatar.exported') {
          window.removeEventListener('message', onMessage);
          document.body.removeChild(overlay);
          resolve(e.data.data.url);
        }
      }
      window.addEventListener('message', onMessage);
    });
  };

  // ── Show avatar iframe in the presenter panel ─────────────────────────────
  RPMProvider.prototype._showAvatar = function () {
    if (!this._container || !this._avatarUrl) return;

    // Remove existing if any
    var old = this._container.querySelector('.rpm-presenter-frame');
    if (old) old.remove();

    // Embed avatar viewer
    // RPM provides a viewer URL or we can use their 3D viewer
    var viewerUrl = 'https://models.readyplayer.me/' +
      this._avatarUrl.split('/').pop().replace('.glb', '') +
      '.html?morphTargets=ARKit,Oculus Visemes&textureAtlas=1024';

    this._frame = document.createElement('iframe');
    this._frame.className = 'rpm-presenter-frame';
    this._frame.src = viewerUrl;
    this._frame.allow = 'camera *; microphone *';
    this._frame.style.cssText = [
      'position:absolute;top:0;left:0;width:100%;height:100%;',
      'border:none;z-index:5;background:#07091a;'
    ].join('');
    this._container.appendChild(this._frame);
  };

  // ── Stop ──────────────────────────────────────────────────────────────────
  RPMProvider.prototype.stop = function () {
    if (this._frame) {
      this._frame.remove();
      this._frame = null;
    }
  };

  global.RPMProvider = RPMProvider;

})(window);
