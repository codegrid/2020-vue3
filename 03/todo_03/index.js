/**
 * デモ用：データ取得・保存処理
 */
const tasks = [
  { id: 1, title: '野菜を買う' },
  { id: 2, title: '魚を買う' },
  { id: 3, title: 'JavaScriptの勉強をする' },
  { id: 4, title: '原稿を書く' },
];
sessionStorage.setItem('tasks', JSON.stringify(tasks));

const fetchUserData = _params => {
  return new Promise(resolve => {
    const tasks = JSON.parse(sessionStorage.getItem('tasks'));
    resolve({
      tasks,
    });
  });
};

const saveUserData = params => {
  sessionStorage.setItem('tasks', JSON.stringify(params.tasks));
  return Promise.resolve();
};

/**
 * デモ用：データの再取得機能
 */
const userId = 42;
document.querySelector('.fetchBtn').addEventListener('click', () => {
  fetchUserData(userId).then(data => {
    todoVm.$data.tasks = data.tasks;
  });
});

/**
 * Vue.jsアプリ
 */
const Todo = {
  data() {
    return {
      tasks: [],
    };
  },
  methods: {
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
  },
};
const todoApp = Vue.createApp(Todo);
const todoVm = todoApp.mount('#todoApp');

/**
 * 既存アプリ
 */
fetchUserData(userId).then(data => {
  // ...既存アプリの処理

  todoVm.tasks = data.tasks;
});

document.querySelector('.saveBtn').addEventListener('click', () => {
  const data = {
    /* 既存アプリ用のデータ設定 */
  };

  data.tasks = todoVm.$data.tasks.map(task => {
    return Vue.toRaw(task);
  });
  saveUserData(data).then(() => {
    alert('保存しました');
  });
});
