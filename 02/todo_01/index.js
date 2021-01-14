const Todo = {
  data() {
    return {
      tasks: [
        { id: 1, title: '野菜を買う' },
        { id: 2, title: '魚を買う' },
        { id: 3, title: 'JavaScriptの勉強をする' },
        { id: 4, title: '原稿を書く' },
      ],
    };
  },
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#todoApp');
