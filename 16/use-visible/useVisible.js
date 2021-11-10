export const useVisible = (initialVisible = true) => {
  const visible = Vue.ref(initialVisible);
  const show = () => (visible.value = true);
  const hide = () => (visible.value = false);
  const toggle = () => (visible.value = !visible.value);
  return {
    visible: Vue.readonly(visible),
    show,
    hide,
    toggle,
  };
};
