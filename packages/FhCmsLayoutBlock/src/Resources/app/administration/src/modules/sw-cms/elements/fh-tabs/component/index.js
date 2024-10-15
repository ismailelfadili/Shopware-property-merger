import template from './sw-cms-element-fh-tabs.html.twig';
import './sw-cms-element-fh-tabs.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-element-fh-tabs', {
    template,

    inject: ['repositoryFactory'],

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
            this.initElementConfig('fh-tabs');
        }
    }
});
