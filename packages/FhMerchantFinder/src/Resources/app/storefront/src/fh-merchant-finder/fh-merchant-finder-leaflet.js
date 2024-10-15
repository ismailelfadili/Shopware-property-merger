/* Notice: jQuery is necessary */

import Plugin from 'src/plugin-system/plugin.class';
import FormSerializeUtil from 'src/utility/form/form-serialize.util';
import DomAccess from 'src/helper/dom-access.helper';
import HttpClient from 'src/service/http-client.service';

import L from '../../../../leaflet/leaflet';

export default class FhMerchantFinder extends Plugin {

  static options = {};

  init() {
    this.locale       = document.querySelector('html').getAttribute('lang').substr(0, 2) || 'en';
    this.translations = {
      en : {
        distance    : 'Distance',
        gardenSauna : 'Garden and sauna exhibition',
        garden      : 'WEKA Garden exhibition',
        sauna       : 'WEKA Sauna exhibition',
        phone       : 'Phone',
        show        : 'Show on map',
      },
      de : {
        distance    : 'Entfernung',
        gardenSauna : 'Garten- und Saunaausstellung',
        garden      : 'WEKA Gartenausstellung',
        sauna       : 'WEKA Saunaausstellung',
        phone       : 'Telefon',
        show        : 'Auf Karte anzeigen',
      },
    };

    document.getElementById('embedMap').innerHTML = '';
    this._form                                    = this.el;
    this._client                                  = new HttpClient(window.accessKey, window.contextToken);
    this._resultWrapper                           = document.getElementById('resultWrapper');
    this._results                                 = document.getElementById('searchResults');
    this._resultinfo                              = document.getElementById('searchResultInfo');
    this._resultinfoLowLengthText                 = document.getElementById('searchResultInfoLowLengthText');
    this._resultinfoLowLengthNum                  = document.getElementById('searchResultInfoLowLengthNum');
    this._resultinfoEmpty                         = document.getElementById('searchResultInfoEmpty');
    this._preloader                               = document.getElementById('mapPreloader');
    this._map                                     = document.getElementById('embedMap');
    this._popupTemplate                           = document.getElementById('embedMap').innerHTML;
    this._popupElement                            = document.createElement('div');
    this._resultTemplate                          = this._results.innerHTML;

    this._buildMap();
    this._registerEvents();
  }

  /**
   *
   * @private
   */
  _refresh() {
    // Remove Search Results
    this._results.innerHTML = '';
  }

  /**
   *
   * @private
   */
  _registerEvents() {
    const that = this;
    this.el.addEventListener('submit', this._formSubmit.bind(this));
    $(document).on('click', '[data-item]', function () {
      that._focusItem($(this).data('item'));
    });
  }

  /**
   *
   * @param event
   * @private
   */
  _formSubmit(event) {
    const userval = this._form.zipcode.value;

    if (typeof event != 'undefined') {
      event.preventDefault();
    }

    if (userval === '') {

      event.preventDefault();
      console.log('Notice: Empty Zipcode');
      $(this._resultinfo).addClass('d-none');
      $(this._resultinfoEmpty).removeClass('d-none');
      $(this._resultinfoLowLengthText).addClass('d-none');
      $(this._resultinfoLowLengthNum).addClass('d-none');

    } else if (isNaN(userval) && userval.length <= 1) {

      event.preventDefault();
      console.log('Notice: Not a number with too less letters');
      $(this._resultinfo).addClass('d-none');
      $(this._resultinfoEmpty).addClass('d-none');
      $(this._resultinfoLowLengthText).removeClass('d-none');
      $(this._resultinfoLowLengthNum).addClass('d-none');

    } else if (!isNaN(userval) && userval.length <= 2) {

      event.preventDefault();
      console.log('Notice: This is a number with too less digits');
      $(this._resultinfo).addClass('d-none');
      $(this._resultinfoEmpty).addClass('d-none');
      $(this._resultinfoLowLengthText).addClass('d-none');
      $(this._resultinfoLowLengthNum).removeClass('d-none');

    } else {

      $(this._preloader).removeClass('d-none');
      const requestUrl = DomAccess.getAttribute(this._form, 'action').toLowerCase();
      const formData   = FormSerializeUtil.serialize(this._form);
      this._client.post(requestUrl, formData, this._onLoaded.bind(this));
    }
  }

  /**
   *
   * @param response
   * @private
   */
  _onLoaded(response) {
    response = JSON.parse(response);
    this._refresh();
    this._buildSearchResults(response);
    this._buildMapMarkers(response);
  }

  /**
   *
   * @param response
   * @private
   */
  _buildSearchResults(response) {
    const that = this;
    //const te = new Te();

    if (response.data.length > 0) {
      response.data.forEach(function (item) {
        //that._results.insertAdjacentHTML('beforeend', te.render(that._resultTemplate, item));

        item.distance_label     = that.translations[that.locale]['distance'];
        item.garden_sauna_label = that.translations[that.locale]['gardenSauna'];
        item.garden_label       = that.translations[that.locale]['garden'];
        item.sauna_label        = that.translations[that.locale]['sauna'];
        item.phone_label        = that.translations[that.locale]['phone'];
        item.show_label         = that.translations[that.locale]['show'];

        const pattern = /^((http|https|ftp):\/\/)/;

        if (item.merchantUrl != null && !pattern.test(item.merchantUrl)) {
          item.merchantUrl = 'https://' + item.merchantUrl;
        }
        if (item.shopUrl != null && !pattern.test(item.shopUrl)) {
          item.shopUrl = 'https://' + item.shopUrl;
        }

        if (item.mediaId == null) { item.mediaId = ''; }
        if (item.company == null) { item.company = ''; }
        if (item.merchantTypeId <= 13) { item.merchantTypeId = ''; }
        if (item.distance == null) { item.distance = '?'; }
        if (item.street == null) { item.street = ''; }
        if (item.zipcode == null) { item.zipcode = ''; }
        if (item.city == null) { item.city = ''; }
        if (item.phoneNumber == null) { item.phoneNumber = ''; } else { item.phoneNumber = item.phone_label + ' <a href="tel:' + item.phoneNumber + '">' + item.phoneNumber + '</a>'; }
        if (item.eMail == null) { item.eMail = ''; } else { item.eMail = 'E-Mail <a href="mailto:' + item.eMail + '">' + item.eMail + '</a>'; }
        if (item.merchantUrl == null) { item.merchantUrl = ''; } else { item.merchantUrl = 'Website <a href="' + item.merchantUrl + '" target="_blank">' + item.merchantUrl + '</a>'; }
        if (item.shopUrl == null) { item.shopUrl = ''; } else { item.shopUrl = 'Shop <a href="' + item.shopUrl + '" target="_blank">' + item.shopUrl + '</a>'; }
        if (item.description == null) { item.description = ''; }
        if (item.openingHours == null) { item.openingHours = ''; }

        if (item.merchantTypeId === 14) {
          item.merchantTypeId = '<div class="fh-merchant-finder-badge"><small>Premium</small></div><div class="fh-merchant-finder-badge-premium"><small>' + item.garden_sauna_label + '</small></div>';
        } else if (item.merchantTypeId === 15) {
          item.merchantTypeId = '<div class="fh-merchant-finder-badge"><small>Premium</small></div><div class="fh-merchant-finder-badge-premium"><small>' + item.garden_label + '</small></div>';
        } else if (item.merchantTypeId === 16) {
          item.merchantTypeId = '<div class="fh-merchant-finder-badge"><small>Premium</small></div><div class="fh-merchant-finder-badge-premium"><small>' + item.sauna_label + '</small></div>';
        }

        /* Check Browser width */
        let browserWidth = window.innerWidth;
        let anchorVar;

        if (browserWidth < 768) {
          anchorVar = "#show-map";
        } else {
          anchorVar = "javascript:";
        }

        that._results.innerHTML += '' +
          '<li id="' + item.id + '" class="fh-merchant-finder-result-item list-group-item p-3">\n' +
          '    <div class="row form-row g-0">\n' +
          '        <div class="col-12">\n' +
          '            <div class="row g-0">\n' +
          '                <div class="col-9 pb-2">\n' +
          '                    <div class="fh-merchant-finder-merchant-name">' + item.company + '</div>' + item.merchantTypeId + '\n' +
          '                </div>' +
          '                <div class="col-3">\n' +
          '                    <small class="fh-merchant-finder-distance">' + item.distance_label + ': ' + parseInt(item.distance) + '&nbsp;km</small>\n' +
          '                </div>\n' +
          '            </div>\n' +
          '            <div class="row g-0">\n' +
          '                <div class="col-12">\n' +
          '                    <p>' + item.street + '<br>' + item.zipcode + ' ' + item.city + ', ' + item.countryCode + '</p>' +
          '                    <p class="mb-0">' + item.phoneNumber + '</p>' +
          '                    <p class="mb-0">' + item.merchantUrl + '</p>' +
          '                    <p class="mb-0">' + item.shopUrl + '</p>' +
          '                    <p class="mb-0">' + item.description + '</p>' +
          '                    <p class="mb-0">' + item.openingHours + '</p>' +
          '                    <p class="mb-0">&nbsp;</p>' +
          '                </div>\n' +
          '            </div>\n' +
          '            <div class="fh-merchant-finder-view-link d-flex">\n' +
          '                <a class="merchant-finder-map-anchor btn btn-primary ms-auto" title="' + item.show_label + '" href="' + anchorVar + '" data-location-lat="' + item.locationLat + '" data-location-lon="' + item.locationLat + '" data-item="' + item.id + '"><i class="bi bi-zoom-in bi-xxs"></i>&nbsp;&nbsp;' + item.show_label + '</a>\n' +
          '            </div>\n' +
          '        </div>\n' +
          '    </div>\n' +
          '</li>\n';

      });
      $(this._resultinfo).addClass('d-none');
      $(this._resultinfoEmpty).addClass('d-none');
      $(this._resultinfoLowLengthText).addClass('d-none');
      $(this._resultinfoLowLengthNum).addClass('d-none');

      $(this._resultWrapper).removeClass('d-none');
      $(this._map).removeClass('d-none');
    } else {
      console.log('Notice: No results found');

      $(this._resultWrapper).addClass('d-none');
      $(this._map).addClass('d-none');

      $(this._resultinfo).removeClass('d-none');

      $(this._resultinfoEmpty).addClass('d-none');
      $(this._resultinfoLowLengthText).addClass('d-none');
      $(this._resultinfoLowLengthNum).addClass('d-none');
    }
  }

  /**
   *
   * @param response
   * @private
   */
  _buildMapMarkers(response) {
    $(this._preloader).addClass('d-none');

    const that          = this;
    const featureMarker = [];
    let minLon          = 10000,
        minLat          = 10000,
        maxLon          = 0,
        maxLat          = 0;

    // add features
    response.data.forEach(function (item) {
      if (item.locationLon != null) {

        let iconOptions     = {};
        const markerOptions = {data : item};

        if (item.markerSettings != null) {
          iconOptions = JSON.parse(item.markerSettings);
        }

        if (typeof item.markerShadowUrl != 'undefined') {
          iconOptions.shadowUrl = item.markerShadowUrl;
        }

        if (typeof item.markerUrl != 'undefined') {
          iconOptions.iconUrl = item.markerUrl;
          markerOptions.icon  = L.icon(iconOptions);
        }

        minLat = item.locationLat < minLat ? item.locationLat : minLat;
        maxLat = item.locationLat > maxLat ? item.locationLat : maxLat;
        minLon = item.locationLon < minLon ? item.locationLon : minLon;
        maxLon = item.locationLon > maxLon ? item.locationLon : maxLon;

        featureMarker.push(
          L.marker([item.locationLat, item.locationLon], markerOptions)
            /*
            .bindPopup(te.render(that._popupTemplate, item), {
                autoPan: false,
                autoClose: false,
            })
            */
            .bindPopup('' +
              '<div class="fh-merchant-finder-popup">\n' +
              '    <p class="mb-0 text-primary">' + item.company + '</p>\n' +
              '    <p class="mt-0">' + item.street + '<br>' + item.zipcode + ' ' + item.city + ', ' + item.countryCode + '</p>' +
              '    </p>\n' +
              '</div>\n')

            .on('click', function () {
              that._focusItem(item.id)
            })
            .on('popupclose', function () {
              if (that.ol.center) {
                that.ol.map.flyTo(that.ol.center, that.ol.zoom, {animate : true, duration : 1});
                that.ol.center = that.ol.zoom = null;
              }
            })
        );
      }
    });

    this.ol.markers.clearLayers();
    this.ol.markers = L.layerGroup(featureMarker).addTo(that.ol.map);

    if (response.data.length !== 0) {

      if (response.data.length === 1) {
        minLat = minLat - 0.02;
        maxLat = maxLat + 0.02;
        minLon = minLon - 0.02;
        maxLon = maxLon + 0.02;
      }

      // relocate bounding box
      this.ol.map.fitBounds([
        [minLat, minLon],
        [maxLat, maxLon],
      ])
    }
  }

  /**
   *
   * @param id
   * @private
   */
  _focusItem(id) {
    const that      = this;
    const myElement = document.getElementById(id);
    const topPos    = myElement.offsetTop;

    document.getElementById('searchResults').scrollTo({
      top      : topPos,
      behavior : 'smooth',
    });

    $('#searchResults li').removeClass('active');
    $('#' + id).addClass('active');

    this.ol.markers.eachLayer(function (layer) {

      if (layer.options.data.id === id) {
        const position = layer.getLatLng();
        if (!layer.getPopup().isOpen()) {
          layer.openPopup();
        }
        if (that.ol.center == null) {
          that.ol.center = that.ol.map.getCenter();
          that.ol.zoom   = that.ol.map.getZoom();
        }
        that.ol.map.flyTo(position, 16, {animate : true, duration : 1});
      }
    });
  }

  /**
   *
   * @private
   */
  _buildMap() {
    this.ol         = {};
    this.ol.markers = L.layerGroup([]);
    this.ol.map     = L.map('embedMap', {});
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom     : 18,
      attribution : '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
    }).addTo(this.ol.map);
  }
}
