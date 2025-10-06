const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  // Loop over every toDo object and append it to "todoListHTML"
  // Show the objects inside the class "js-todo-list"
  for (let i = 0; i < todoList.length; i++) {
    const todoObject = todoList[i];
    const name = todoObject.name;
    const dueDate = todoObject.dueDate;
    const html = `<div class="todo-grid">
    <label>${name}</label>
    <label>${dueDate}</label>
    <button class="delete-todo-button">Delete</button></div>`;
    todoListHTML += html;
  }
  // Loop over every delete button and add an eventListener that deletes the toDo and rerender the Tasks
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });


}

document.querySelector('.js-add-todo-button')
  .addEventListener('click', () => {
    addTodo();
  });

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  // Add these values to the variable "todoList"
  if (name && dueDate) {
  todoList.push({
    name: name,
    dueDate: dueDate
  });
  } else {
    alert('Enter le nom et la date de la tâche.');
  }

  inputElement.value = '';

  renderTodoList();
}