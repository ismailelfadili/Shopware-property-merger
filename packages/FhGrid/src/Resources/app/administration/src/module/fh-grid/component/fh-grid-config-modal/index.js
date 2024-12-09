import template from './fh-grid-config-modal.html.twig';
import './fh-grid-config-modal.scss';

const { Component } = Shopware;

Component.register('fh-grid-config-modal', {
    template,

    props: {
        section: {
            type: Object,
            required: true,
        }
    },

    computed: {
        gridColumns() {
            return parseInt(this.section.customFields.fhGridColumns, 10);
        },

        formColumns() {
            let columns = '72px';
            for (let i = 0; i < 12; i++) {
                columns += ' 1fr';
            }
            return columns;
        },

        breakpoints() {
            return [
                {label: 'sm', key: 'sm'},
                {label: 'md', key: 'md'},
                {label: 'lg', key: 'lg'},
                {label: 'xl', key: 'xl'},
            ];
        }
    },

    watchers: {
        gridColumns() {
            this.initCustomFields();
        }
    },

    created() {
        this.initCustomFields();
    },

    methods: {
        onNumberOfColumnsChange(newVal) {
            this.section.customFields.fhGridColumns = parseInt(newVal, 10);
            this.initCustomFields();
        },

        initCustomFields() {
            if (!section) return;
            this.section.customFields ??= {};
            this.section.customFields.fhGridColumns ??= 3;
            this.section.customFields.fhGridConfig ??= { noGutters: false };
            if (!this.section.customFields.fhGridColumnWidths) {
                this.$set(this.section.customFields, 'fhGridColumnWidths', [])
            }
            for (let i = 0; i < gridColumns; i++) {
                if (!this.section.customFields.fhGridColumnWidths[i]) {
                    this.$set(this.section.customFields.fhGridColumnWidths, i, {col: 3, isSidebar: false, cssClasses: ''})
                }
                if (!this.section.customFields.fhGridColumnWidths[i].hideOn) {
                    this.$set(this.section.customFields.fhGridColumnWidths[i], 'hideOn', {default: false, sm: false, md: false, lg: false, xl: false})
                }
            }
        }
    }
});
