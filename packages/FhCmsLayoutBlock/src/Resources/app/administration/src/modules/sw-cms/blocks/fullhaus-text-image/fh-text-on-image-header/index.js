import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-text-on-image-header',
    label: 'fh.block.textOnImageHeader.label',
    category: 'fullhausTextImg',
    component: 'sw-cms-block-fh-text-on-image-header',
    previewComponent: 'sw-cms-preview-fh-text-on-image-header',
    defaultConfig: {
        marginBottom: '10px',
        sizingMode: 'boxed'
    },
    slots: {
        'header-image': {
            type: 'image',
            default: {
                config: {
                    displayMode: {source: 'static', value: 'cover'}
                }
            }
        },
        'header-text': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h1>Lorem Ipsum dolor</h1>
                        `.trim()
                    }
                }
            }
        }
    }
});
