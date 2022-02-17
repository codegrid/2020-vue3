const App = Vue.defineComponent({
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    async toggleVisible() {
      this.visible = !this.visible;
      await this.$nextTick(); // ★ 描画完了の待機、this.の参照が必要
      if (this.$refs.inputField) {
        this.$refs.inputField.focus();
      }
    },
  },
  template: `
    <button @click="toggleVisible">toggle</button>
    <input v-if="visible" ref="inputField"/>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
