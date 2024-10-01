import template from './sw-cms-element-config-local-video.html.twig';
import './sw-cms-element-config-local-video.scss';

const { Component, Mixin } = Shopware;

Component.register('sw-cms-element-config-local-video', {
    template,

    inject: ['repositoryFactory'],

    mixins: [
        Mixin.getByName('cms-element'),
    ],

    data() {
        return {
            mediaModalIsOpen: false,
            initialFolderId: null,
        };
    },

    computed: {
        startValue() {
            return this.convertTimeToInputFormat(this.element.config.start.value).string;
        },

        endValue() {
            return this.convertTimeToInputFormat(this.element.config.end.value).string;
        },

        videoID: {
            get() {
                return this.element.config.videoID.value;
            },

            set() {
                return this.element.config.videoID.value;
            },
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-local-video-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element.data && this.element.data.previewMedia && this.element.data.previewMedia.id) {
                return this.element.data.previewMedia;
            }

            return this.element.config.previewMedia.value;
        },
    },

    created() {
        this.createdComponent();
    },

    methods: {
        setTimeValue(value, type) {
            this.element.config[type].value = this.convertTimeToUrlFormat(value).string;
        },

        createdComponent() {
            this.initElementConfig('local-video');
        },

        convertTimeToInputFormat(time) {
            /* converting the time to a human readable format.
             * e.g. 1337 (seconds) -> 22:17
             */

            const returnValues = {};
            let incomingTime = time;

            const regex = /^[0-9]*$/;
            const isValidFormat = regex.test(time);

            if (!isValidFormat) {
                incomingTime = 0;
            }

            const minutes = Math.floor(incomingTime / 60);
            let seconds = incomingTime - minutes * 60;

            returnValues.minutes = minutes;
            returnValues.seconds = seconds;

            if (seconds.toString().length === 1) {
                seconds = `0${seconds}`;
            }

            returnValues.string = `${minutes}:${seconds}`;

            return returnValues;
        },

        convertTimeToUrlFormat(time) {
            /* converting the time to an url format so the local iFrame-API can read the time.
             * e.g. 0:42 -> 42 (seconds)
             */

            const returnValues = {};
            let incomingTime = time;

            const regex = /[0-9]?[0-9]:[0-9][0-9]/;
            const isValidFormat = regex.test(incomingTime);

            if (!isValidFormat) {
                incomingTime = '00:00';
            }

            const splittedTime = incomingTime.split(':');
            returnValues.minutes = Number(splittedTime[0]);
            returnValues.seconds = Number(splittedTime[1]);
            returnValues.string = returnValues.minutes * 60 + returnValues.seconds;

            return returnValues;
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId);

            this.element.config.previewMedia.value = mediaEntity.id;

            this.updateElementData(mediaEntity);

            this.$emit('element-update', this.element);
        },

        onImageRemove() {
            this.element.config.previewMedia.value = null;

            this.updateElementData();

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.previewMedia.value = media.id;

            this.updateElementData(media);

            this.$emit('element-update', this.element);
        },

        updateElementData(media = null) {
            this.$set(this.element.data, 'previewMediaId', media === null ? null : media.id);
            this.$set(this.element.data, 'previewMedia', media);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },
    },
});
