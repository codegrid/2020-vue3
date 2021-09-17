import { DialogHandleProvider } from './DialogHandleProvider.js';
import { AppContents } from './AppContents.js';

export const App = Vue.defineComponent({
  components: {
    DialogHandleProvider,
    AppContents,
  },
  template: `
    <DialogHandleProvider>
      <AppContents/>
    </DialogHandleProvider>
  `,
});
