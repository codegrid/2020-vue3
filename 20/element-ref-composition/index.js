const App = Vue.defineComponent({
  setup() {
    const inputField = Vue.ref(null); // ★1
    const focusInputField = () => {
      inputField.value.focus(); // ★2 DOM要素の参照
    };
    return {
      inputField,
      focusInputField, // ★1
    };
  },
  template: `
    <input ref="inputField"/> <!-- ★1 -->
    <button @click="focusInputField">focus</button>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
