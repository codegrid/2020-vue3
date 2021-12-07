const App = Vue.defineComponent({
  setup() {
    // リアクティブデータの生成
    const count = Vue.ref(0);

    // .valueを通し値の参照と更新を行う
    const countUp = () => (count.value = count.value + 10);

    // テンプレートへ公開
    return { count, countUp };
  },
  template: `
    <button @click="countUp">+</button> {{count}}
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
