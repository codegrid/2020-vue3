import { useVisible } from './useVisible.js';

const App = Vue.defineComponent({
  setup() {
    const { visible: menuVisible, toggle: toggleMenu } = useVisible(false);
    const menuLabel = Vue.computed(() => (menuVisible.value ? 'close' : 'open'));
    return {
      menuVisible,
      menuLabel,
      toggleMenu,
    };
  },
  template: `
    <button @click="toggleMenu">{{menuLabel}}</button>
    <ul v-if="menuVisible">
      <li>menu 1</li>
      <li>menu 2</li>
      <li>menu 3</li>
      <li>menu 4</li>
    </ul>
  `,
});
const app = Vue.createApp(App);
app.mount('#app');
