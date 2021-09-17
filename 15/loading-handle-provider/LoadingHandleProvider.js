export const LoadingHandleProvider = Vue.defineComponent({
  data() {
    return {
      state: {
        loadingVisible: false,
      },
    };
  },
  provide() {
    const { state } = this;
    return {
      loadingHandleCtx: {
        get loadingVisible() {
          return state.loadingVisible;
        },
        showLoading() {
          state.loadingVisible = true;
        },
        hideLoading() {
          state.loadingVisible = false;
        },
      },
    };
  },
  template: `<slot/>`,
});
