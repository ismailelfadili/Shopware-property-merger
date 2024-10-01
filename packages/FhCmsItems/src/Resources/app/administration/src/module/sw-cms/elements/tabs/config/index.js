const { Component, Mixin } = Shopware;

import template from './sw-cms-element-config-tabs.html.twig';

Component.register('sw-cms-element-config-tabs', {
    template,

    inject: [
        'repositoryFactory'
    ],

    mixins: [
        Mixin.getByName('cms-element')
    ],

    data() {
        return {
            active: 'tab1'
        };
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('tabs');
        }
    }
});
