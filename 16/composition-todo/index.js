const makeNewTask = (title, tasks) => {
  const ids = tasks.map(task => task.id);
  const id = Math.max(...ids) + 1;
  return {
    id,
    title,
    done: false,
  };
};

const DONE_FILTER_RAW = {
  DONE: true,
  UNDONE: false,
  ALL: null,
};

const useTaskFilter = tasks => {
  const DONE_FILTER = Vue.readonly(DONE_FILTER_RAW);
  const titleFilter = Vue.ref('');
  const doneFilter = Vue.ref(DONE_FILTER.UNDONE);
  const titleFilterExp = Vue.computed(() => new RegExp(titleFilter.value));
  const filteredTasks = Vue.computed(() => {
    if (titleFilter.value === '' && doneFilter.value === DONE_FILTER.ALL) {
      return tasks.value;
    }
    return tasks.value.filter(task => {
      const titleMatched = titleFilterExp.value.test(task.title);
      const doneMatched = [DONE_FILTER.ALL, task.done].some(v => v === doneFilter.value);
      return titleMatched && doneMatched;
    });
  });
  return {
    DONE_FILTER,
    titleFilter,
    doneFilter,
    filteredTasks,
  };
};
const useTaskEdit = () => {
  const editingTaskFieldsVisible = Vue.ref(false);
  const editingTaskTitle = Vue.ref('');
  const editingTask = Vue.ref('');
  const editingTaskTitleEl = Vue.ref(null);
  const editBtnRefs = [];
  const isEditingTask = task => {
    return editingTaskFieldsVisible.value && editingTask.value.id === task.id;
  };
  const showEditingTaskFields = task => {
    editingTask.value = task;
    editingTaskTitle.value = task.title;
    editingTaskFieldsVisible.value = true;
    Vue.nextTick(() => editingTaskTitleEl.value.select());
  };
  const hideEditingTaskFields = index => {
    editingTaskFieldsVisible.value = false;
    Vue.nextTick(() => {
      editBtnRefs[index].value.focus();
    });
  };
  const editTask = index => {
    editingTask.value.title = editingTaskTitle.value;
    hideEditingTaskFields(index);
  };
  const makeEditBtnRef = index => {
    const elRef = Vue.ref(null);
    editBtnRefs[index] = elRef;
    return elRef;
  };
  return {
    editingTaskFieldsVisible,
    editingTaskTitle,
    editingTask,
    editingTaskTitleEl,
    isEditingTask,
    showEditingTaskFields,
    hideEditingTaskFields,
    editTask,
    makeEditBtnRef,
  };
};
const useTaskAdd = tasks => {
  const newTaskFieldsVisible = Vue.ref(false);
  const newTaskTitle = Vue.ref('');
  const newTaskTitleEl = Vue.ref(null);
  const taskAddBtnEl = Vue.ref(null);
  const showNewTaskFields = () => {
    newTaskFieldsVisible.value = true;
    Vue.nextTick(() => newTaskTitleEl.value.focus());
  };
  const resetNewTaskFields = () => {
    newTaskTitle.value = '';
    newTaskFieldsVisible.value = false;
    Vue.nextTick(() => taskAddBtnEl.value.focus());
  };
  const addTask = () => {
    if (newTaskTitle.value === '') return;
    const newTask = makeNewTask(newTaskTitle.value, tasks.value);
    tasks.value = [...tasks.value, newTask];
    resetNewTaskFields();
  };
  return {
    newTaskFieldsVisible,
    newTaskTitle,
    newTaskTitleEl,
    taskAddBtnEl,
    showNewTaskFields,
    resetNewTaskFields,
    addTask,
  };
};
const useTaskDelete = tasks => {
  const deleteTask = taskId => (tasks.value = tasks.value.filter(task => task.id !== taskId));
  return { deleteTask };
};
const Todo = {
  setup() {
    const tasks = Vue.ref([
      { id: 1, title: '野菜を買う', done: false },
      { id: 2, title: '魚を買う', done: false },
      { id: 3, title: 'JavaScriptの勉強をする', done: false },
      { id: 4, title: '原稿を書く', done: false },
    ]);
    return {
      tasks: Vue.readonly(tasks),
      ...useTaskFilter(tasks),
      ...useTaskAdd(tasks),
      ...useTaskDelete(tasks),
      ...useTaskEdit(),
    };
  },
};
const todoApp = Vue.createApp(Todo);
todoApp.mount('#todoApp');
