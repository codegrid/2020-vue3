const MySlotComponent = Vue.defineComponent({
  template: `
    <fieldset>
      <legend>MySlotComponent</legend>
      <slot/>
    </fieldset>
  `,
});
const App = {
  components: {
    MySlotComponent,
  },
  data() {
    return { text: '' };
  },
  template: `
    <input v-model="text"/>
    <MySlotComponent>
      {{text}}
    </MySlotComponent>
  `,
};
const app = Vue.createApp(App);
app.mount('#app');
