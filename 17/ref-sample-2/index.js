const App = Vue.defineComponent({
  setup() {
    const count = Vue.ref({ x: 100, y: 150 });

    // .valueの値は変えず、オブジェクトのプロパティの値のみを変更している
    const countUp = () => {
      count.value.x = count.value.x + 10;
      count.value.y = count.value.y + 10;
    };

    return { count, countUp };
  },
  template: `
    <button @click="countUp">+</button> {{count.x}} {{count.y}}
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
