const { Application } = Shopware;

import './component';
import './config';
import './preview';

Application.getContainer('service').cmsService.registerCmsElement({
    name: 'local-video',
    label: 'sw-cms.elements.localVideo.label',
    component: 'sw-cms-element-local-video',
    configComponent: 'sw-cms-element-config-local-video',
    previewComponent: 'sw-cms-element-preview-local-video',
    defaultConfig: {
        videoID: {
            source: 'static',
            value: '',
            required: true
        },
        autoPlay: {
            source: 'static',
            value: false
        },
        loop: {
            source: 'static',
            value: false
        },
        showControls: {
            source: 'static',
            value: true
        },
        start: {
            source: 'static',
            value: null
        },
        end: {
            source: 'static',
            value: null
        },
        displayMode: {
            source: 'static',
            value: 'standard'
        },
        muted: {
            source: 'static',
            value: false
        },
        poster: {
            source: 'static',
            value: false
        },
        previewMedia: {
            source: 'static',
            value: null,
            entity: {
                name: 'media',
            },
        },
        title: {
            source: 'static',
            value: true,
        },
        byLine: {
            source: 'static',
            value: false,
        },
        color: {
            source: 'static',
            value: '',
        }
    }
});
