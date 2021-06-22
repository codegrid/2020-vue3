import { CounterPanel } from './CounterPanel.js';

export const App = Vue.defineComponent({
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
