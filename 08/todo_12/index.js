const makeNewTask = (title, tasks) => {
  const ids = tasks.map(task => task.id);
  const id = Math.max(...ids) + 1;
  return {
    id,
    title,
    done: false,
  };
};

const DONE_FILTER = {
  DONE: true,
  UNDONE: false,
  ALL: null,
};
const Todo = {
  data() {
    return {
      DONE_FILTER: Vue.readonly(DONE_FILTER),
      titleFilter: '',
      doneFilter: DONE_FILTER.UNDONE,

      newTaskFieldsVisible: false,
      newTaskTitle: '',

      editingTaskFieldsVisible: false,
      editingTaskTitle: '',
      editingTask: '',

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
        const doneMatched = [DONE_FILTER.ALL, task.done].some(v => v === this.doneFilter);
        return titleMatched && doneMatched;
      });
    },
    titleFilterExp() {
      return new RegExp(this.titleFilter);
    },
  },
  methods: {
    isEditingTask(task) {
      return this.editingTaskFieldsVisible && this.editingTask.id === task.id;
    },
    addTask() {
      if (this.newTaskTitle === '') return;
      const newTask = makeNewTask(this.newTaskTitle, this.tasks);
      this.tasks = [...this.tasks, newTask];
      this.resetNewTaskFields();
    },
    showNewTaskFields() {
      this.newTaskFieldsVisible = true;
      this.$nextTick(() => {
        this.$refs.newTaskTitle.focus();
      });
    },
    resetNewTaskFields(event) {
      this.newTaskTitle = '';
      this.newTaskFieldsVisible = false;
      this.$nextTick(() => {
        this.$refs.taskAddBtn.focus();
      });
    },
    showEditingTaskFields(task) {
      this.editingTask = task;
      this.editingTaskTitle = task.title;
      this.editingTaskFieldsVisible = true;

      this.$nextTick(() => {
        this.$refs.editingTaskTitle.select();
      });
    },
    hideEditingTaskFields() {
      this.editingTaskFieldsVisible = false;
      this.$nextTick(() => {
        this.$refs.editBtn.focus();
      });
    },
    editTask() {
      this.editingTask.title = this.editingTaskTitle;
      this.hideEditingTaskFields();
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
    },
  },
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#todoApp');
