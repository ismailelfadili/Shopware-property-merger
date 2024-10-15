import './component';
import './config';
import './preview';

Shopware.Service('cmsService').registerCmsElement({
    name: 'fh-tabs',
    label: 'fh.elements.tabs.label',
    component: 'sw-cms-element-fh-tabs',
    configComponent: 'sw-cms-element-config-fh-tabs',
    previewComponent: 'sw-cms-element-preview-fh-tabs',
    defaultConfig: {
        numberOfTabs: {
            source: 'static',
            value: 3
        },
        tabtitle1: { source: 'static', value: 'Tab 1' },
        tabtitle2: { source: 'static', value: 'Tab 2' },
        tabtitle3: { source: 'static', value: 'Tab 3' },
        tabtitle4: { source: 'static', value: 'Tab 4' },
        tabtitle5: { source: 'static', value: 'Tab 5' },
        tabtitle6: { source: 'static', value: 'Tab 6' },
        tabtitle7: { source: 'static', value: 'Tab 7' },
        tabtitle8: { source: 'static', value: 'Tab 8' },
        tabtitle9: { source: 'static', value: 'Tab 9' },
        tabtitle10:{ source: 'static', value: 'Tab 10' },

        tabcontents1: { source: 'static', value: 'Text 1' },
        tabcontents2: { source: 'static', value: 'Text 2' },
        tabcontents3: { source: 'static', value: 'Text 3' },
        tabcontents4: { source: 'static', value: 'Text 4' },
        tabcontents5: { source: 'static', value: 'Text 5' },
        tabcontents6: { source: 'static', value: 'Text 6' },
        tabcontents7: { source: 'static', value: 'Text 7' },
        tabcontents8: { source: 'static', value: 'Text 8' },
        tabcontents9: { source: 'static', value: 'Text 9' },
        tabcontents10:{ source: 'static', value: 'Text 10' }
    }
});
