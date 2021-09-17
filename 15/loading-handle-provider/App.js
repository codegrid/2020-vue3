import { LoadingScreen } from './LoadingScreen.js';
import { LoadingHandleProvider } from './LoadingHandleProvider.js';
import { MyAppComponent } from './MyAppComponent.js';

export const App = {
  components: {
    LoadingHandleProvider,
    LoadingScreen,
    MyAppComponent,
  },
  template: `
    <LoadingHandleProvider>
      <MyAppComponent/>
      <LoadingScreen/>
    </LoadingHandleProvider>
  `,
};
