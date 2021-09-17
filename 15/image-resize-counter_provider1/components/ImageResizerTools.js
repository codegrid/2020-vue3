import { CounterPanel } from './CounterPanel.js';

export const ImageResizerTools = Vue.defineComponent({
  components: {
    CounterPanel,
  },
  inject: ['imageResizerToolsCtx'],
  computed: {
    ctx() {
      return this.imageResizerToolsCtx;
    },
  },
  methods: {
    changeWidth(width) {
      this.ctx.updateWidth(width);
    },
    changeHeight(height) {
      this.ctx.updateHeight(height);
    },
    clearCount() {
      this.ctx.initializeSize();
    },
  },
  template: `
    <div class="imageResizerTools">
      <div>
        w: <CounterPanel
          :counter="ctx.widthCounter"
          @change-count="changeWidth"
        />
      </div>
      <div>
        h: <CounterPanel
          :counter="ctx.heightCounter"
          @change-count="changeHeight"
        />
      </div>
      <div>
        <button @click="clearCount">clear</button>
      </div>
    </div>
  `,
});
