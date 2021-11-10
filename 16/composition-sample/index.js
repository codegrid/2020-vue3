const SampleComponent = Vue.defineComponent({
  components: {},
  props: {
    cccProp: { type: String },
  },
  emits: ['dddEvent'],

  // ↓↓↓ --- 変更箇所 --- ↓↓↓
  setup(props, context) {
    Vue.provide('aaaCtx', { aaaProp: 'AAA' }); // ★1 provide
    const bbbCtx = Vue.inject('bbbCtx'); // ★2 inject
    const eeeData = Vue.ref('EEE'); // ★3 data
    const fffComp = Vue.computed(() => eeeData.value.replace(/E/g, 'F')); // ★4 computed
    Vue.watch(eeeData, () => {}); // ★5 watch
    Vue.onMounted(() => {}); // ★6 mounted

    const gggFunc = () => {
      // ☆2
      const b = bbbCtx.bbbProp;
      const c = props.cccProp;
      const e = eeeData.value; // EEE
      const f = fffComp.value; // FFF
      context.emit('dddEvent', { b, c, e, f });
    };

    return {
      bbbCtx,
      eeeData,
      fffComp,
      gggFunc,
    };
  },
  // ↑↑↑ --- 変更箇所 --- ↑↑↑

  template: `
    {{ bbbCtx.bbbProp }}
    {{ cccProp }}
    {{ eeeData }}
    {{ fffComp }}
    <button @click="gggFunc">gggFunc</button>
  `,
});

const App = {
  components: {
    SampleComponent,
  },
  provide() {
    return {
      bbbCtx: {
        bbbProp: 'BBB',
      },
    };
  },
  data() {
    return {
      dddEventParams: null,
    };
  },
  methods: {
    dddEvent(params) {
      this.dddEventParams = params;
      console.log(params);
    },
  },
  template: `
    <SampleComponent
      :ccc-prop="'CCC'"
      @ddd-event="dddEvent"
    />
    <hr/>
    dddEventParams: {{dddEventParams}}
  `,
};
const app = Vue.createApp(App);
app.mount('#app');
