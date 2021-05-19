import { makeApiMock } from '../api/index.js';
import { tasks } from '../api/data.js';

const api = makeApiMock(tasks);

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
  created() {
    api.fetchTasks().then(response => {
      this.tasks = response.tasks;
    });
  },
  methods: {
    isEditingTask(task) {
      return this.editingTaskFieldsVisible && this.editingTask.id === task.id;
    },
    getEditBtnId(taskId) {
      return `taskEditBtn${taskId}`;
    },
    addTask() {
      if (this.newTaskTitle === '') return;

      api.postTask({ title: this.newTaskTitle }).then(res => {
        this.tasks = [...this.tasks, res.task];
        this.resetNewTaskFields();
      });
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
        this.$refs[editBtnId].focus();
      });
    },
    editTask() {
      this.editingTask.title = this.editingTaskTitle;
      this.hideEditingTaskFields();

      const { id, title, done } = this.editingTask;
      api.putTask({ id, title, done });
    },
    changeDone(task) {
      const { id, title, done } = task;
      api.putTask({ id, title, done });
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);

      api.deleteTask({ id: taskId });
    },
    initializeTasks() {
      api.initializeTasks();
      window.location.reload();
    },
  },
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#todoApp');
