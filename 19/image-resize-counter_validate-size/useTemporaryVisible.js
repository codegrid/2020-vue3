export const useTemporaryVisible = visibleMs => {
  const visible = Vue.ref(false);
  Vue.watch(visible, value => {
    if (value) {
      setTimeout(() => (visible.value = false), visibleMs);
    }
  });
  const show = () => {
    visible.value = true;
  };
  return {
    visible: Vue.readonly(visible),
    show,
  };
};
