const App = Vue.defineComponent({
  setup() {
    // ヘッダー関連のデータと処理を束ねる
    const headerCtx = {
      menuLabel: Vue.ref('settings'),
      menuVisible: Vue.ref(true),
      toggleMenu: () => {},
    };
    // 右パネル関連のデータと処理を束ねる
    const rightPanelCtx = {
      panelVisible: Vue.ref(true),
      togglePanel: () => {},
    };
    return { headerCtx, rightPanelCtx };
  },
  template: `
    <header>
      <div v-if="headerCtx.menuVisible">
        <div>{{headerCtx.menuLabel}}</div>
      </div>
    </header>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
