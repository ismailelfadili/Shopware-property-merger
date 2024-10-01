const { Component, Mixin } = Shopware;

import template from './sw-cms-element-local-video.html.twig';
import './sw-cms-element-local-video.scss';

Component.register('sw-cms-element-local-video', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        videoID() {
            return this.element.config.videoID.value;
        },

        /** @deprecated tag:v6.4.0 - This computed prop will be removed because videos should never have autoplay in the administration */
        autoPlay() {
            if (!this.element.config.autoPlay.value) {
                return '';
            }

            return 'autoplay ';
        },

        muted() {
            if (!this.element.config.muted.value) {
                return '';
            }

            return 'muted="true" ';
        },

        poster() {
            if (!this.element.config.poster.value) {
                return '';
            }

            return 'poster="test.jpg" ';
        },


        loop() {
            if (!this.element.config.loop.value) {
                return '';
            }

            return `loop `;
        },

        showControls() {
            if (this.element.config.showControls.value) {
                return '';
            }

            return 'controls ';
        },

        start() {
            if (!this.element.config.start.value) {
                return '';
            }

            return `${this.element.config.start.value}`;
        },

        end() {
            if (!this.element.config.end.value) {
                return '';
            }

            return `,${this.element.config.end.value}`;
        },

        startEndPrefix() {
            if (this.element.config.start.value || this.element.config.end.value) {
                return `#t=`;
            }

            return '';
        },

        videoUrl() {
            const url = `${this.videoID}\
            ${this.startEndPrefix}\
            ${this.start}\
            ${this.end}`.replace(/ /g, '');

            return url;
        },

        videoAttr() {
            const attr = `${this.showControls}\
            ${this.loop}\
            ${this.autoPlay}\
            ${this.muted}\
            ${this.previewMedia}`.replace(/ /g, '');

            return attr;
        },

        displayModeClass() {
            if (this.element.config.displayMode.value === 'standard') {
                return '';
            }

            return `is--${this.element.config.displayMode.value}`;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('local-video');
        }
    }
});
