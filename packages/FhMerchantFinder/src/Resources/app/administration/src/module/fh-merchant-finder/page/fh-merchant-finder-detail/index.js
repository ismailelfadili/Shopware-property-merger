import template from './fh-merchant-finder-detail.html.twig';

const { Application, Component, Mixin } = Shopware;
const { Criteria } = Shopware.Data;
const utils = Shopware.Utils;

import L from '../../../../../../../../Resources/leaflet/leaflet';

Component.register('fh-merchant-finder-detail', {
  template,

  inject : [
    'repositoryFactory',
    'context'
  ],

  mixins : [
    Mixin.getByName('notification'),
    Mixin.getByName('placeholder'),
    Mixin.getByName('discard-detail-page-changes')('merchant')
  ],

  shortcuts : {
    'SYSTEMKEY+S' : 'onSave',
    ESCAPE        : 'onAbortButtonClick'
  },

  metaInfo() {
    return {
      title : this.$createTitle()
    };
  },

  data() {
    return {
      merchant             : [],
      salesChannels        : null,
      countries            : null,
      customerGroups       : null,
      isLoading            : false,
      processSuccess       : false,
      repository           : null,
      searchTerm           : '',
      mediaEntity          : null,
      showPicker           : false,
      showUploadField      : false,
      suggestedItems       : [],
      isLoadingSuggestions : false,
      pickerClasses        : {},
      uploadTag            : utils.createId(),
      mediaItem            : null,
      markerItem           : null,
      markerShadowItem     : null,
      customFieldSets      : []
    };
  },

  computed : {
    mediaStore() {
      return this.repositoryFactory.create('media');
    },

    fhMerchantRepository() {
      return this.repositoryFactory.create('fh_merchant');
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
  },

  created() {
    this.repository = this.fhMerchantRepository;
    this.initializeFurtherComponents();
    this.getMerchant();
  },

  /*
  methods: {
      initializeFurtherComponents() {
          this.salesChannelRepository.search(new Criteria(1, 100), Shopware.Context.api).then((result) => {
              this.salesChannels = result;
          });

          this.customerGroupRepository.search(new Criteria(1, 100), Shopware.Context.api).then((result) => {
              this.customerGroups = result;
          });

          const countryCriteria = new Criteria(1, 100);
          countryCriteria.addSorting(Criteria.sort('name'));
          this.countryRepository.search(countryCriteria, Shopware.Context.api).then((result) => {
              this.countries = result;
          });
      },
  */

  methods : {
    initializeFurtherComponents() {

      const criteria = new Criteria();
      criteria.setTerm(this.term);

      this.salesChannelRepository.search(new Criteria(1, 100), Shopware.Context.api).then((searchResult) => {
        this.salesChannels = searchResult;
        return this.searchResult;
      }).catch(() => {
        this.isLoading = false;
      });

      this.customerGroupRepository.search(new Criteria(1, 100), Shopware.Context.api).then((searchResult) => {
        this.customerGroups = searchResult;
        return this.searchResult;
      }).catch(() => {
        this.isLoading = false;
      });

      const countryCriteria = new Criteria(1, 100);
      countryCriteria.addSorting(Criteria.sort('name'));

      this.countryRepository.search(countryCriteria, Shopware.Context.api).then((searchResult) => {
        this.countries = searchResult;
        return this.searchResult;
      }).catch(() => {
        this.isLoading = false;
      });
    },

    getMerchant() {
      this.repository
        .get(this.$route.params.id, Shopware.Context.api)
        .then((entity) => {
          this.merchant         = entity;
          this.mediaItem        = this.merchant.mediaId ? this.mediaStore.getById(this.merchant.mediaId) : null;
          this.markerItem       = this.merchant.markerId ? this.mediaStore.getById(this.merchant.markerId) : null;
          this.markerShadowItem = this.merchant.markerShadowId ? this.mediaStore.getById(this.merchant.markerShadowId) : null;
          this.isLoading        = false;
        });
    },

    drawMap() {
      if (this.ol === undefined || this.ol === null) {

        console.log(this.merchant.locationLat, this.merchant.locationLon);

        const that = this;
        this.ol    = {};
        /* Check if Lat Lon is set and decide if we get 0,0 or Lat Lon */
        if (this.merchant.locationLat === undefined || this.merchant.locationLat === null || this.merchant.locationLon === undefined || this.merchant.locationLon === null) {
          this.ol.center = [
            this.merchant.locationLat = 0,
            this.merchant.locationLon = 0
          ];

        } else {
          this.ol.center = [
            this.merchant.locationLat,
            this.merchant.locationLon
          ];
        }

        this.ol.map = L.map('embedMap', {
          center : this.ol.center,
          zoom   : 16
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom     : 18,
          attribution : '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
        }).addTo(this.ol.map);
        this.ol.marker = L.marker(this.ol.center, {draggable : true})
          .on('dragend', function () {
            that.ol.center = that.ol.marker.getLatLng();
            that.ol.map.flyTo(that.ol.center, 16, {animate : true, duration : 1});
          })
          .addTo(this.ol.map);
      } else {
        console.log('Map container is already initialized.');
      }
    },

    getPositionByAddress() {
      this.isLoading      = true;
      const initContainer = Application.getContainer('init');
      const httpClient    = initContainer.httpClient;
      const searchParams  = new URLSearchParams({
        "format"  : "json",
        "zipcode" : this.merchant.zipcode,
        "city"    : this.merchant.city,
        "street"  : this.merchant.street/* + " " + this.merchant.streetNumber*/,
        "country" : this.merchant.countryCode
      });

      httpClient.get(`https://nominatim.openstreetmap.org/search.php?` + searchParams).then((response) => {
        // console.log(response);
        let lat        = parseFloat(response.data[0].lat),
            lon        = parseFloat(response.data[0].lon);
        this.ol.center = [
          lat,
          lon,
        ];
        this.ol.map.flyTo(this.ol.center, 16, {animate : true, duration : 1});
        this.ol.marker.setLatLng(this.ol.center);
        /* Get response lat lon from OSM */
        this.merchant.locationLat = lat;
        this.merchant.locationLon = lon;
        this.isLoading            = false;

      }).catch((exception) => {
        console.log(exception);
        this.isLoading = false;
        throw exception;
      });
    },

    posSelect() {
      if (this.ol.center.lat !== undefined || this.ol.center.lng !== undefined || true) {
        this.merchant.locationLat = this.ol.center.lat;
        this.merchant.locationLon = this.ol.center.lng;
      } else {
        console.log('Equal Lat Lon');
      }
    },

    onClickSave() {
      this.isLoading = true;

      this.repository
        .save(this.merchant, Shopware.Context.api)
        .then(() => {
          this.getMerchant();
          this.processSuccess = true;
        }).catch((exception) => {
        this.isLoading = false;
        this.createNotificationError({
          title   : this.$t('fh-merchant-finder.detail.errorTitle'),
          message : exception
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
    setMediaItem({targetId}) {
      this.merchant.mediaId = targetId;
      this.mediaStore.getByIdAsync(targetId);
    },
    onDropMedia(dragData) {
      this.setMediaItem({targetId : dragData.id});
    },
    setMediaFromSidebar(mediaEntity) {
      this.merchant.mediaId = mediaEntity.id;
    },
    onUnlinkMedia() {
      this.merchant.mediaId = null;
    },

    // Marker
    setMarkerItem({targetId}) {
      this.merchant.markerId = targetId;
      this.mediaStore.getByIdAsync(targetId);
    },
    onDropMarker(dragData) {
      this.setMarkerItem({targetId : dragData.id});
    },
    setMarkerFromSidebar(mediaEntity) {
      this.merchant.markerId = mediaEntity.id;
    },
    onUnlinkMarker() {
      this.merchant.markerId = null;
    },

    // Marker Shadow
    setMarkerShadowItem({targetId}) {
      this.merchant.markerShadowId = targetId;
      this.mediaStore.getByIdAsync(targetId);
    },
    onDropMarkerShadow(dragData) {
      this.setMarkerShadowItem({targetId : dragData.id});
    },
    setMarkerShadowFromSidebar(mediaEntity) {
      this.merchant.markerShadowId = mediaEntity.id;
    },
    onUnlinkMarkerShadow() {
      this.merchant.markerShadowId = null;
    }
  }
});
