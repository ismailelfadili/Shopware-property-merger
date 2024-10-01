const { Application } = Shopware;

import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'text-on-image-teaser',
    label: 'Teaser',
    category: 'text-image',
    component: 'sw-cms-block-text-on-image-teaser',
    previewComponent: 'sw-cms-preview-text-on-image-teaser',
    defaultConfig: {
        marginBottom: '0px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'boxed'
    },
    slots: {
        'image': {
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
