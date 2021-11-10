const SampleComponent = Vue.defineComponent({
  components: {},
  provide() {
    // ★1
    return {
      aaaCtx: { aaaProp: 'AAA' },
    };
  },
  inject: [
    // ★2
    'bbbCtx',
  ],
  props: {
    cccProp: { type: String },
  },
  emits: ['dddEvent'],
  data() {
    // ★3
    return {
      eeeData: 'EEE',
    };
  },
  computed: {
    // ★4
    fffComp() {
      return this.eeeData.replace(/E/g, 'F'); // FFF
    },
  },
  watch: {
    // ★5
    eeeData() {},
  },
  created() {}, // ☆1
  mounted() {}, // ★6

  methods: {
    // ☆2
    gggFunc() {
      const b = this.bbbCtx.bbbProp;
      const c = this.cccProp;
      const e = this.eeeData; // EEE
      const f = this.fffComp; // FFF
      this.$emit('dddEvent', { b, c, e, f });
    },
  },
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
