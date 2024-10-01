const { Application } = Shopware;

import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'local-video',
    label: 'sw-cms.blocks.video.localVideo.label',
    category: 'video',
    component: 'sw-cms-block-local-video',
    previewComponent: 'sw-cms-preview-local-video',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '0',
        marginRight: '0',
        sizingMode: 'boxed'
    },
    slots: {
        video: 'local-video'
    }
});
