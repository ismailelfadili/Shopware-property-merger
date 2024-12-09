import template from './sw-cms-sidebar.html.twig';

const {Component} = Shopware;
const {cloneDeep} = Shopware.Utils.object;
const types       = Shopware.Utils.types;

/*
ToDo: Take care on version update!
This script directly overrides / depends on
vendor/shopware/administration/Resources/app/administration/src/module/sw-cms/component/sw-cms-sidebar/index.js
*/

Component.override('sw-cms-sidebar', {
  template,

  methods : {

    /* Customized */
    onBlockStageDrop(dragData, dropData) {
      if (!dropData || !dragData.block || dropData.dropIndex < 0 || !dropData.section) {
        return;
      }

      if (dropData.section.type !== 'fh-grid') {
        return this.$super('onBlockStageDrop', dragData, dropData);
      }

      const cmsBlocks   = this.cmsService.getCmsBlockRegistry();
      const section     = dropData.section;
      const blockConfig = cmsBlocks[dragData.block.name];
      const newBlock    = this.blockRepository.create();

      newBlock.type            = dragData.block.name;
      newBlock.position        = dropData.dropIndex;
      newBlock.sectionPosition = dropData.sectionPosition;
      newBlock.sectionId       = section.id;

      newBlock.visibility = {
        desktop : true,
        tablet  : true,
        mobile  : true,
      };

      newBlock.customFields = {
        fhGridColumn : dropData.fhGridColumn
      };

      Object.assign(
        newBlock,
        cloneDeep(this.blockConfigDefaults),
        cloneDeep(blockConfig.defaultConfig || {}),
      );

      Object.keys(blockConfig.slots).forEach((slotName) => {
        const slotConfig = blockConfig.slots[slotName];
        const element    = this.slotRepository.create();
        element.blockId  = newBlock.id;
        element.slot     = slotName;

        if (typeof slotConfig === 'string') {
          element.type = slotConfig;
        } else if (types.isPlainObject(slotConfig)) {
          element.type = slotConfig.type;

          if (slotConfig.default && types.isPlainObject(slotConfig.default)) {
            Object.assign(element, cloneDeep(slotConfig.default));
          }
        }

        const slotDefaultData = slotConfig.default?.data;
        if ([slotDefaultData?.media?.source, slotDefaultData?.sliderItems?.source].includes('default')) {
          element.config = {...element.config, ...slotDefaultData};
        }

        newBlock.slots.add(element);
      });
      this.page.sections[section.position].blocks.splice(dropData.dropIndex, 0, newBlock);

      this.$emit('block-stage-drop');
      this.$emit('current-block-change', section.id, newBlock);
    },

    /* Custom */
    getColumnContentBlocks(sectionBlocks, columnNo) {
      return sectionBlocks.filter((block => this.blockTypeExists(block.type) &&
        block.customFields &&
        block.customFields.fhGridColumn !== undefined &&
        block.customFields.fhGridColumn === columnNo - 1))
        .sort((a, b) => a.position - b.position);
    },

    /* Custom */
    getColumnDragData(block, sectionIndex, columnNo) {
      return {
        delay        : 300,
        dragGroup    : 'cms-navigator',
        data         : {block, sectionIndex, columnNo},
        validDragCls : null,
        onDragEnter  : this.onBlockDragSort,
        onDrop       : this.onBlockDragStop,
      };
    },

    /* Custom */
    getColumnDropData(block, sectionIndex, columnNo) {
      return {
        dragGroup : 'cms-navigator',
        data      : {block, sectionIndex, columnNo},
        onDrop    : this.onBlockDropAbort,
      };
    },

    /* Customized */
    async onBlockDragSort(dragData, dropData, validDrop) {
      if (validDrop !== true) {
        return;
      }

      const dragSectionIndex = dragData.sectionIndex;
      const dropSectionIndex = dropData.sectionIndex;

      const dropSection = this.page.sections[dropSectionIndex];

      if (dragSectionIndex < 0 || dragSectionIndex >= this.page.sections.length ||
        dropSectionIndex < 0 || dropSectionIndex >= this.page.sections.length) {
        return;
      }

      if (dragData.block.sectionPosition !== dropData.block.sectionPosition) {
        dragData.block.isDragging      = true;
        dragData.block.sectionPosition = dropData.block.sectionPosition;
      }

      // set current drag index to initial drag start index
      if (this.currentDragSectionIndex === null) {
        this.currentDragSectionIndex = dragSectionIndex;
      }

      // check if the section where the block is moved already has the block
      const dropSectionHasBlock = dropSection.blocks.has(dragData.block.id);
      if (this.currentDragSectionIndex !== dropSectionIndex && !dropSectionHasBlock) {
        dragData.block.isDragging = true;

        // calculate the remove index (this may differ since the block is moved each time it enters a new
        // section while the dragSectionIndex is the static start index of the drag
        let removeIndex = dragSectionIndex;
        if (this.currentDragSectionIndex !== dragSectionIndex &&
          Math.abs(this.currentDragSectionIndex - dropSectionIndex) === 1) {
          removeIndex = this.currentDragSectionIndex;
        }

        // drag direction is upwards so the currentDragSectionIndex is incremented
        if (this.currentDragSectionIndex - dropSectionIndex < 0) {
          this.currentDragSectionIndex += 1;
        }

        // drag direction is downwards so the currentDragSectionIndex is decremented
        if (this.currentDragSectionIndex - dropSectionIndex > 0) {
          this.currentDragSectionIndex -= 1;
        }

        dragData.block.sectionId = dropSection.id;

        dropSection.blocks.add(dragData.block);

        const oldSection = this.page.sections[removeIndex];
        oldSection.blocks.remove(dragData.block.id);
        oldSection._origin.blocks.remove(dragData.block.id);

        this.refreshPosition(oldSection.blocks);
        this.refreshPosition(dropSection.blocks);
        return;
      }

      if (dragData.block.position === dropData.block.position) {
        return;
      }

      // move item inside the section
      this.page.sections[dropSectionIndex].blocks.moveItem(dragData.block.position, dropData.block.position);
      this.page.sections[dropSectionIndex].blocks.get(dragData.block.id).customFields.fhGridColumn = dropData.columnNo - 1;

      this.refreshPosition(dropSection.blocks);
    },

    /* Standard */
    onVisibilityChange(selectedBlock, viewport, isVisible) {
      selectedBlock.visibility[viewport] = isVisible;
    },
  },
})
