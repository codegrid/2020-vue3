import { Counter } from './Counter.js';

export const CounterPanel = Vue.defineComponent({
  props: {
    counter: {
      type: Counter,
      required: true,
    },
  },
  data() {
    return {
      countTmp: 0, // v-model用のデータ、とりあえず適当な値をセット
    };
  },
  emits: ['changeCount'],
  watch: {
    // propsのcounterをウォッチする
    counter: {
      handler(counter) {
        // コンポーネントの初期化時、counterデータが親側で変更された時に実行される
        this.countTmp = counter.count;

        // computedと違い、副作用が必要な場合は記述可能
      },
      deep: true, // オブジェクトの持つプロパティ値が変化した時も実行
      immediate: true, // 初期化時も実行
    },
    // v-modelからの入力があった場合に実行される
    countTmp(newCount) {
      this.$emit('changeCount', newCount);

      // computedと違い、副作用が必要な場合は記述可能
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
    <input v-model.number.lazy="countTmp" type="number" :min="counter.min" :max="counter.max"/>
    <button @click="countUp">+</button>
  `,
});
