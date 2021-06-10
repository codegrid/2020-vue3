const DONE_FILTER = {
  DONE: true,
  UNDONE: false,
  ALL: null,
};

const getSessionKey = key => {
  const arr = location.href.split('/');
  return `${arr[arr.length - 2]}_${key}`;
};

const makeNewTask = (title, tasks) => {
  const ids = tasks.map(task => task.id);
  const id = Math.max(...ids) + 1;
  return {
    id,
    title,
    done: false,
  };
};

const saveTasks = params => {
  const key = getSessionKey('tasks');
  sessionStorage.setItem(key, JSON.stringify(params.tasks));
  return Promise.resolve();
};

const getTasks = () => {
  const key = getSessionKey('tasks');
  const tasksString = sessionStorage.getItem(key);
  if (tasksString === 'undefined') {
    return;
  }
  return JSON.parse(tasksString);
};

const fetchTasks = params => {
  return new Promise(resolve => {
    const tasks = getTasks();
    if (!params || (params.titleFilter === '' && params.doneFilter === DONE_FILTER.ALL)) {
      resolve(tasks);
      return;
    }
    const filteredTasks = tasks.filter(task => {
      const re = new RegExp(params.titleFilter);
      const titleMatched = re.test(task.title);
      const doneMatched = [DONE_FILTER.ALL, task.done].some(v => v === params.doneFilter);
      return titleMatched && doneMatched;
    });
    resolve(filteredTasks);
  });
};

const putTask = editedTask => {
  const tasks = getTasks();
  const newTasks = tasks.map(task => {
    return task.id === editedTask.id ? editedTask : task;
  });
  saveTasks({ tasks: newTasks });
  return Promise.resolve();
};

const postTask = params => {
  const tasks = getTasks();
  const newTask = makeNewTask(params.title, tasks);
  saveTasks({ tasks: [...tasks, newTask] });
  return Promise.resolve({ task: newTask });
};

const deleteTask = params => {
  const tasks = getTasks();
  const newTasks = tasks.filter(task => {
    return task.id !== params.id;
  });
  saveTasks({ tasks: newTasks });
  return Promise.resolve();
};

const initializeTasks = tasks => {
  const key = getSessionKey('tasks');
  sessionStorage.setItem(key, JSON.stringify(tasks));
};

export const makeApiMock = (tasks, maxCount) => {
  if (!getTasks()) {
    initializeTasks(tasks);
  }
  return {
    fetchTasks: params => {
      return fetchTasks(params).then(tasks => {
        if (!maxCount) {
          return { tasks };
        }
        return {
          tasks: tasks.filter((_, idx) => idx < maxCount),
        };
      });
    },
    putTask,
    postTask,
    deleteTask,
    initializeTasks,
    makeApiMock,
  };
};
