import template from './sw-cms-element-config-fh-accordion.html.twig';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-element-config-fh-accordion', {
    template,

    inject: ['repositoryFactory'],

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
            this.initElementConfig('fh-accordion');
        }
    }
});
