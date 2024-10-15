import template from './sw-cms-sidebar.html.twig';
import './sw-cms-sidebar.scss'

const {Component, State} = Shopware;

Component.override('sw-cms-sidebar', {
    template,

    computed: {
        cmsPageStateLoading() {
            return State.get('cmsPageState').currentPage;
        },

        hasBlockGrid() {
            const gridBlocks = [
                'fh-column-two',
                'fh-column-three',
                'fh-column-four',
                'fh-column-five',
                'fh-column-six'
            ];

            return gridBlocks.includes(this.selectedBlock.type);
        },

        hasBlockCluster() {
            const gridBlocks = [
                'ods-cluster-a',
                'ods-cluster-b',
                'ods-cluster-c',
                'ods-cluster-d',
                'ods-cluster-e',
                'ods-cluster-f',
                'ods-cluster-g',
                'ods-cluster-h',
                'ods-cluster-i',
                'ods-cluster-j',
                'ods-cluster-k',
                'ods-cluster-l',
                'ods-cluster-m'
            ];

            return gridBlocks.includes(this.selectedBlock.type);
        }
    },

    watch: {
        cmsPageStateLoading() {
            this.createdComponentData();
        }
    },

    methods: {
        createdComponentData() {
            // Convert customField to object
            if (!this.page.customFields) this.page.customFields = {}
        }
    }
})