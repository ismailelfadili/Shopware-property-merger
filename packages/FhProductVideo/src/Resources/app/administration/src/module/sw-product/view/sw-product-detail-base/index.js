import template from './sw-product-detail-base.html.twig';

const { Context, Utils } = Shopware;
const { isEmpty } = Utils.types;

Shopware.Component.override('sw-product-detail-base', {
  template,

  methods: {
    addMedia(media) {
      if (this.isExistingMedia(media)) {
        return Promise.reject(media);
      }

      const newMedia = this.productMediaRepository.create(Context.api);
      newMedia.mediaId = media.id;
      newMedia.media = {
        url: media.url,
        id: media.id
      };

      if (media.customFields) {
        newMedia.customFields = media.customFields;
      }

      if (isEmpty(this.product.media)) {
        let isVideo = false;
        let isEmbeddedVideo = false;

        if (media.mimeType.split('/')[0] === 'video') {
          isVideo = true;
        };

        if (newMedia.customFields &&
          newMedia.customFields.pv_is_embedded_video) {
          isEmbeddedVideo = true;
        }

        if (!isVideo && !isEmbeddedVideo) {
          this.setMediaAsCover(newMedia);
        }
      }

      this.product.media.add(newMedia);

      return Promise.resolve();
    },

    mediaRemoveInheritanceFunction(newValue) {
      newValue.forEach(({ id, mediaId, position, customFields }) => {
          const media = this.productMediaRepository.create(Context.api);
          Object.assign(media, { mediaId, position, productId: this.product.id,
            customFields });
          if (this.parentProduct.coverId === id) {
              this.product.coverId = media.id;
          }

          this.product.media.push(media);
      });

      this.$refs.productMediaInheritance.forceInheritanceRemove = true;

      return this.product.media;
    }
  }
});
