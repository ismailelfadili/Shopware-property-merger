const { Application } = Shopware;
import './component';
import './preview';

Application.getContainer('service').cmsService.registerCmsBlock({
    name: 'merchant-finder',
    label: 'Merchant Finder',
    category: 'form',
    component: 'sw-cms-block-merchant-finder',
    previewComponent: 'sw-cms-preview-merchant-finder',
    defaultConfig: {
        marginBottom: '20px',
        marginTop: '20px',
        marginLeft: '20px',
        marginRight: '20px',
        sizingMode: 'boxed'
    },
    slots: {
        merchantFinder: 'merchant-finder'
    }
});
