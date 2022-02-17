const getRandomInt = max => {
  return Math.floor(Math.random() * max);
};

const fetchData = () => {
  const ms = getRandomInt(10) * 100 + 500;
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`データ取得時間: ${ms} ms`);
    }, ms);
  });
};

const AsyncGrandChild = Vue.defineComponent({
  async setup() {
    const data = await fetchData();
    return {
      data,
    };
  },
  template: `
    <div style="background:#aaccff;padding:20px">
      <h3>孫</h3>{{data}}
    </div>
  `,
});

const AsyncChild = Vue.defineComponent({
  components: {
    AsyncGrandChild,
  },
  async setup() {
    const data = await fetchData();
    return {
      data,
    };
  },
  template: `
    <div style="background:#55aacc;padding:20px">
      <h2>子</h2>{{data}}
      <AsyncGrandChild/>
    </div>
  `,
});

const App = Vue.defineComponent({
  components: {
    AsyncChild,
    DynamicComponent: Vue.defineAsyncComponent(async () => {
      const res = await import('./DynamicComponent.js');
      return res.DynamicComponent;
    }),
  },
  setup() {
    const childVisible = Vue.ref(false);
    const toggle = () => {
      childVisible.value = !childVisible.value;
    };
    const label = Vue.computed(() => (childVisible.value ? '破棄' : '描画'));

    const onResolve = () => {
      console.log('resolve');
    };
    const onPending = () => {
      console.log('pending');
    };
    const onFallback = () => {
      console.log('fallback');
    };
    return {
      childVisible: Vue.readonly(childVisible),
      toggle,
      label,
      onPending,
      onResolve,
      onFallback,
    };
  },
  template: `
    コンポーネントを<button @click="toggle">{{label}}</button>する
    <suspense v-if="childVisible"
      @pending="onPending"
      @resolve="onResolve"
      @fallback="onFallback"
    >
      <template #default>
        <div>
          <AsyncChild/>
          <DynamicComponent/>
        </div>
      </template>
      <template #fallback>
        <div>Loading...</div>
      </template>
    </suspense>
  `,
});

const app = Vue.createApp(App);
app.mount('#app');
