const Counter = Vue.defineComponent({
  props: {
    count: { type: Number, required: true },
  },
  setup(props) {
    // propsが保持する各プロパティをrefに変換した後、countを取得
    const { count } = Vue.toRefs(props);

    // countがrefに変換されたため、.valueを参照できる
    const double = Vue.computed(() => count.value * 2);

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
