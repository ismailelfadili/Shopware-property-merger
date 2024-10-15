import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-column-six',
    label: 'fh.blocks.grid.sixColumn.label',
    category: 'fullhausGrid',
    component: 'sw-cms-block-fh-column-six',
    previewComponent: 'sw-cms-preview-fh-column-six',
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
        },
        colFour: {
            type: 'text'
        },
        colFive: {
            type: 'text'
        },
        colSix: {
            type: 'text'
        }
    }
});
