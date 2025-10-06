# Todo List Project - TP JavaScript

## Overview
This project is a functional todo list application built with HTML, CSS, and JavaScript. It demonstrates the use of JavaScript objects, arrays, loops, and DOM manipulation to create an interactive web application.

## Project Structure
```
todo-list.html  - Main HTML structure
todo-list.css   - Styling and layout
todo-list.js    - JavaScript functionality
README.md       - This documentation file
```

## Features Implemented

### 1. Data Structure

**Array of Objects Implementation:**
```javascript
const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];
```

- **Array of Objects**: Used `todoList` array to store todo items as objects
- Each todo object contains:
  - `name`: The task description
  - `dueDate`: The due date in YYYY-MM-DD format

### 2. Core Functionality

#### Adding Todos (`addTodo()` function)

**Complete Implementation:**
```javascript
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
```

**Features:**
- Captures user input from name and date fields
- Validates that both fields are filled before adding
- Pushes new todo objects to the `todoList` array
- Clears input fields after adding
- Displays French alert message for validation: "Enter le nom et la date de la tâche"

#### Rendering Todos (`renderTodoList()` function)

**Complete Implementation with Loop:**
```javascript
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
  
  // Update DOM with generated HTML
  document.querySelector('.js-todo-list').innerHTML = todoListHTML;

  // Add delete functionality (see next section)
  const deleteButtons = document.querySelectorAll('.js-delete-button');
  deleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      todoList.splice(index, 1);
      renderTodoList();
    });
  });
}
```

**Features:**
- **Loops through the todoList array** using a for loop to display all todos
- Dynamically generates HTML for each todo item in a grid layout
- Shows task name, due date, and delete button for each item
- Updates the DOM by injecting HTML into the `.js-todo-list` container

#### Deleting Todos
- Attaches event listeners to delete buttons using `forEach` loop
- Uses `splice()` method to remove todos from the array by index
- Re-renders the entire list after deletion to update the display

### 3. DOM Manipulation Techniques
- **querySelector**: Used to select specific elements by class
- **querySelectorAll**: Used to select all delete buttons for event handling
- **addEventListener**: Added click events for add and delete functionality
- **innerHTML**: Used to dynamically update the todo list display

### 4. User Interface
- **Grid Layout**: CSS Grid used for organized display of todos and input fields
- **Responsive Design**: Clean, organized layout with proper spacing
- **Color Coding**: Green add button, red delete buttons for intuitive UX
- **Input Validation**: Prevents empty todos from being added

## Technical Concepts Demonstrated

### JavaScript Concepts:
1. **Objects and Arrays**: Managing data with array of objects
2. **Loops**: For loop to iterate through todos, forEach for event handling
3. **Functions**: Modular code with `addTodo()` and `renderTodoList()`
4. **Event Handling**: Click events for user interactions
5. **DOM Manipulation**: Dynamic content updates
6. **Array Methods**: `push()` for adding, `splice()` for removing

### Web Development Concepts:
1. **Separation of Concerns**: HTML structure, CSS styling, JS functionality
2. **Dynamic Content**: JavaScript-generated HTML elements
3. **Form Handling**: Input capture and validation
4. **Responsive Layout**: CSS Grid for organized display

## Code Structure Analysis

### Initial State
The application starts with one sample todo:
```javascript
const todoList = [{
  name: 'review course',
  dueDate: '2025-09-29'
}];
```

### Key Functions
1. **`renderTodoList()`**: Main rendering function that loops through todos and updates display
2. **`addTodo()`**: Handles form submission and data validation
3. **Delete functionality**: Anonymous functions within forEach loop for individual todo deletion

## How to Run
1. Open `todo-list.html` in a web browser
2. Add new todos using the input fields
3. Click "Add" to create new todos
4. Click "Delete" to remove existing todos

## Learning Outcomes
This TP demonstrates practical application of:
- JavaScript object manipulation
- Array iteration and modification
- DOM event handling
- Dynamic HTML generation
- Input validation
- Responsive web design with CSS Grid

---
*Created as part of JavaScript Objects and Loops coursework*
