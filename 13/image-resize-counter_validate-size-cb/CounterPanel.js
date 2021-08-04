import { Counter } from './Counter.js';

export const CounterPanel = Vue.defineComponent({
  props: {
    counter: {
      type: Counter,
      required: true,
    },
    cb: {
      type: Function,
      required: true,
    },
  },
  emits: ['changeCount'],
  methods: {
    countDown() {
      if (this.cb(this.counter.stepDownValue)) {
        this.counter.count = this.counter.stepDownValue;
      }
    },
    countUp() {
      if (this.cb(this.counter.stepUpValue)) {
        this.counter.count = this.counter.stepUpValue;
      }
    },
  },
  template: `
    <button @click="countDown">-</button>
    <input v-model.number.lazy="counter.count" type="number" :min="counter.min" :max="counter.max"/>
    <button @click="countUp">+</button>
  `,
});
