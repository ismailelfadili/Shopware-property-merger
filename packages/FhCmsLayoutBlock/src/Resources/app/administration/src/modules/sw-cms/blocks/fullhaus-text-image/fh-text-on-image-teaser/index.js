import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-text-on-image-teaser',
    label: 'fh.block.textOnImageTeaser.label',
    category: 'fullhausTextImg',
    component: 'sw-cms-block-fh-text-on-image-teaser',
    previewComponent: 'sw-cms-preview-fh-text-on-image-teaser',
    defaultConfig: {
        sizingMode: 'boxed'
    },
    slots: {
        'image': {
            type: 'image',
            default: {
                config: {
                    displayMode: {source: 'static', value: 'cover'}
                }
            }
        },
        'text': {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h3>Lorem Ipsum dolor</h3>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        `.trim()
                    }
                }
            }
        }
    }
});
