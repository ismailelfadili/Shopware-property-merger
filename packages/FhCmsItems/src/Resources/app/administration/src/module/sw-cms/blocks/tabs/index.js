const { Application } = Shopware;

import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'tabs',
    label: 'sw-cms.blocks.tabs.label',
    category: 'text',
    component: 'sw-cms-block-tabs',
    previewComponent: 'sw-cms-block-preview-tabs',

    defaultConfig: {
        marginBottom: '20px',
        marginTop:    '20px',
        marginLeft:   '20px',
        marginRight:  '20px',
        sizingMode:   'boxed'
    },

    slots: {
        content: {
            type: 'tabs'
        }
    }
});
