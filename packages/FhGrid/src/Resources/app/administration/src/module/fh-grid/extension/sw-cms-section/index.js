import template from './sw-cms-section.html.twig';
import './sw-cms-section.scss';

const { Component } = Shopware;

Component.override('sw-cms-section', {
    template,

    watchers: {
        section() {
            this.initGrid();
        },

        blocks() {
            this.checkBlocks();
        }
    },

    computed: {
        gridColumns() {
            return parseInt(this.section.customFields.fhGridColumns, 10);
        }
    },

    created() {
        this.initGrid();
        this.checkBlocks();
    },

    methods: {
        initGrid() {
            if (this.section.type !== 'fh-grid') return;

            this.section.customFields ??= {};

            if (!this.section.customFields.fhGridColumns) {
                this.$set(this.section.customFields, 'fhGridColumns', 3)
            }
            if (!this.section.customFields.fhGridConfig) {
                this.$set(this.section.customFields, 'fhGridConfig', {})
            }
            if (!this.section.customFields.fhGridConfig.noGutters) {
                this.$set(this.section.customFields.fhGridConfig, 'noGutters', false)
            }
            if (!this.section.customFields.fhGridColumnWidths) {
                this.$set(this.section.customFields, 'fhGridColumnWidths', [
                    {col: 12, lg: 3},
                    {col: 12, lg: 6},
                    {col: 12, lg: 3}
                ])
            }
        },

        checkBlocks() {
            this.section.blocks.filter(block => !block.customFields || block.customFields.fhGridColumn === undefined).forEach((block) => {
                if (!block.customFields) {
                    block.customFields = {};
                }

                block.customFields.fhGridColumn = 1;
            })
        },

        isGridContentEmpty(index) {
            return this.gridBlocks(index).length === 0;
        },

        gridBlocks(index) {
            const gridBlocks = this.section.blocks.filter((block => this.blockTypeExists(block.type) &&
                block.customFields &&
                block.customFields.fhGridColumn !== undefined &&
                parseInt(block.customFields.fhGridColumn) === parseInt(index)));
            return gridBlocks.sort((a, b) => a.position - b.position);
        },

        colWidthClass(index) {
            const widths = this.section.customFields.fhGridColumnWidths[index];

            let colClasses = ['sm', 'md', 'lg', 'xl'];

            if (this.cmsPageState.currentCmsDeviceView === 'tablet-landscape') {
                colClasses = ['sm', 'md', 'lg'];
            }

            if (this.cmsPageState.currentCmsDeviceView === 'mobile') {
                colClasses = ['sm', 'md'];
            }

            // Desktop view
            const cols = ['col-' + widths.col];

            colClasses.forEach((width) => {
                if (widths[width]) {
                    cols.push(`col-${width}-${widths[width]}`)
                }
            });

            return cols;
        },

        getDropGridData(index, fhGridColumn = 0) {
            return {dropIndex: index, section: this.section, sectionPosition: 'main', fhGridColumn};
        },
    }
})
