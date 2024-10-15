const { Module } = Shopware;

import './page/fh-shopconnector-list';
import './page/fh-shopconnector-detail';
import './page/fh-shopconnector-create';

import deDE from './snippet/de-DE.json';
import enGB from './snippet/en-GB.json';

Module.register('fh-shopconnector', {
    type: 'plugin',
    name: 'FhShopConnector',
    title: 'fh-shopconnector.general.mainMenuItemGeneral',
    description: 'shopconnector.general.descriptionTextModule',
    color: '#98be17',
    icon: 'regular-plug',

    snippets: {
        'de-DE': deDE,
        'en-GB': enGB
    },

    routes: {
        list   : {
            component: 'fh-shopconnector-list',
            path: 'list'
        },

        detail : {
            component: 'fh-shopconnector-detail',
            path: 'detail/:id',
            meta: {
                parentPath: 'fh.shopconnector.list'
            }
        },

        create : {
            component: 'fh-shopconnector-create',
            path: 'create',
            meta: {
                parentPath: 'fh.shopconnector.list'
            }
        }
    },

    navigation: [{
        label: 'Shop Connector',
        color: '#98be17',
        path: 'fh.shopconnector.list',
        icon: 'regular-plug',
        parent: 'sw-catalogue',
        position: 100
    }]
});
