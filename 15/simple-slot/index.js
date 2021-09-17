const MySlotComponent = Vue.defineComponent({
  template: `
    <h3>Child</h3>
    <div>
      <slot/>
    </div>
  `,
});

const App = {
  components: {
    MySlotComponent,
  },
  template: `
    <h2>Parent</h2>
    <MySlotComponent>

      <div>差し込みたいコンテンツA</div>
      <div>差し込みたいコンテンツB</div>

    </MySlotComponent>
  `,
};
const app = Vue.createApp(App);
app.mount('#app');
