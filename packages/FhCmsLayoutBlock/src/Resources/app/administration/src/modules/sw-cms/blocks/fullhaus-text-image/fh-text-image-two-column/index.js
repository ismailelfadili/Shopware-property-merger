import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-text-image-two-column',
    label: 'fh.block.textImageTwoColumn.label',
    category: 'fullhausTextImg',
    component: 'sw-cms-block-fh-text-image-two-column',
    previewComponent: 'sw-cms-preview-fh-text-image-two-column',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        'left-image': {
            type: 'image',
            default: {
                config: {
                    displayMode: {source: 'static', value: 'cover'},
                }
            }
        },
        'left-text': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                         <h2>Lorem Ipsum dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        `.trim()
                    }
                }
            }
        },
        'right-image': {
            type: 'image',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'cover' },
                }
            }
        },
        'right-text': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                         <h2>Lorem Ipsum dolor</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        `.trim()
                    }
                }
            }
        }
    }
});
