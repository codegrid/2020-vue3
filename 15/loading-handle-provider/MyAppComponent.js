const fetchListAsync = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(['item1', 'item2', 'item3', 'item4', 'item5']);
    }, 1000);
  });
};

export const MyAppComponent = Vue.defineComponent({
  inject: ['loadingHandleCtx'],
  data() {
    return { list: [] };
  },
  methods: {
    async fetchList() {
      this.loadingHandleCtx.showLoading();
      this.list = await fetchListAsync();
      this.loadingHandleCtx.hideLoading();
    },
  },
  template: `
    <button @click="fetchList">GET LIST</button>
    <ul>
      <li v-for="item in list">{{item}}</li>
    </ul>
  `,
});
