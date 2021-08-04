import { Counter } from './Counter.js';

export const CounterPanel = Vue.defineComponent({
  props: {
    counter: {
      type: Counter,
      required: true,
    },
  },
  emits: ['changeCount'],
  computed: {
    count: {
      get() {
        return this.counter.count;
      },
      set(newCount) {
        this.$emit('changeCount', newCount);
      },
    },
  },
  methods: {
    countDown() {
      this.$emit('changeCount', this.counter.stepDownValue);
    },
    countUp() {
      this.$emit('changeCount', this.counter.stepUpValue);
    },
  },
  template: `
    <button @click="countDown">-</button>
    <input v-model.number.lazy="count" type="number" :min="counter.min" :max="counter.max"/>
    <button @click="countUp">+</button>
  `,
});
