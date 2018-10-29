declare var $: any;

export const BaseConfig = {
    isLoading: false,
    loadingCount: 0,

    loadingShow: function () {
        this.loadingCount++;
        this.isLoading = true;
        $('#divLoading').show();
    },

    loadingClose: function () {
        this.loadingCount--;
        if (this.loadingCount !== 0) {
            return;
        }
        this.isLoading = false;
        $('#divLoading').hide();
    }
};
