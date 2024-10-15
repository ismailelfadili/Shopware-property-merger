const { Module } = Shopware;

import './page/fh-merchant-finder-list';
import './page/fh-merchant-finder-detail';
import './page/fh-merchant-finder-create';

import deDE from './snippet/de-DE';
import enGB from './snippet/en-GB';

import './style/main.scss';

Module.register('fh-merchant-finder', {
    type: 'plugin',
    name: 'MerchantFinder',
    title: 'fh-merchant-finder.general.mainMenuItemGeneral',
    description: 'sw-property.general.descriptionTextModule',
    color: '#ff3d58',
    icon: 'regular-plug',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list: {
            component: 'fh-merchant-finder-list',
            path: 'list'
        },
        detail: {
            component: 'fh-merchant-finder-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'fh.merchant.finder.list'
            }
        },
        create: {
            component: 'fh-merchant-finder-create',
            path: 'create',
            meta: {
                parentPath: 'fh.merchant.finder.list'
            }
        }
    },

    navigation: [{
        label: 'fh-merchant-finder.general.mainMenuItemGeneral',
        color: '#ff3d58',
        path: 'fh.merchant.finder.list',
        icon: 'regular-plug',
        parent: 'sw-content',
        position: 100
    }]
});
