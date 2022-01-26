import { CounterPanel } from './CounterPanel.js';
import { useSizeCounter } from './useSizeCounter.js';
import { useTemporaryVisible } from './useTemporaryVisible.js';

const counterOptions = { min: 50, max: 1000, step: 50 };
export const App = Vue.defineComponent({
  components: {
    CounterPanel,
  },
  setup() {
    const { visible: alertVisible, show: showAlert } = useTemporaryVisible(1500);
    const {
      width,
      upWidth,
      downWidth,
      setWidth,
      height,
      upHeight,
      downHeight,
      setHeight,
      initializeSize,
    } = useSizeCounter({
      initialSize: { width: 200, height: 150 },
      counterOptions,
      onInvalidSize: showAlert,
    });

    return {
      alertVisible,
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
    <p v-if="alertVisible" class="alertMessage">幅が高さ以上のサイズになるよう設定してください。</p>
    <hr/>
    <p>{{width}} x {{height}}</p>
    <img src="./room.jpeg" :width="width" :height="height"/>
  `,
});
