import template from './sw-cms-element-fh-accordion.html.twig';
import './sw-cms-element-fh-accordion.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-element-fh-accordion', {
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
            active: 'item1'
        };
    },

    methods: {
        createdComponent() {
            this.initElementConfig('fh-accordion');
        }
    }
});