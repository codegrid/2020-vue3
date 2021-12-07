const Counter = Vue.defineComponent({
  props: {
    count: { type: Number, required: true },
  },
  setup(props) {
    // プリミティブな値となり、リアクティブ性を失う
    const { count } = props;

    // countの変更に反応して再計算されない
    const double = Vue.computed(() => count * 2);

    return { double };
  },
  template: `
    {{count}} * 2 = {{double}}
  `,
});
const App = Vue.defineComponent({
  components: {
    Counter,
  },
  setup() {
    const count = Vue.ref(10);
    const countUp = () => (count.value = count.value + 10);
    return { count, countUp };
  },
  template: `
    <button @click="countUp">+</button> <Counter :count="count"/>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
