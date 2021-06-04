import { makeApiMock } from '../api/index.js';
import { tasks2 } from '../api/data.js';

const api = makeApiMock(tasks2, 10);

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

      tasks: [],
    };
  },
  created() {
    this.fetchTasks();
  },
  watch: {
    titleFilter() {
      this.fetchTasks();
    },
    doneFilter() {
      this.fetchTasks();
    },
  },
  methods: {
    isEditingTask(task) {
      return this.editingTaskFieldsVisible && this.editingTask.id === task.id;
    },
    getEditBtnId(taskId) {
      return `taskEditBtn${taskId}`;
    },
    fetchTasks() {
      const { titleFilter, doneFilter } = this;
      return api.fetchTasks({ titleFilter, doneFilter }).then(res => {
        this.tasks = res.tasks;
      });
    },
    changeDone(task) {
      const { id, title, done } = task;
      api.putTask({ id, title, done }).then(() => this.fetchTasks());
    },
    addTask() {
      if (this.newTaskTitle === '') return;
      api
        .postTask({ title: this.newTaskTitle })
        .then(() => this.fetchTasks())
        .then(() => this.resetNewTaskFields());
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
      const editBtnId = this.getEditBtnId(this.editingTask.id);
      this.$nextTick(() => {
        const el = this.$refs[editBtnId];
        if (el) {
          el.focus();
        }
      });
    },
    editTask() {
      const { id, done } = this.editingTask;
      api
        .putTask({ id, title: this.editingTaskTitle, done })
        .then(() => this.fetchTasks())
        .then(() => this.hideEditingTaskFields());
    },
    deleteTask(taskId) {
      api.deleteTask({ id: taskId }).then(() => this.fetchTasks());
    },
    initializeTasks() {
      api.initializeTasks();
      window.location.reload();
    },
  },
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#todoApp');
