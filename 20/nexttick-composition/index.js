const App = Vue.defineComponent({
  setup() {
    const inputField = Vue.ref(null);
    const visible = Vue.ref(false);
    const toggleVisible = async () => {
      visible.value = !visible.value;
      await Vue.nextTick(); // ★ this.の記述を要さない nextTick API
      if (inputField.value) {
        inputField.value.focus();
      }
    };
    return {
      inputField,
      visible: Vue.readonly(visible),
      toggleVisible,
    };
  },
  template: `
    <button @click="toggleVisible">toggle</button>
    <input v-if="visible" ref="inputField"/>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
