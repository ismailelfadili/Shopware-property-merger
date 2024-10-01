const { Application } = Shopware;

import './component';
import './config';
import './preview';

Application.getContainer('service').cmsService.registerCmsElement({
    name: 'accordion',
    label: 'sw-cms.elements.accordion.label',
    component: 'sw-cms-element-accordion',
    configComponent: 'sw-cms-element-config-accordion',
    previewComponent: 'sw-cms-element-preview-accordion',

    defaultConfig: {
        numberOfItems: {
            source: 'static',
            value: 3
        },
        firstItemOpened: {
            source: 'static',
            value: true
        },
        itemtitle1: { source: 'static', value: 'Item 1' },
        itemtitle2: { source: 'static', value: 'Item 2' },
        itemtitle3: { source: 'static', value: 'Item 3' },
        itemtitle4: { source: 'static', value: 'Item 4' },
        itemtitle5: { source: 'static', value: 'Item 5' },
        itemtitle6: { source: 'static', value: 'Item 6' },
        itemtitle7: { source: 'static', value: 'Item 7' },
        itemtitle8: { source: 'static', value: 'Item 8' },
        itemtitle9: { source: 'static', value: 'Item 9' },
        itemtitle10:{ source: 'static', value: 'Item 10' },

        itemcontents1: { source: 'static', value: 'Text 1' },
        itemcontents2: { source: 'static', value: 'Text 2' },
        itemcontents3: { source: 'static', value: 'Text 3' },
        itemcontents4: { source: 'static', value: 'Text 4' },
        itemcontents5: { source: 'static', value: 'Text 5' },
        itemcontents6: { source: 'static', value: 'Text 6' },
        itemcontents7: { source: 'static', value: 'Text 7' },
        itemcontents8: { source: 'static', value: 'Text 8' },
        itemcontents9: { source: 'static', value: 'Text 9' },
        itemcontents10:{ source: 'static', value: 'Text 10' }
    }
});
