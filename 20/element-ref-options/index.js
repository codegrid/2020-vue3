const App = Vue.defineComponent({
  methods: {
    focusInputField() {
      this.$refs.inputField.focus(); // ★ this.の参照が必要
    },
  },
  template: `
  <input ref="inputField"/>
  <button @click="focusInputField">focus</button>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
