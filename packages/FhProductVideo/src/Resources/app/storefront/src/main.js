import FhPvGallerySliderPlugin from './plugin/slider/fh-pv-gallery-slider.plugin';

const PluginManager = window.PluginManager;
PluginManager.override('GallerySlider', FhPvGallerySliderPlugin, '[data-gallery-slider]');
