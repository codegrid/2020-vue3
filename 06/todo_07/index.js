const DONE_FILTER = {
  DONE: true,
  UNDONE: false,
  ALL: null,
};

const makeTask = (title, tasks) => {
  const ids = tasks.map(task => task.id);
  const id = Math.max(...ids) + 1;
  return {
    id,
    title,
    done: false,
  };
};

const Todo = {
  data() {
    return {
      DONE_FILTER: Vue.readonly(DONE_FILTER),
      titleFilter: '',
      doneFilter: DONE_FILTER.UNDONE,
      newTaskFieldsVisible: false,
      newTaskTitle: '',
      tasks: [
        { id: 1, title: '野菜を買う', done: false },
        { id: 2, title: '魚を買う', done: false },
        { id: 3, title: 'JavaScriptの勉強をする', done: false },
        { id: 4, title: '原稿を書く', done: false },
      ],
    };
  },
  computed: {
    filteredTasks() {
      if (this.titleFilter === '' && this.doneFilter === DONE_FILTER.ALL) {
        return this.tasks;
      }
      return this.tasks.filter(task => {
        const titleMatched = this.titleFilterExp.test(task.title);
        const doneMatched = this.doneFilter === DONE_FILTER.ALL || this.doneFilter === task.done;
        return titleMatched && doneMatched;
      });
    },
    titleFilterExp() {
      return new RegExp(this.titleFilter);
    },
  },
  methods: {
    showNewTaskFields() {
      this.newTaskFieldsVisible = true;
    },
    resetNewTaskFields() {
      this.newTaskTitle = '';
      this.newTaskFieldsVisible = false;
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
  },
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#todoApp');
