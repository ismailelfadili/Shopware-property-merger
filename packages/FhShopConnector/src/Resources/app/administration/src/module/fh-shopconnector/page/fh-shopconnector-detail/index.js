const { Component, Mixin, Application } = Shopware;
const { Criteria } = Shopware.Data;
const utils = Shopware.Utils;

import template from './fh-shopconnector-detail.html.twig';
import './fh-shopconnector-detail.scss';

Component.register('fh-shopconnector-detail', {
    template,

    inject: [
        'repositoryFactory',
        'context'
    ],

    mixins: [
        Mixin.getByName('notification'),
        Mixin.getByName('placeholder'),
        Mixin.getByName('discard-detail-page-changes')('item')
    ],

    shortcuts: {
        'SYSTEMKEY+S': 'onSave',
        ESCAPE: 'onAbortButtonClick'
    },

    metaInfo() {
        return {
            title: this.$createTitle()
        };
    },

    data() {
        return {
            item: [],
            salesChannels: null,
            isLoading: false,
            processSuccess: false,
            repository: null,
            searchTerm: '',
            mediaEntity: null,
            showUploadField: false,
            suggestedItems: [],
            isLoadingSuggestions: false,
            uploadTag: utils.createId(),
            mediaItem: null
        };
    },

    computed: {
        mediaStore() {
            return this.repositoryFactory.create('media');
        },

        fhShopConnectorUserRepository() {
            return this.repositoryFactory.create('fh_shopconnector_users');
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        salesChannelRepository() {
            return this.repositoryFactory.create('sales_channel');
        }
    },

    created() {
        this.repository = this.fhShopConnectorUserRepository;
        this.initializeFurtherComponents();
        this.getItem();
    },

    methods: {
        initializeFurtherComponents() {

            const criteria = new Criteria();
            criteria.setTerm(this.term);

            this.salesChannelRepository.search(new Criteria(1, 100), Shopware.Context.api).then((searchResult) => {
                this.salesChannels = searchResult;
                return this.searchResult;
            }).catch(() => {
                this.isLoading = false;
            });
        },

        getItem() {
            this.repository
                .get(this.$route.params.id, Shopware.Context.api)
                .then((entity) => {
                    this.item = entity;
                    this.mediaItem = this.item.mediaId ? this.mediaStore.getById(this.item.mediaId) : null;
                    this.isLoading = false;
                });
        },

        onClickSave() {
            this.isLoading = true;

            this.repository
                .save(this.item, Shopware.Context.api)
                .then(() => {
                    this.getItem();
                    this.isLoading = false;
                    this.processSuccess = true;
                }).catch((exception) => {
                this.isLoading = false;
                this.createNotificationError({
                    title: this.$t('fh-shopconnector.detail.errorTitle'),
                    message: exception
                });
            });
        },

        saveFinish() {
            this.processSuccess = true;
        },

        openMediaSidebar() {
            this.$refs.mediaSidebarItem.openContent();
        },

        // Logo
        setMediaItem({ targetId }) {
            this.item.mediaId = targetId;
            this.mediaStore.getByIdAsync(targetId);
        },
        onDropMedia(dragData) {
            this.setMediaItem({ targetId: dragData.id });
        },
        setMediaFromSidebar(mediaEntity) {
            this.item.mediaId = mediaEntity.id;
        },
        onUnlinkMedia() {
            this.item.mediaId = null;
        }
    }
});
