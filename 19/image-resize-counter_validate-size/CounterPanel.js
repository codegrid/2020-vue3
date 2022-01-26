export const CounterPanel = Vue.defineComponent({
  emits: ['changeCount', 'countUp', 'countDown'],
  props: {
    initialCount: { type: Number, required: true },
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  setup(props, { emit }) {
    const count = Vue.computed({
      get: () => props.initialCount,
      set: newCount => {
        emit('changeCount', newCount);
      },
    });
    return {
      count,
      countUp: () => emit('countUp'),
      countDown: () => emit('countDown'),
    };
  },
  template: `
    <button @click="countDown">-</button>
    <input v-model.number.lazy="count" type="number" :min="min" :max="max"/>
    <button @click="countUp">+</button>
  `,
});
