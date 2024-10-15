const { Component } = Shopware;

Component.extend('fh-merchant-finder-create', 'fh-merchant-finder-detail', {
    methods: {
        getMerchant() {
            this.merchant = this.repository.create(Shopware.Context.api);
        },

        onClickSave() {
            this.isLoading = true;

            this.repository
                .save(this.merchant, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({ name: 'fh.merchant.finder.detail', params: { id: this.merchant.id } });
                }).catch((exception) => {
                this.isLoading = false;

                this.createNotificationError({
                    title: this.$t('fh-merchant-finder.detail.errorTitle'),
                    message: exception
                });
            });
        }
    }
});
