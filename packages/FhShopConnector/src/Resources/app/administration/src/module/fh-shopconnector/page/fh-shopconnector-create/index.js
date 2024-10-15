const { Component } = Shopware;

Component.extend('fh-shopconnector-create', 'fh-shopconnector-detail', {
    methods: {
        getItem() {
            this.item = this.repository.create(Shopware.Context.api);
        },

        onClickSave() {
            this.isLoading = true;

            this.repository
                .save(this.item, Shopware.Context.api)
                .then(() => {
                    this.isLoading = false;
                    this.$router.push({ name: 'fh.shopconnector.detail', params: { id: this.item.id } });
                }).catch((exception) => {
                this.isLoading = false;

                this.createNotificationError({
                    title: this.$t('fh-shopconnector.detail.errorTitle'),
                    message: exception
                });
            });
        }
    }
});
