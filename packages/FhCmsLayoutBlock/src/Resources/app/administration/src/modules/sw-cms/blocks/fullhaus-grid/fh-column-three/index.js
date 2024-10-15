import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-column-three',
    label: 'fh.blocks.grid.threeColumn.label',
    category: 'fullhausGrid',
    component: 'sw-cms-block-fh-column-three',
    previewComponent: 'sw-cms-preview-fh-column-three',
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
        },
        colThree: {
            type: 'text'
        }
    }
});
