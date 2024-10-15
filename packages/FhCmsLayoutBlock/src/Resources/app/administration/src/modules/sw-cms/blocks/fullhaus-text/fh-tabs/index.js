import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-tabs',
    label: 'fh.blocks.tabs.label',
    category: 'fullhausText',
    component: 'sw-cms-block-fh-tabs',
    previewComponent: 'sw-cms-block-preview-fh-tabs',

    defaultConfig: {
        marginBottom: '20px',
        marginTop:    '20px',
        marginLeft:   '20px',
        marginRight:  '20px',
        sizingMode:   'boxed'
    },

    slots: {
        content: {
            type: 'fh-tabs'
        }
    }
});
