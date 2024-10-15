import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-column-four',
    label: 'fh.blocks.grid.fourColumn.label',
    category: 'fullhausGrid',
    component: 'sw-cms-block-fh-column-four',
    previewComponent: 'sw-cms-preview-fh-column-four',
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
        }
    }
});
