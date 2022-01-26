import { CounterPanel } from './CounterPanel.js';
import { useCounter } from './useCounter.js';

const counterOptions = { min: 50, max: 1000, step: 50 };
export const App = Vue.defineComponent({
  components: {
    CounterPanel,
  },
  setup() {
    const {
      count: width,
      set: setWidth,
      up: upWidth,
      down: downWidth,
      initialize: initializeWidth,
    } = useCounter(200, counterOptions);

    const {
      count: height,
      set: setHeight,
      up: upHeight,
      down: downHeight,
      initialize: initializeHeight,
    } = useCounter(150, counterOptions);

    const initializeSize = () => {
      initializeWidth();
      initializeHeight();
    };

    return {
      min: counterOptions.min,
      max: counterOptions.max,
      width,
      upWidth,
      downWidth,
      setWidth,
      height,
      upHeight,
      downHeight,
      setHeight,
      initializeSize,
    };
  },
  template: `
    <div>
      w:
      <CounterPanel
        :initial-count="width"
        :min="min"
        :max="max"
        @change-count="setWidth"
        @count-up="upWidth"
        @count-down="downWidth"
      />
    </div>

    <div>
      h:
      <CounterPanel
        :initial-count="height"
        :min="min"
        :max="max"
        @change-count="setHeight"
        @count-up="upHeight"
        @count-down="downHeight"
      />
    </div>
    <div>
      <button @click="initializeSize">clear</button>
    </div>
    <hr/>
    <p>{{width}} x {{height}}</p>
    <img src="./room.jpeg" :width="width" :height="height"/>
  `,
});
