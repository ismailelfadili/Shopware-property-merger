import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-column-two',
    label: 'fh.blocks.grid.twoColumn.label',
    category: 'fullhausGrid',
    component: 'sw-cms-block-fh-column-two',
    previewComponent: 'sw-cms-preview-fh-column-two',
    defaultConfig: {
        sizingMode: 'boxed',
        customFields: {
            fhGridAutoResize: true
        }
    },
    slots: {
        colOne: {
            type: 'text'
        },
        colTwo: {
            type: 'text'
        }
    }
});
