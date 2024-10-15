import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-column-five',
    label: 'fh.blocks.grid.fiveColumn.label',
    category: 'fullhausGrid',
    component: 'sw-cms-block-fh-column-five',
    previewComponent: 'sw-cms-preview-fh-column-five',
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
        }
    }
});
