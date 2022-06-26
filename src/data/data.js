let todos = [];

export const getTodos = () => {
  return todos;
};

export const editTodo = (id, newTitle) => {
  const findTodoIndex = todos.findIndex((todo) => todo.id === id);
  todos[findTodoIndex].title = newTitle;
};

export const deleteTodo = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  todos = newTodos;
};

export const markAsDone = (id) => {
  const todo = todos.find((todo) => todo.id === id);
  todo.done = !todo.done;
};

export const addTodo = (title) => {
  const todo = {
    title,
    id: todos.length + 1,
    done: false,
  };
  todos.unshift(todo);
};
