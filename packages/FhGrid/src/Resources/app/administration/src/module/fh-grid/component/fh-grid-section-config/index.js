import template from './fh-grid-section-config.html.twig';
import './fh-grid-section-config.scss';

const { Component } = Shopware;

Component.register('fh-grid-section-config', {
    template,

    props: {
        section: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            showConfigModal: false,
        };
    },
})
