export const CounterPanel = Vue.defineComponent({
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
