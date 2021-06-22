const AppRoot = {
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    countDown() {
      if (this.count > 0) {
        this.count--;
      }
    },
    countUp() {
      this.count++;
    },
    clearCount() {
      this.count = 0;
    },
  },
};
const app = Vue.createApp(AppRoot);
app.mount('#app');
