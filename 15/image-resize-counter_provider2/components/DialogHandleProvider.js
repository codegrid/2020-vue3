export const DialogHandleProvider = Vue.defineComponent({
  data() {
    return {
      state: {
        dialogVisible: false,
      },
    };
  },
  provide() {
    const { state } = this;
    return {
      dialogHandleCtx: {
        get dialogVisible() {
          return state.dialogVisible;
        },
        showDialog() {
          state.dialogVisible = true;
        },
        hideDialog() {
          state.dialogVisible = false;
        },
      },
    };
  },
  template: `<slot :dialog-visible="state.dialogVisible"/>`,
});
