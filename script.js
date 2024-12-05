let todos = [];

const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

function loadTodos() {
  const savedTodos = localStorage.getItem('todos');
  if (savedTodos) {
    todos = JSON.parse(savedTodos);
  }
}

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function newTodo() {
  const title = prompt('Введіть назву нової справи:');
  if (title) {
    const newTodo = {
      id: Date.now(),
      title,
      checked: false
    };
    todos.push(newTodo);
    saveTodos();
    render();
    updateCounter();
  }
}

function renderTodo(todo) {
  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${todo.checked ? 'checked' : ''} onChange="checkTodo(${todo.id})" />
      <label for="${todo.id}">
        <span class="${todo.checked ? 'text-success text-decoration-line-through' : ''}">${todo.title}</span>
      </label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render() {
  list.innerHTML = todos.map(renderTodo).join('');
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.checked).length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveTodos();
  render();
  updateCounter();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  if (todo) {
    todo.checked = !todo.checked;
    saveTodos();
    render();
    updateCounter();
  }
}

loadTodos();
render();
updateCounter();
