import { ImageResizerTools } from './ImageResizerTools.js';
import { ImageResizerPreview } from './ImageResizerPreview.js';

export const ImageResizer = Vue.defineComponent({
  components: {
    ImageResizerTools,
    ImageResizerPreview,
  },
  template: `
    <div>
      <ImageResizerTools/>
      <hr/>
      <ImageResizerPreview/>
    </div>
  `,
});
