/**
 * 子コンポーネント
 */
const CounterPanel = Vue.defineComponent({
  props: {
    count: {
      type: Number,
      required: true,
    },
  },
  emits: ['changeCount'],
  methods: {
    countDown() {
      if (this.count > 0) {
        this.$emit('changeCount', this.count - 1);
      }
    },
    countUp() {
      this.$emit('changeCount', this.count + 1);
    },
  },
  template: `
    <button @click="countDown">-</button>
    {{count}}
    <button @click="countUp">+</button>
  `,
});

/**
 * 親コンポーネント
 */
const App = Vue.defineComponent({
  components: {
    CounterPanel,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    changeCount(count) {
      this.count = count;
    },
    clearCount() {
      this.count = 0;
    },
  },
  template: `
      <CounterPanel
        :count="count"
        @change-count="changeCount"
      />
      <hr/>
      <div>
        <button @click="clearCount">clear</button>
      </div>
  `,
});

/**
 * アプリインスタンスの生成とマウント
 */
const app = Vue.createApp(App);
app.mount('#app');
