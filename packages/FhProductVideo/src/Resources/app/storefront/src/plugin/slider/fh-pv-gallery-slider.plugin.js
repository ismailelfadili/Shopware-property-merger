import GallerySliderPlugin from 'src/plugin/slider/gallery-slider.plugin';
import ViewportDetection from 'src/helper/viewport-detection.helper';

export default class FhPvGallerySliderPlugin extends GallerySliderPlugin {
  init() {
    // set video preload attributes before anything else
    this._setProductVideoPreloadBehaviour();
    super.init();
  }

  _setProductVideoPreloadBehaviour() {
    const userAgent = navigator.userAgent.toLowerCase();
    let isSafari = false;

    if (userAgent.indexOf('safari') !== -1 && userAgent.indexOf('chrome') === -1) {
      isSafari = true;
    }

    if (!isSafari) {
      const video = this.el.querySelectorAll('video');

      video.forEach((video) => {
        video.setAttribute('preload', 'auto');
      });
    }
  }

  _initSlider() {
    super._initSlider()

    // add transition listener
    if (this._slider) {
      this._slider.events.on('transitionStart', () => {
        this._stopProductVideo();
      });
    }
  }

  _registerEvents() {
    if (this._slider) {
      document.addEventListener('Viewport/hasChanged', (event) => {
        // rebuild only if there was a valid viewport before
        if (event.detail.previousViewport !== 'NONE') {
          this.rebuild(ViewportDetection.getCurrentViewport())
        }
      });

      const zoomModalClose = this.el.querySelector('.zoom-modal-wrapper .close');

      if (zoomModalClose) {
        zoomModalClose.addEventListener('click', this._stopProductVideo.bind(this));
      }
    }
  }

  _stopProductVideo() {
    const video = this.el.querySelectorAll('video');
    const youtubeEmbeddedVideo = this.el.querySelectorAll('.youtube');
    const vimeoEmbeddedVideo = this.el.querySelectorAll('.vimeo');
    const localEmbeddedVideo = this.el.querySelectorAll('.local');

    video.forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });

    youtubeEmbeddedVideo.forEach((youtubeEmbeddedVideo) => {
      const content = youtubeEmbeddedVideo.contentWindow;
      content.postMessage('{ "event": "command", "func": "stopVideo", "args": "" }', '*');
    });

    vimeoEmbeddedVideo.forEach((vimeoEmbeddedVideo) => {
      const src = vimeoEmbeddedVideo.getAttribute('src');
      vimeoEmbeddedVideo.src = '';
      vimeoEmbeddedVideo.src = src;
    });

    localEmbeddedVideo.forEach((localEmbeddedVideo) => {
      const src = localEmbeddedVideo.getAttribute('src');
      localEmbeddedVideo.src = '';
      localEmbeddedVideo.src = src;
    });
  }
}
