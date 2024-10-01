const { Application } = Shopware;

import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'accordion',
    label: 'sw-cms.blocks.accordion.label',
    category: 'text',
    component: 'sw-cms-block-accordion',
    previewComponent: 'sw-cms-block-preview-accordion',

    defaultConfig: {
        marginBottom: '20px',
        marginTop:    '20px',
        marginLeft:   '20px',
        marginRight:  '20px',
        sizingMode:   'boxed'
    },

    slots: {
        content: {
            type: 'accordion'
        }
    }
});
