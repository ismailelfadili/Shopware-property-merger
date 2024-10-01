const { Application } = Shopware;

import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'text-image-two-column',
    label: 'Text-Image Two Column',
    category: 'text-image',
    component: 'sw-cms-block-text-image-two-column',
    previewComponent: 'sw-cms-preview-text-image-two-column',
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
                    displayMode: {source: 'static', value: 'cover'}
                },
                data: {
                    media: {
                        url: '/administration/static/img/cms/preview_camera_large.jpg'
                    }
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
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        `.trim()
                    }
                }
            }
        },
        'right-image': {
            type: 'image',
            default: {
                config: {
                    displayMode: { source: 'static', value: 'cover' }
                },
                data: {
                    media: {
                        url: '/administration/static/img/cms/preview_mountain_large.jpg'
                    }
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
