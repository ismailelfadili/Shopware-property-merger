const {Application, Component, Mixin} = Shopware;
const {Criteria}                      = Shopware.Data;

import template from './fh-merchant-finder-list.html.twig';
import './fh-merchant-finder-list.scss';

import Papa from '../../../../../../../../../../FhLibs/src/Resources/PapaParse-5.0.2';

Component.register('fh-merchant-finder-list', {
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
      merchants       : null,
      sortBy          : 'company',
      showImportModal : false,
      isLoading       : false,
      selectedFile    : null,
      isImporting     : false,
    };
  },

  metaInfo() {
    return {
      title : this.$createTitle()
    };
  },

  computed : {

    fhMerchantRepository() {
      return this.repositoryFactory.create('fh_merchant');
    },

    mediaRepository() {
      return this.repositoryFactory.create('media');
    },

    customerGroupRepository() {
      return this.repositoryFactory.create('customer_group');
    },

    countryRepository() {
      return this.repositoryFactory.create('country');
    },

    salesChannelRepository() {
      return this.repositoryFactory.create('sales_channel');
    },

    customFieldSetRepository() {
      return this.repositoryFactory.create('custom_field_set');
    },

    columns() {
      return [
        {
          property    : 'active',
          dataIndex   : 'active',
          label       : this.$t('fh-merchant-finder.properties.active'),
          inlineEdit  : 'boolean',
          allowResize : true,
          align       : 'center'
        }, {
          property    : 'company',
          dataIndex   : 'company',
          label       : this.$t('fh-merchant-finder.properties.company'),
          routerLink  : 'fh.merchant.finder.detail',
          inlineEdit  : 'string',
          allowResize : true,
          primary     : true
        }, {
          property    : 'zipcode',
          dataIndex   : 'zipcode',
          label       : this.$t('fh-merchant-finder.properties.zipcode'),
          inlineEdit  : 'string',
          allowResize : true
        }, {
          property    : 'city',
          dataIndex   : 'city',
          label       : this.$t('fh-merchant-finder.properties.city'),
          inlineEdit  : 'string',
          allowResize : true
        }, {
          property    : 'email',
          dataIndex   : 'email',
          label       : this.$t('fh-merchant-finder.properties.email'),
          inlineEdit  : 'string',
          allowResize : true
        }, {
          property    : 'merchantTypeId',
          dataIndex   : 'merchantTypeId',
          label       : this.$t('fh-merchant-finder.properties.merchantTypeId'),
          inlineEdit  : 'string',
          allowResize : true
        }, {
          property    : 'locationLon',
          dataIndex   : 'locationLon',
          label       : this.$t('fh-merchant-finder.properties.location'),
          allowResize : true,
          align       : 'center'
        }
      ];
    }
  },

  created() {
    this.repository = this.fhMerchantRepository;

    this.csv = {
      data                   : [],
      matches                : 0,
      schemaProperties       : Object.keys(this.fhMerchantRepository.schema.properties),
      filterSchemaProperties : [
        'id',
        'mediaId',
        'productManufacturerId',
        'customFields',
        'autoIncrement',
        'data',
        'createdAt',
        'updatedAt',
        'media',
      ],
      csvProperties          : [],
      propertyMapping        : {},
      options                : {
        overwrite   : true,
        getPosition : false,
        silentMode  : false,
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

      this.customerGroupRepository.search(new Criteria(1, 100), Shopware.Context.api).then((searchResult) => {
        this.customerGroups = searchResult;
      });

      const countryCriteria = new Criteria(1, 100);
      countryCriteria.addSorting(Criteria.sort('name'));
      this.countryRepository.search(countryCriteria, Shopware.Context.api).then((searchResult) => {
        this.countries = searchResult;
      });

    },

    /* Get all merchants in admin list view */
    getList() {
      const criteria      = new Criteria(this.page, this.limit);
      this.isLoading      = true;
      this.naturalSorting = this.sortBy === 'company';

      criteria.setTerm(this.term);
      criteria.addSorting(Criteria.sort(this.sortBy, this.sortDirection, this.naturalSorting));

      this.fhMerchantRepository.search(criteria, Shopware.Context.api).then((items) => {
        this.total     = items.total;
        this.tax       = items;
        this.merchants = items;
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

    onClickUpload() {
      this.$refs.fileInput.click();
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

    /* Check if csv is empty or has more lines than 8k */
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

      if (this.csv.data.length > 8000) {
        this.createNotificationError({
          title   : this.$t('fh-merchant-finder.importAssistant.title'),
          message : this.$t('fh-merchant-finder.importAssistant.errorText'),
          autoClose : false,
        });
        this.isLoading = false;
        console.log('CSV can not be valid. It has '+this.csv.data.length+' lines!');
      } else {
        this.showImportModal = true;
      }
    },

    onClickImport() {
      this.createSystemNotificationSuccess({
        title     : this.$t('fh-merchant-finder.notification.importTitle'),
        message   : this.$t('fh-merchant-finder.notification.importText'),
        autoClose : false,
      });
      this.isLoading = true;
      this.importCsvRow();
    },

    importCsvRow() {
      this.isImporting     = true;
      this.showImportModal = false;

      console.log('Notice: Importing');
      let item             = this.csv.data.shift();
      item                 = this.sanitizeItem(item);

      if (this.csv.options.getPosition && isNaN(parseFloat(item.locationLat))) {

        setTimeout(() => {
          this.getPositionByAddress(item);
        }, 2567);

        console.log('Notice: Buffering Data Handling');

      } else {
        this.prepareSaveItem(item);
      }
    },

    sanitizeItem(item) {

      console.log("Notice: Sanitizing Item", item);

      const that  = this;
      let regex   = /^\s*(true|1|on|yes|ja|an)\s*$/i; // For Type = boolean
      let newItem = {};

      this.csv.schemaProperties.forEach(function (schemaProperty) {

        if (typeof that.csv.propertyMapping[schemaProperty] == 'string') {

          let propertyType = that.fhMerchantRepository.schema.properties[schemaProperty].type;

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
              if (that.csv.propertyMapping[schemaProperty].length === 32) {
                newItem[schemaProperty] = that.csv.propertyMapping[schemaProperty];
              }
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

      if (item.originId && this.csv.options.overwrite) {

        console.log("Notice: Searching for duplicate Entries");
        const merchantCriteria = new Criteria(1, 1);
        merchantCriteria.addFilter(Criteria.equals('originId', item.originId));

        this.fhMerchantRepository.search(merchantCriteria, Shopware.Context.api).then((result) => {
          if (result.length === 0) {
            console.log("Notice: No duplicate Entry found");
            result = this.fhMerchantRepository.create(Shopware.Context.api);
            Object.assign(result, item);
            this.saveItem(result);
          } else {
            result = result.first();
            console.log("Notice: Duplicate Entry found");
            Object.assign(result, item);
            this.saveItem(result);
          }
          return this.result;
        });

      } else {
        let result = this.fhMerchantRepository.create(Shopware.Context.api);
        Object.assign(result, item);
        this.saveItem(result);
      }

    },

    saveItem(item) {

      console.log("Notice: Saving Item", item);

      this.fhMerchantRepository
        .save(item, Shopware.Context.api)
        .then(() => {
          if (this.csv.data.length !== 0) {
            this.importCsvRow();
          } else {
            this.createSystemNotificationSuccess({
              title   : this.$t('fh-merchant-finder.notification.successTitle'),
              message : this.$t('fh-merchant-finder.notification.successText'),
              autoClose : false,
            });
            this.isLoading   = false;
            this.isImporting = false;

            this.getList();
          }
        }).catch((exception) => {
        console.log(exception);

        this.createNotificationError({
          title   : this.$t('fh-merchant-finder.notification.errorTitle'),
          message : exception
        });
        this.onCloseModal();
        this.isLoading   = false;
        this.isImporting = false;
      });
    },

    getPositionByAddress(item) {
      console.log("getPositionByAddress()", item);

      const that = this;

      ['zipcode', 'city', 'street', 'countryCode'].forEach(function (checkMe) {

        if (typeof item[checkMe] != 'string' || item[checkMe].trim() === "") {
          console.log("Notice: Missing property", checkMe);
          that.prepareSaveItem(item);
        }
      });

      const initContainer = Application.getContainer('init');
      const httpClient    = initContainer.httpClient;
      const searchParams  = new URLSearchParams({
        "format"  : "json",
        "zipcode" : item.zipcode,
        "city"    : item.city,
        "street"  : item.street/* + " " + item.streetNumber*/,
        "country" : item.countryCode
      });

      httpClient.get(`https://nominatim.openstreetmap.org/search.php?` + searchParams).then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          console.log("Notice: Position found");
          item.locationLon = parseFloat(response.data[0].lon);
          item.locationLat = parseFloat(response.data[0].lat);
        } else {
          console.log("Notice: No Position found");
        }
        this.prepareSaveItem(item);
      }).catch((exception) => {
        console.log(exception);
        this.isImporting = false;
        throw exception;
      });

    },

    onCloseModal() {
      this.showImportModal = false;
      this.showExportModal = false;
      this.showModal       = false;
    },

    onRefresh() {
      this.getList();
    },

    onClickDownload() {

      console.log("Notice: Download started");

      const initContainer = Application.getContainer('init');
      const httpClient    = initContainer.httpClient;

      httpClient.get("/v3/fh/merchant-finder/export").then((response) => {
        console.log(response.data);

        let a      = document.createElement('a');
        a.href     = 'data:attachment/csv,' + encodeURIComponent(response.data);
        a.target   = '_blank';
        a.download = 'fh_merchant_finder_export.csv';
        document.body.appendChild(a);
        a.click();

      });
    }
  }
});
