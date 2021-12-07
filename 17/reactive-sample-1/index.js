const App = Vue.defineComponent({
  setup() {
    // オブジェクトからリアクティブデータを生成
    const count = Vue.reactive({ x: 100, y: 150 });

    // .valueプロパティは存在せず、通常のオブジェクトと同じ記述で参照と更新が可能
    const countUp = () => {
      count.x = count.x + 10;
      count.y = count.y + 10;
    };

    return { count, countUp };
  },
  template: `
    <button @click="countUp">+</button> {{count.x}} {{count.y}}
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
