import { DialogHandleProvider } from './DialogHandleProvider.js';
import { AppHandleProvider } from './AppHandleProvider.js';
import { ImageResizer } from './ImageResizer.js';
import { ImageResizerTools } from './ImageResizerTools.js';
import { ImageResizerPreview } from './ImageResizerPreview.js';
import { ImageSelector } from './ImageSelector.js';

export const App = Vue.defineComponent({
  components: {
    DialogHandleProvider,
    AppHandleProvider,
    ImageResizer,
    ImageResizerTools,
    ImageResizerPreview,
    ImageSelector,
  },
  template: `
    <DialogHandleProvider v-slot="{dialogVisible}">
      <AppHandleProvider>
        <ImageResizer>
          <template v-slot:tools><ImageResizerTools/></template>
          <template v-slot:preview><ImageResizerPreview/></template>
        </ImageResizer>
        <ImageSelector v-if="dialogVisible"/>
      </AppHandleProvider>
    </DialogHandleProvider>
  `,
});
