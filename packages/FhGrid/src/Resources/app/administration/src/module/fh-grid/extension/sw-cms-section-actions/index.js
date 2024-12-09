import template from './sw-cms-section-actions.html.twig';

const { Component } = Shopware;

Component.override('sw-cms-section-actions', {
    template,

    data() {
        return {
            showConfigModal: false,
        };
    },
});
