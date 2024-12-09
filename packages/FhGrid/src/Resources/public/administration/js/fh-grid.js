(function(){var e={716:function(){},985:function(){},355:function(){},749:function(){},298:function(e,n,t){var s=t(716);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),t(346).Z("8fcdb58a",s,!0,{})},928:function(e,n,t){var s=t(985);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),t(346).Z("c6e600fa",s,!0,{})},626:function(e,n,t){var s=t(355);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),t(346).Z("15effb33",s,!0,{})},391:function(e,n,t){var s=t(749);s.__esModule&&(s=s.default),"string"==typeof s&&(s=[[e.id,s,""]]),s.locals&&(e.exports=s.locals),t(346).Z("2c1c17e3",s,!0,{})},346:function(e,n,t){"use strict";function s(e,n){for(var t=[],s={},o=0;o<n.length;o++){var i=n[o],c=i[0],l={id:e+":"+o,css:i[1],media:i[2],sourceMap:i[3]};s[c]?s[c].parts.push(l):t.push(s[c]={id:c,parts:[l]})}return t}t.d(n,{Z:function(){return f}});var o="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!o)throw Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var i={},c=o&&(document.head||document.getElementsByTagName("head")[0]),l=null,d=0,r=!1,a=function(){},m=null,u="data-vue-ssr-id",h="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function f(e,n,t,o){r=t,m=o||{};var c=s(e,n);return b(c),function(n){for(var t=[],o=0;o<c.length;o++){var l=i[c[o].id];l.refs--,t.push(l)}n?b(c=s(e,n)):c=[];for(var o=0;o<t.length;o++){var l=t[o];if(0===l.refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete i[l.id]}}}}function b(e){for(var n=0;n<e.length;n++){var t=e[n],s=i[t.id];if(s){s.refs++;for(var o=0;o<s.parts.length;o++)s.parts[o](t.parts[o]);for(;o<t.parts.length;o++)s.parts.push(p(t.parts[o]));s.parts.length>t.parts.length&&(s.parts.length=t.parts.length)}else{for(var c=[],o=0;o<t.parts.length;o++)c.push(p(t.parts[o]));i[t.id]={id:t.id,refs:1,parts:c}}}}function g(){var e=document.createElement("style");return e.type="text/css",c.appendChild(e),e}function p(e){var n,t,s=document.querySelector("style["+u+'~="'+e.id+'"]');if(s){if(r)return a;s.parentNode.removeChild(s)}if(h){var o=d++;n=k.bind(null,s=l||(l=g()),o,!1),t=k.bind(null,s,o,!0)}else n=v.bind(null,s=g()),t=function(){s.parentNode.removeChild(s)};return n(e),function(s){s?(s.css!==e.css||s.media!==e.media||s.sourceMap!==e.sourceMap)&&n(e=s):t()}}var _=function(){var e=[];return function(n,t){return e[n]=t,e.filter(Boolean).join("\n")}}();function k(e,n,t,s){var o=t?"":s.css;if(e.styleSheet)e.styleSheet.cssText=_(n,o);else{var i=document.createTextNode(o),c=e.childNodes;c[n]&&e.removeChild(c[n]),c.length?e.insertBefore(i,c[n]):e.appendChild(i)}}function v(e,n){var t=n.css,s=n.media,o=n.sourceMap;if(s&&e.setAttribute("media",s),m.ssrId&&e.setAttribute(u,n.id),o&&(t+="\n/*# sourceURL="+o.sources[0]+" */\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=t;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(t))}}}},n={};function t(s){var o=n[s];if(void 0!==o)return o.exports;var i=n[s]={id:s,exports:{}};return e[s](i,i.exports,t),i.exports}t.d=function(e,n){for(var s in n)t.o(n,s)&&!t.o(e,s)&&Object.defineProperty(e,s,{enumerable:!0,get:n[s]})},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="bundles/fhgrid/",window?.__sw__?.assetPath&&(t.p=window.__sw__.assetPath+"/bundles/fhgrid/"),function(){"use strict";t(298);let{Component:e}=Shopware;e.register("fh-grid-config-modal",{template:'{% block fh_grid_config_modal %}\n    <sw-modal :title="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.title\')" @modal-close="$emit(\'modal-close\')" variant="large" class="fh-grid-config-modal">\n        <template #default>\n\n            <div>\n                <sw-tabs defaultItem="grid">\n                    <template slot-scope="{ active }">\n                        <sw-tabs-item name="grid"\n                                      :activeTab="active">\n                            {{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.grid\') }}\n                        </sw-tabs-item>\n\n                        <sw-tabs-item name="advanced"\n                                      :activeTab="active">\n                            {{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.advanced\') }}\n                        </sw-tabs-item>\n                    </template>\n\n                    <template slot="content" slot-scope="{ active }">\n                        <template v-if="active === \'grid\'">\n                            {% block fh_grid_config_modal_info %}\n                                <sw-alert variant="info">\n                                    <div v-html="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.infoText\')"></div>\n                                </sw-alert>\n                            {% endblock %}\n\n                            {% block fh_grid_config_modal_number_of_columns %}\n                                <sw-number-field :label="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.numberOfColumns\')"\n                                                 :value="gridColumns"\n                                                 @change="onNumberOfColumnsChange"\n                                                 class="mb-16px"\n                                                 :max="12"\n                                                 :min="1"></sw-number-field>\n                            {% endblock %}\n\n                            {% block fh_grid_config_modal_table_header %}\n                                <sw-container :columns="formColumns"\n                                              gap="16px"\n                                              class="mb-16px">\n                                    {% block fh_grid_config_modal_table_header_breakpoint %}\n                                        <div class="text-center">\n\n                                        </div>\n                                    {% endblock %}\n                                    {% block fh_grid_config_modal_table_header_value %}\n                                        <div v-for="(n, columnIndex) in gridColumns" :key="columnIndex"\n                                             class="text-center">\n                                            {{ columnIndex+1 }}\n                                        </div>\n                                    {% endblock %}\n                                </sw-container>\n                            {% endblock %}\n\n                            {% block fh_grid_config_modal_table_body %}\n                                <sw-container :columns="formColumns"\n                                              gap="16px"\n                                              class="mb-16px"\n                                              v-for="breakpoint in breakpoints"\n                                              :key="breakpoint.key">\n                                    {% block fh_grid_config_modal_table_body_breakpoint %}\n                                        <div class="text-center">\n                                            {{ breakpoint.label }}\n                                        </div>\n                                    {% endblock %}\n                                    {% block fh_grid_config_modal_table_body_values %}\n                                        <div v-for="(n, columnIndex) in gridColumns" :key="columnIndex">\n                                            {% block fh_grid_config_modal_table_body_value %}\n                                                <sw-number-field\n                                                    v-model="section.customFields.fhGridColumnWidths[columnIndex][breakpoint.key]"\n                                                    :max="12"\n                                                    :min="1"></sw-number-field>\n                                            {% endblock %}\n                                        </div>\n                                    {% endblock %}\n                                </sw-container>\n                            {% endblock %}\n                        </template>\n\n                        <template v-if="active === \'advanced\'">\n                            <strong>{{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.globalConfig\') }}</strong>\n                            <sw-switch-field\n                                :label="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.noGutters\')"\n                                v-model="section.customFields.fhGridConfig.noGutters"\n                                :noMarginTop="true"></sw-switch-field>\n\n                            <br />\n                            <strong>{{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.columnConfig\') }}</strong><br />\n                            <br />\n                            <div v-for="(n, columnIndex) in gridColumns" :key="columnIndex" class="column-advanced">\n                                <strong>{{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.column\') }} {{ columnIndex+1 }}</strong><br/>\n\n                                <sw-container columns="180px auto" gap="32px">\n                                    <sw-switch-field\n                                        :label="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.isSidebar\')"\n                                        v-model="section.customFields.fhGridColumnWidths[columnIndex].isSidebar"\n                                        :noMarginTop="true"></sw-switch-field>\n\n                                    <sw-text-field :label="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.cssClasses\')"\n                                                   v-model="section.customFields.fhGridColumnWidths[columnIndex].cssClasses"></sw-text-field>\n                                </sw-container>\n\n                                <sw-container columns="180px 1fr 1fr 1fr 1fr 1fr" gap="32px">\n                                    <div>{{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.hideOn\') }}</div>\n                                    <sw-switch-field\n                                        :label="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.hide\')"\n                                        v-model="section.customFields.fhGridColumnWidths[columnIndex].hideOn.default"\n                                        :noMarginTop="true"></sw-switch-field>\n                                    <sw-switch-field\n                                        label="sm"\n                                        v-model="section.customFields.fhGridColumnWidths[columnIndex].hideOn.sm"\n                                        :noMarginTop="true"></sw-switch-field>\n                                    <sw-switch-field\n                                        label="md"\n                                        v-model="section.customFields.fhGridColumnWidths[columnIndex].hideOn.md"\n                                        :noMarginTop="true"></sw-switch-field>\n                                    <sw-switch-field\n                                        label="lg"\n                                        v-model="section.customFields.fhGridColumnWidths[columnIndex].hideOn.lg"\n                                        :noMarginTop="true"></sw-switch-field>\n                                    <sw-switch-field\n                                        label="xl"\n                                        v-model="section.customFields.fhGridColumnWidths[columnIndex].hideOn.xl"\n                                        :noMarginTop="true"></sw-switch-field>\n                                </sw-container>\n\n                            </div>\n\n                            <sw-alert variant="info">\n                                <div v-html="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.hideOnHelpText\')"></div>\n                            </sw-alert>\n                        </template>\n                    </template>\n                </sw-tabs>\n            </div>\n\n        </template>\n    </sw-modal>\n{% endblock %}\n',props:{section:{type:Object,required:!0}},computed:{gridColumns(){return parseInt(this.section.customFields.fhGridColumns,10)},formColumns(){let e="72px";for(let n=0;n<12;n++)e+=" 1fr";return e},breakpoints(){return[{label:this.$tc("sw-cms.sidebar.contentMenu.fhGrid.labelDefault"),key:"col"},{label:"xs",key:"xs"},{label:"sm",key:"sm"},{label:"md",key:"md"},{label:"lg",key:"lg"},{label:"xl",key:"xl"}]}},watchers:{gridColumns(){this.initCustomFields()}},created(){this.initCustomFields()},methods:{onNumberOfColumnsChange(e){this.section.customFields.fhGridColumns=parseInt(e,10),this.initCustomFields()},initCustomFields(){if(this.section){this.section.customFields||(this.section.customFields={}),this.section.customFields.fhGridColumns||(this.section.customFields.fhGridColumns=3),this.section.customFields.fhGridConfig||(this.section.customFields.fhGridConfig={}),this.section.customFields.fhGridConfig.noGutters||(this.section.customFields.fhGridConfig.noGutters=!1),this.section.customFields.fhGridColumnWidths||this.$set(this.section.customFields,"fhGridColumnWidths",[]);for(let e=0;e<this.gridColumns;e++)this.section.customFields.fhGridColumnWidths[e]||this.$set(this.section.customFields.fhGridColumnWidths,e,{col:3,isSidebar:!1,cssClasses:""}),this.section.customFields.fhGridColumnWidths[e].hideOn||this.$set(this.section.customFields.fhGridColumnWidths[e],"hideOn",{default:!1,sm:!1,md:!1,lg:!1,xl:!1})}}}}),t(928);let{Component:n}=Shopware;n.register("fh-grid-section-config",{template:'{% block fh_grid_section_config %}\n    <div class="fh-grid-section-config">\n        {% block fh_grid_section_config_button %}\n            <sw-button class="sw-cms-section__btn-square" @click="showConfigModal = true"\n                       v-text="$tc(\'sw-cms.sidebar.contentMenu.fhGrid.openGridSettings\')">\n                <sw-icon name="regular-dashboard" size="20" />\n            </sw-button>\n        {% endblock %}\n\n        {% block fh_grid_section_config_modal %}\n            <fh-grid-config-modal v-if="showConfigModal"\n                                  @modal-close="showConfigModal = false"\n                                  :section="section"></fh-grid-config-modal>\n        {% endblock %}\n    </div>\n{% endblock %}\n',props:{section:{type:Object,required:!0}},data(){return{showConfigModal:!1}}}),t(626);let{Component:s}=Shopware;s.override("sw-cms-section",{template:'{% block sw_cms_section_content %}\n    <template v-if="section.type == \'fh-grid\'">\n        <div :class="{\'fh-grid-row\': true, \'no-gutters\': section.customFields.fhGridConfig.noGutters}">\n            {% block sw_cms_section_content_grid_section %}\n                <div class="sw-cms-section__content fh-grid-column" v-for="(n, gridIndex) in gridColumns"\n                     :key="gridIndex"\n                     :class="colWidthClass(gridIndex)">\n                    <template v-if="isGridContentEmpty(gridIndex)">\n                        {% block sw_cms_section_content_grid_block_empty %}\n                            <div\n                                v-droppable="{ dragGroup: \'cms-stage\', data: getDropGridData(blockCount, gridIndex) }"\n                                class="sw-cms-section__empty-stage"\n                                @click="openBlockBar"\n                            >\n\n                                <sw-icon name="regular-plus-circle" size="24" />\n                                <p>{{ $tc(\'sw-cms.detail.label.addBlocks\') }}</p>\n                            </div>\n                        {% endblock %}\n                    </template>\n\n                    <template v-else>\n\n                        {% block sw_cms_section_content_grid_add_first_block %}\n                            <sw-cms-stage-add-block\n                                v-if="isSystemDefaultLanguage && !disabled"\n                                :key="0"\n                                v-droppable="{ dragGroup: \'cms-stage\', data: getDropGridData(0, gridIndex) }"\n                                @stage-block-add="onAddSectionBlock"\n                            />\n                        {% endblock %}\n\n                        <template v-for="(block, index) in gridBlocks(gridIndex)">\n                            {% block sw_cms_section_content_grid_block %}\n                                <sw-cms-block\n                                    :key="block.id"\n                                    class="sw-cms-stage-block"\n                                    :disabled="disabled"\n                                    :block="block"\n                                    :active="selectedBlock !== null && selectedBlock.id === block.id"\n                                    @block-overlay-click="onBlockSelection(block)"\n                                >\n\n                                    {% block sw_cms_section_content_grid_block_component %}\n                                        <component :is="`sw-cms-block-${block.type}`">\n                                            {% block sw_cms_section_content_block_component_slot %}\n                                                <sw-cms-slot\n                                                    v-for="el in block.slots"\n                                                    :slot="el.slot"\n                                                    :key="el.id"\n                                                    :element="el"\n                                                    :disabled="disabled"\n                                                    :active="selectedBlock !== null && selectedBlock.id === block.id"\n                                                />\n                                            {% endblock %}\n                                        </component>\n                                    {% endblock %}\n                                </sw-cms-block>\n                            {% endblock %}\n\n                            {% block sw_cms_section_add_content_grid_block %}\n                                <sw-cms-stage-add-block\n                                    v-if="isSystemDefaultLanguage && !disabled"\n                                    :key="index + 1"\n                                    v-droppable="{ dragGroup: \'cms-stage\', data: getDropGridData(block.position + 1, gridIndex) }"\n                                    @stage-block-add="onAddSectionBlock"\n                                />\n                            {% endblock %}\n                        </template>\n                    </template>\n                </div>\n            {% endblock %}\n        </div>\n    </template>\n    <template v-else>\n        {% parent %}\n    </template>\n{% endblock %}\n',watchers:{section(){this.initGrid()},blocks(){this.checkBlocks()}},computed:{gridColumns(){return parseInt(this.section.customFields.fhGridColumns,10)}},created(){this.initGrid(),this.checkBlocks()},methods:{initGrid(){"fh-grid"===this.section.type&&(this.section.customFields||(this.section.customFields={}),this.section.customFields.fhGridColumns||this.$set(this.section.customFields,"fhGridColumns",3),this.section.customFields.fhGridConfig||this.$set(this.section.customFields,"fhGridConfig",{}),this.section.customFields.fhGridConfig.noGutters||this.$set(this.section.customFields.fhGridConfig,"noGutters",!1),this.section.customFields.fhGridColumnWidths||this.$set(this.section.customFields,"fhGridColumnWidths",[{col:12,lg:3},{col:12,lg:6},{col:12,lg:3}]))},checkBlocks(){this.section.blocks.filter(e=>!e.customFields||void 0===e.customFields.fhGridColumn).forEach(e=>{e.customFields||(e.customFields={}),e.customFields.fhGridColumn=1})},isGridContentEmpty(e){return 0===this.gridBlocks(e).length},gridBlocks(e){return this.section.blocks.filter(n=>this.blockTypeExists(n.type)&&n.customFields&&void 0!==n.customFields.fhGridColumn&&parseInt(n.customFields.fhGridColumn)===parseInt(e)).sort((e,n)=>e.position-n.position)},colWidthClass(e){let n=this.section.customFields.fhGridColumnWidths[e],t=["sm","md","lg","xl"];"tablet-landscape"===this.cmsPageState.currentCmsDeviceView&&(t=["sm","md","lg"]),"mobile"===this.cmsPageState.currentCmsDeviceView&&(t=["sm","md"]);let s=["col-"+n.col];return t.forEach(e=>{n[e]&&s.push("col-"+e+"-"+n[e])}),s},getDropGridData(e,n=0){return{dropIndex:e,section:this.section,sectionPosition:"main",fhGridColumn:n}}}});let{Component:o}=Shopware;o.override("sw-cms-section-actions",{template:'{% block sw_cms_section_action_select %}\n    {% parent %}\n\n    <template v-if="this.section.type == \'fh-grid\'">\n        {% block sw_cms_section_action_fh_grid %}\n\n            {% block sw_cms_section_action_fh_grid_button %}\n                <div class="sw-cms-section__action sw-cms-section-select" @click="showConfigModal = true">\n                    <sw-icon name="regular-cog" size="20" />\n                </div>\n            {% endblock %}\n\n            {% block sw_cms_section_action_fh_grid_modal %}\n                <fh-grid-config-modal v-if="showConfigModal" @modal-close="showConfigModal = false" :section="this.section"></fh-grid-config-modal>\n            {% endblock %}\n        {% endblock %}\n    </template>\n\n{% endblock %}\n',data(){return{showConfigModal:!1}}});let{Component:i}=Shopware,{cloneDeep:c}=Shopware.Utils.object,l=Shopware.Utils.types;i.override("sw-cms-sidebar",{template:'{% block sw_cms_sidebar_section_settings_content %}\n    {% parent %}\n\n    {% block sw_cms_sidebar_section_settings_fh_grid %}\n        <sw-sidebar-collapse :expand-on-loading="true" v-if="selectedSection.type == \'fh-grid\'">\n\n            {% block sw_cms_sidebar_section_settings_fh_grid_header %}\n                <span slot="header">\n                {{ $tc(\'sw-cms.sidebar.contentMenu.fhGrid.title\') }}\n            </span>\n            {% endblock %}\n\n            {% block sw_cms_sidebar_section_settings_fh_grid_form %}\n                <fh-grid-section-config\n                    slot="content"\n                    :section="selectedSection"\n                />\n            {% endblock %}\n        </sw-sidebar-collapse>\n    {% endblock %}\n{% endblock %}\n\n{% block sw_cms_sidebar_navigator_main_elements %}\n    <template v-if="section.type != \'fh-grid\'">\n        {% parent %}\n    </template>\n    <template v-else>\n        <template v-for="columnNo in section.customFields.fhGridColumns">\n            <div class="sw-cms-sidebar__navigator-section-spacer"></div>\n            <template v-if="getColumnContentBlocks(section.blocks, columnNo).length > 0">\n                <template v-for="block in getColumnContentBlocks(section.blocks, columnNo)">\n                    <sw-cms-sidebar-nav-element\n                        :key="block.id"\n                        v-draggable="getColumnDragData(block, sectionIndex, columnNo)"\n                        v-droppable="getColumnDropData(block, sectionIndex, columnNo)"\n                        :block="block"\n                        class="sw-cms-sidebar__navigator-block"\n                        :removable="blockIsRemovable(block)"\n                        :class="{ \'is--dragging\': block.isDragging }"\n                        @block-delete="onBlockDelete($event, section)"\n                        @block-duplicate="onBlockDuplicate($event, section)"\n                    />\n                </template>\n            </template>\n            <template v-else>\n                <div\n                    :key="section.id + \'_column_\' + columnNo"\n                    v-droppable="getColumnDropData({ position: 0, sectionPosition: \'sidebar\' }, sectionIndex, columnNo)"\n                    class="sw-cms-sidebar__navigator-empty-element"\n                >\n                    {{ $tc(\'sw-cms.detail.label.addBlocks\') }}\n                </div>\n            </template>\n        </template>\n    </template>\n{% endblock %}\n',methods:{onBlockStageDrop(e,n){if(!n||!e.block||n.dropIndex<0||!n.section)return;if("fh-grid"!==n.section.type)return this.$super("onBlockStageDrop",e,n);let t=this.cmsService.getCmsBlockRegistry(),s=n.section,o=t[e.block.name],i=this.blockRepository.create();i.type=e.block.name,i.position=n.dropIndex,i.sectionPosition=n.sectionPosition,i.sectionId=s.id,i.visibility={desktop:!0,tablet:!0,mobile:!0},i.customFields={fhGridColumn:n.fhGridColumn},Object.assign(i,c(this.blockConfigDefaults),c(o.defaultConfig||{})),Object.keys(o.slots).forEach(e=>{let n=o.slots[e],t=this.slotRepository.create();t.blockId=i.id,t.slot=e,"string"==typeof n?t.type=n:l.isPlainObject(n)&&(t.type=n.type,n.default&&l.isPlainObject(n.default)&&Object.assign(t,c(n.default)));let s=n.default?.data;[s?.media?.source,s?.sliderItems?.source].includes("default")&&(t.config={...t.config,...s}),i.slots.add(t)}),this.page.sections[s.position].blocks.splice(n.dropIndex,0,i),this.$emit("block-stage-drop"),this.$emit("current-block-change",s.id,i)},getColumnContentBlocks(e,n){return e.filter(e=>this.blockTypeExists(e.type)&&e.customFields&&void 0!==e.customFields.fhGridColumn&&e.customFields.fhGridColumn===n-1).sort((e,n)=>e.position-n.position)},getColumnDragData(e,n,t){return{delay:300,dragGroup:"cms-navigator",data:{block:e,sectionIndex:n,columnNo:t},validDragCls:null,onDragEnter:this.onBlockDragSort,onDrop:this.onBlockDragStop}},getColumnDropData(e,n,t){return{dragGroup:"cms-navigator",data:{block:e,sectionIndex:n,columnNo:t},onDrop:this.onBlockDropAbort}},async onBlockDragSort(e,n,t){if(!0!==t)return;let s=e.sectionIndex,o=n.sectionIndex,i=this.page.sections[o];if(s<0||s>=this.page.sections.length||o<0||o>=this.page.sections.length)return;e.block.sectionPosition!==n.block.sectionPosition&&(e.block.isDragging=!0,e.block.sectionPosition=n.block.sectionPosition),null===this.currentDragSectionIndex&&(this.currentDragSectionIndex=s);let c=i.blocks.has(e.block.id);if(this.currentDragSectionIndex!==o&&!c){e.block.isDragging=!0;let n=s;this.currentDragSectionIndex!==s&&1===Math.abs(this.currentDragSectionIndex-o)&&(n=this.currentDragSectionIndex),this.currentDragSectionIndex-o<0&&(this.currentDragSectionIndex+=1),this.currentDragSectionIndex-o>0&&(this.currentDragSectionIndex-=1),e.block.sectionId=i.id,i.blocks.add(e.block);let t=this.page.sections[n];t.blocks.remove(e.block.id),t._origin.blocks.remove(e.block.id),this.refreshPosition(t.blocks),this.refreshPosition(i.blocks);return}e.block.position!==n.block.position&&(this.page.sections[o].blocks.moveItem(e.block.position,n.block.position),this.page.sections[o].blocks.get(e.block.id).customFields.fhGridColumn=n.columnNo-1,this.refreshPosition(i.blocks))},onVisibilityChange(e,n,t){e.visibility[n]=t}}}),t(391);let{Component:d}=Shopware;d.override("sw-cms-stage-section-selection",{template:'{% block sw_cms_stage_section_selection__fullwidth %}\n    {% parent %}\n\n    {% block sw_cms_stage_section_selection__fh_grid %}\n        <div\n            class="sw-cms-stage-section-selection__fh-grid"\n            @click="selectSection(\'fh-grid\')"\n        >\n            <div class="sw-cms-stage-section-selection__fh-grid-preview">\n                <div class="sw-cms-stage-section-selection__fh-grid-preview-inner">\n                    <span>%</span>\n                </div>\n            </div>\n            {{ $tc(\'sw-cms.section.fhGrid\') }}\n        </div>\n    {% endblock %}\n{% endblock %}\n'})}()})();