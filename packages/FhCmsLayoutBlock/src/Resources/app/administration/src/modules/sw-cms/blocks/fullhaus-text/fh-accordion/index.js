import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-accordion',
    label: 'fh.blocks.accordion.label',
    category: 'fullhausText',
    component: 'sw-cms-block-fh-accordion',
    previewComponent: 'sw-cms-block-preview-fh-accordion',
    defaultConfig: {
        marginBottom: '20px',
        marginTop:    '20px',
        marginLeft:   '20px',
        marginRight:  '20px',
        sizingMode:   'boxed'
    },
    slots: {
        content: {
            type: 'fh-accordion'
        }
    }
});