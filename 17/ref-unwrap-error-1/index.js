const App = Vue.defineComponent({
  setup() {
    // 状態データと算出プロパティをstateに束ねる
    const state = {
      visible: Vue.ref(true),
      position: Vue.ref({ x: 100, y: 150 }),
      size: Vue.ref({ width: 300, height: 400 }),
      areaSize: Vue.computed(() => state.size.value.width * state.size.value.height),
    };
    const toggleVisible = () => (state.visible.value = !state.visible.value);
    const moveRight = () => {
      state.position.value.x++;
    };

    // テンプレート公開前にstateをreactiveで再生成
    return { state: Vue.reactive(state), toggleVisible, moveRight };
  },
  template: `
    <button @click="toggleVisible">toggle visible</button>
    <button @click="moveRight">move right</button>
    <hr/>

    <!-- .valueの記述はない -->
    <span v-if="state.visible">
    position: {{state.position.x}} {{state.position.y}}
      </span>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
