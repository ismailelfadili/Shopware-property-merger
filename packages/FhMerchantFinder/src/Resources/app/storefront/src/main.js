// Import all necessary Storefront plugins
import FhMerchantFinder from './fh-merchant-finder/fh-merchant-finder-leaflet';

// Register them via the existing PluginManager
const PluginManager = window.PluginManager;
PluginManager.register('FhMerchantFinder', FhMerchantFinder, '[data-fh-merchant-finder]');

// Necessary for the webpack hot module reloading server
if (module.hot) {
    module.hot.accept();
}
