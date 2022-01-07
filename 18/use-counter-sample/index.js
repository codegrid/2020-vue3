const App = Vue.defineComponent({
  setup() {
    const { count: x, inc: moveRight } = VueUse.useCounter(200, { max: 800 });
    const { count: y, inc: moveDown } = VueUse.useCounter(100, { max: 600 });
    return {
      positionLabel: Vue.computed(() => `(${x.value}px, ${y.value})px`),
      moveRight: () => moveRight(10),
      moveDown: () => moveDown(10),
    };
  },
  template: `
    <button @click="moveRight">move right</button>
    <button @click="moveDown">move down</button>
    <hr/>
    {{positionLabel}}
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
