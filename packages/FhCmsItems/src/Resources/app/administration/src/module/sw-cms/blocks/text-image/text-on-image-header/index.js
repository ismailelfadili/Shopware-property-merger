const { Application } = Shopware;

import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'text-on-image-header',
    label: 'Category Headline',
    category: 'text-image',
    component: 'sw-cms-block-text-on-image-header',
    previewComponent: 'sw-cms-preview-text-on-image-header',
    defaultConfig: {
        marginBottom: '10px',
        marginTop: '0px',
        marginLeft: '0px',
        marginRight: '0px',
        sizingMode: 'full-width'
    },
    slots: {
        'header-image': {
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
