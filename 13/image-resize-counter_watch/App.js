import { CounterPanel } from './CounterPanel.js';
import { Counter } from './Counter.js';

export const App = Vue.defineComponent({
  components: {
    CounterPanel,
  },
  data() {
    const options = {
      min: 50,
      max: 1000,
      step: 50,
    };
    return {
      widthCounter: new Counter(200, options),
      heightCounter: new Counter(150, options),
    };
  },
  methods: {
    changeWidth(width) {
      this.widthCounter.count = width;
    },
    changeHeight(height) {
      this.heightCounter.count = height;
    },
    clearCount() {
      this.widthCounter.count = this.widthCounter.initialCount;
      this.heightCounter.count = this.heightCounter.initialCount;
    },
  },
  template: `
    <div>
    w: <CounterPanel
      :counter="widthCounter"
      @change-count="changeWidth"
    />
    </div>

    <div>
    h: <CounterPanel
      :counter="heightCounter"
      @change-count="changeHeight"
    />
    </div>
    <div>
      <button @click="clearCount">clear</button>
    </div>
    <hr/>
    <img src="./room.jpeg" :width="widthCounter.count" :height="heightCounter.count"/>
  `,
});
