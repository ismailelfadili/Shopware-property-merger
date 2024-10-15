const {Component, Mixin, Application} = Shopware;
const {Criteria}                      = Shopware.Data;

import template from './fh-shopconnector-list.html.twig';
import './fh-shopconnector-list.scss';

import Papa from '../../../../../../../../../../FhLibs/src/Resources/PapaParse-5.0.2';

Component.register('fh-shopconnector-list', {
  template,

  inject : [
    'repositoryFactory',
    'context'
  ],

  mixins : [
    Mixin.getByName('notification'),
    Mixin.getByName('listing'),
    Mixin.getByName('placeholder')
  ],

  data() {
    return {
      repository      : null,
      items           : null,
      sortBy          : 'shopOperator',
      showImportModal : false,
      showDeleteModal : false,
      isLoading       : false,
      selectedFile    : null,
      isImporting     : false
    };
  },

  metaInfo() {
    return {
      title : this.$createTitle()
    };
  },

  computed : {

    fhShopConnectorUserRepository() {
      return this.repositoryFactory.create('fh_shopconnector_users');
    },

    fhShopConnectorProductRepository() {
      return this.repositoryFactory.create('fh_shopconnector_products');
    },

    mediaRepository() {
      return this.repositoryFactory.create('media');
    },

    salesChannelRepository() {
      return this.repositoryFactory.create('sales_channel');
    },

    columns() {
      return [
        {
          property    : 'active',
          dataIndex   : 'active',
          label       : this.$t('fh-shopconnector.list.columnActive'),
          inlineEdit  : 'boolean',
          allowResize : true,
          align       : 'center'
        },
        {
          property    : 'dealerNum',
          dataIndex   : 'dealerNum',
          label       : this.$t('fh-shopconnector.list.columnDealerNum'),
          inlineEdit  : 'string',
          allowResize : true,
          primary     : true
        },
        {
          property    : 'shopOperator',
          dataIndex   : 'shopOperator',
          label       : this.$t('fh-shopconnector.list.columnShopOperator'),
          routerLink  : 'fh.shopconnector.detail',
          inlineEdit  : 'string',
          allowResize : true
        },
        /*
        {
          property    : 'media',
          label       : this.$t('fh-shopconnector.list.columnShopLogo'),
          allowResize : true
        },
        */
        {
          property    : 'shopUrl',
          dataIndex   : 'shopUrl',
          label       : this.$t('fh-shopconnector.list.columnShopUrl'),
          inlineEdit  : 'string',
          allowResize : true
        }
      ];
    }
  },

  created() {
    this.csv = {
      data    : [],
      matches : 0,
      /* Object keys for csv to -> db */
      schemaProperties : Object.keys(this.fhShopConnectorProductRepository.schema.properties),
      /* Remove properties here */
      filterSchemaProperties : [
        'id',
        'dealer',
        'createdAt',
        'updatedAt'
      ],
      csvProperties          : [],
      propertyMapping        : {},
      options                : {
        overwrite  : true,
        silentMode : false,
      }
    };

    this.getList();
    this.initializeFurtherComponents();
  },

  methods : {
    initializeFurtherComponents() {
      this.salesChannelRepository.search(new Criteria(1, 100), Shopware.Context.api).then((searchResult) => {
        this.salesChannels = searchResult;
      });

      const mediaCriteria = new Criteria(1, 500);
      mediaCriteria.addSorting(Criteria.sort('fileName'));
      this.mediaRepository.search(mediaCriteria, Shopware.Context.api).then((searchResult) => {
        this.medias = searchResult;
      });
    },

    getList() {
      const criteria      = new Criteria();
      this.isLoading      = true;
      this.naturalSorting = this.sortBy === 'shopOperator';

      criteria.setTerm(this.term);
      criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection));

      return this.fhShopConnectorUserRepository.search(criteria, Shopware.Context.api).then((items) => {
        this.total     = items.total;
        this.items     = items;
        this.isLoading = false;

        return this.items;
      });
    },

    updateSelection() {
      console.log("ok");
    },

    updateTotal({total}) {
      this.total = total;
    },

    onChangeLanguage() {
      this.getList();
    },

    onClickUpload() {
      this.$refs.fileInput.click();
    },

    onClickChooseDelete() {
      this.showDeleteModal = true;
    },

    onFileInputChange() {
      const that = this;

      if (this.$refs.fileInput.files[0]['type'] === 'text/csv') {
        Papa.parse(this.$refs.fileInput.files[0], {
          header         : true,
          skipEmptyLines : true,
          complete       : function (results, file) {
            console.log("Notice: Parsing complete", results, file);

            that.csv.data = results.data;
            that.validateCsv();
            that.$refs.fileForm.reset();
          }
        });
      } else {
        console.log("File error");

        this.createNotificationError({
          title   : this.$t('fh-shopconnector.importAssistant.errorTitle'),
          message : this.$t('fh-shopconnector.importAssistant.errorText'),
          autoClose : false,
        });

        this.onCloseModal();
        this.isLoading   = false;
        this.isImporting = false;
      }
    },

    validateCsv() {
      const that = this;
      let result = false;

      this.csv.csvProperties = Object.keys(this.csv.data[0]);
      this.csv.matches       = 0;
      this.csv.schemaProperties.forEach(function (schemaProperty) {

        result = that.csv.csvProperties.indexOf(schemaProperty);
        if (result !== -1) {
          that.csv.propertyMapping[schemaProperty] = that.csv.csvProperties[result];
          that.csv.matches++;
        }
      });

      this.showImportModal = true;
    },

    onClickImport() {
      this.createSystemNotificationSuccess({
        title   : this.$t('fh-shopconnector.notification.importTitle'),
        message : this.$t('fh-shopconnector.notification.importText'),
        autoClose : false,
      });
      this.isLoading = true;
      //this.deleteDealerProducts();
      this.importCsvRow();
    },

    importCsvRow() {
      this.isImporting     = true;
      this.showImportModal = false;

      console.log('Notice: Connector is Importing');
      let item = this.csv.data.shift();
      item     = this.sanitizeItem(item);
      this.prepareSaveItem(item);
    },

    sanitizeItem(item) {
      console.log("Notice: Sanitizing Item", item);

      const that  = this;
      let regex   = /^\s*(true|1|on|yes|ja|an)\s*$/i; // For Type = boolean
      let newItem = {};

      this.csv.schemaProperties.forEach(function (schemaProperty) {

        if (typeof that.csv.propertyMapping[schemaProperty] == 'string') {

          let propertyType = that.fhShopConnectorProductRepository.schema.properties[schemaProperty].type;

          switch (propertyType) {
            case 'boolean':
              if (['1', '0'].indexOf(that.csv.propertyMapping[schemaProperty]) !== -1) {
                newItem[schemaProperty] = regex.test(that.csv.propertyMapping[schemaProperty]);
              } else {
                newItem[schemaProperty] = regex.test(item[that.csv.propertyMapping[schemaProperty]]);
              }
              break;
            case 'varchar':
              newItem[schemaProperty] = parseInt(item[that.csv.propertyMapping[schemaProperty]]);
              break;
            case 'binary':
              newItem[schemaProperty] = parseInt(item[that.csv.propertyMapping[schemaProperty]]);
              break;
            case 'int':
              newItem[schemaProperty] = parseInt(item[that.csv.propertyMapping[schemaProperty]]);
              break;
            case 'float':
              newItem[schemaProperty] = parseFloat(item[that.csv.propertyMapping[schemaProperty]]);
              break;
            case 'uuid':
              newItem[schemaProperty] = that.csv.propertyMapping[schemaProperty];
              break;
            case 'date':
              // Do nothing
              break;
            default:
              newItem[schemaProperty] = item[that.csv.propertyMapping[schemaProperty]];
          }
        }
      });
      return newItem;
    },

    prepareSaveItem(item) {
      console.log("Notice: Preparing Item", item);

      if (this.csv.options.overwrite) {
        console.log("Notice: Searching for duplicate Entries");

        const productCriteria = new Criteria(1, 1);

        if (item.dealerId && item.originId) {
          productCriteria.addFilter(Criteria.multi(
            'AND',
            [
              Criteria.equals('dealerId', item.dealerId),
              Criteria.equals('id', item.originId)
            ],
          ));

        } else if (item.dealerId && item.wekaArtNum) {
          productCriteria.addFilter(Criteria.multi(
            'AND',
            [
              Criteria.equals('dealerId', item.dealerId),
              Criteria.equals('weka_artnum', item.wekaArtNum)
            ],
          ));

        } else if (item.dealerId && item.ean) {
          productCriteria.addFilter(Criteria.multi(
            'AND',
            [
              Criteria.equals('dealerId', item.dealerId),
              Criteria.equals('ean', item.ean)
            ],
          ));
        }

        this.fhShopConnectorProductRepository.search(productCriteria, Shopware.Context.api).then((result) => {
          if (result.length === 0) {
            console.log("Notice: No duplicate Entry found");

            result = this.fhShopConnectorProductRepository.create(Shopware.Context.api);
            Object.assign(result, item);
            this.saveItem(result);

          } else {
            console.log("Notice: Duplicate Entry found");

            result = result.first();
            Object.assign(result, item);
            this.saveItem(result);
          }
          return this.result;
        });

      } else {
        let result = this.fhShopConnectorProductRepository.create(Shopware.Context.api);
        Object.assign(result, item);
        this.saveItem(result);
      }
    },

    saveItem(item) {
      console.log("Notice: Saving Item", item);

      this.fhShopConnectorProductRepository
        .save(item, Shopware.Context.api)
        .then(() => {
          if (this.csv.data.length !== 0) {
            this.importCsvRow();
          } else {
            this.createSystemNotificationSuccess({
              title   : this.$t('fh-shopconnector.notification.successTitle'),
              message : this.$t('fh-shopconnector.notification.successText'),
              autoClose : false,
            });
            this.isLoading   = false;
            this.isImporting = false;

            this.getList();
          }
        }).catch((exception) => {
        console.log(exception);

        this.createNotificationError({
          title   : this.$t('fh-shopconnector.notification.errorTitle'),
          message : exception
        });
        this.onCloseModal();
        this.isLoading   = false;
        this.isImporting = false;
      });
    },

    onCloseModal() {
      this.showImportModal = false;
      this.showExportModal = false;
      this.showDeleteModal = false;
      this.showModal       = false;
    },

    onRefresh() {
      this.getList();
    },

    onClickDownload() {
      console.log("Notice: Download started");

      const initContainer = Application.getContainer('init');
      const httpClient    = initContainer.httpClient;

      httpClient.get("/v3/fh/shopconnector/export").then((response) => {
        console.log(response.data);

        let a      = document.createElement('a');
        a.href     = 'data:attachment/csv,' + encodeURIComponent(response.data);
        a.target   = '_blank';
        a.download = 'fh_shopconnector_export.csv';
        document.body.appendChild(a);
        a.click();

      });
    },

    deleteDealerProducts(dealerId) {
      const dealerCriteria = new Criteria(1, 25);
      dealerCriteria.addFilter(Criteria.equals('dealerId', dealerId));

      this.fhShopConnectorProductRepository
        .search(dealerCriteria, Shopware.Context.api)
        .then((result) => {

          if (result.total > 0) {
            result.forEach((item) => {
              this.fhShopConnectorProductRepository.delete(item.id, Shopware.Context.api);
            });

            /* Recursion */
            this.deleteDealerProducts(dealerId);
          } else {
            this.createSystemNotificationSuccess({
              title   : this.$t('fh-shopconnector.notification.successTitle'),
              message : this.$t('fh-shopconnector.notification.deleteSuccessText'),
              autoClose : false,
            });

            this.isImporting = false;
            this.isLoading   = false;
          }
        });
    },

    onClickDelete() {
      console.log("Notice: Deleting now");

      /* Get dealerId first */
      console.log(this.$refs.dealerId.value);
      let dealerId = this.$refs.dealerId.value;

      /* Close delete popup */
      this.onCloseModal();
      this.createSystemNotificationSuccess({
        title   : this.$t('fh-shopconnector.notification.deleteTitle'),
        message : this.$t('fh-shopconnector.notification.importText'),
        autoClose : false,
      });
      this.isImporting = true;
      this.isLoading   = true;

      this.deleteDealerProducts(dealerId);
    }
  }
});
