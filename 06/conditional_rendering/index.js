const Todo = {
  data() {
    return {
      visibleMessage: true,
      bloodType: 'A',
    };
  },
  methods: {},
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#app');
