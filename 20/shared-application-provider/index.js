const FooComponent = Vue.defineComponent({
  setup() {
    const { accessToken, userId } = Vue.inject('appSettings');
    // fetch('...', {
    //   method: 'GET',
    //   headers: {
    //     Authorization: accessToken,
    //     'Content-Type': 'application/json',
    //   },
    // }).then(...);
    console.log('accessToken', accessToken);
    return {
      userId,
    };
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
  app.provide('appSettings', {
    accessToken,
    userId,
  });
  app.mount('#app');
};
runVueApp('アクセストークン', 'ユーザーID');
