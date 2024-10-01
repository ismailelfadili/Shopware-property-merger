const { Component, Mixin } = Shopware;

import template from './sw-cms-element-accordion.html.twig';
import './sw-cms-element-accordion.scss';

Component.register('sw-cms-element-accordion', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    created() {
        this.createdComponent();
    },

    data() {
        return {
            active: 'item1'
        };
    },

    methods: {
        createdComponent() {
            this.initElementConfig('accordion');
        }
    }
});
