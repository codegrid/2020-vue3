const App = Vue.defineComponent({
  setup() {
    const visible = Vue.ref(false);
    const open = () => (visible.value = true);
    const close = () => (visible.value = false);
    return {
      visible: Vue.readonly(visible),
      open,
      close,
    };
  },
  template: `
    <div class="appWrapper">
      <button @click="open">開く</button>
      <ul>
        <li>position:relative;</li>
      </ul>
      <Teleport to="body">
        <div class="modalDialog" v-if="visible">
          モーダルダイアログの中身
          <div>
            <button @click="close">閉じる</button>
          </div>
          <ul>
            <li>position:absolute;</li>
            <li>top:0;</li>
            <li>left:0;</li>
          </ul>
        </div>
      </Teleport>
    </div>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
