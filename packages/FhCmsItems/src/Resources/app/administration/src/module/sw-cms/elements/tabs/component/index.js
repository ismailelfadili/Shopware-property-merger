const { Component, Mixin } = Shopware;

import template from './sw-cms-element-tabs.html.twig';
import './sw-cms-element-tabs.scss';

Component.register('sw-cms-element-tabs', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    data() {
        return {
            active: 'tab1'
        };
    },

    methods: {
        createdComponent() {
            this.initElementConfig('tabs');
        }
    }
});
