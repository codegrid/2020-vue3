const FooComponent = Vue.defineComponent({
  created() {
    // fetch('...', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: this.accessToken, // this.を通じ参照できる
    //     'Content-Type': 'application/json',
    //   },
    // }).then(...);
    console.log('this.accessToken', this.accessToken);
  },
  template: `
    {{userId}} <!-- テンプレート内からは直接参照できる -->
    ...
  `,
});

const App = Vue.defineComponent({
  components: {
    FooComponent,
  },
  template: `<FooComponent/>`,
});

const runVueApp = (accessToken, userId) => {
  const app = Vue.createApp(App);
  app.config.globalProperties.accessToken = accessToken; // アクセストークン
  app.config.globalProperties.userId = userId; // ユーザーID
  app.mount('#app');
};
runVueApp('アクセストークン', 'ユーザーID');
