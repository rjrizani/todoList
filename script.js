const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const add_btn = document.getElementById('add_btn');

window.preventAccordion = function(e) {
  e.stopPropagation();
}

const todos = JSON.parse(localStorage.getItem('todos'));

console.log(todos);


if (todos) {
    todos.forEach(todo => addTodo(todo));
    add_btn.addEventListener('click', (e) => {
      e.preventDefault();
      addTodo();
    });
}


function addTodo(todo) {
    let todoText = input.value.padEnd(30, ".").substring(0, 15) + "";

    if (todo) {
        todoText = todo.text.length >15 ? todo.text.substring(0, 15) + "..." : todo.text;

        todoText = todo.text.length <15 ? todo.text.padEnd(30, "") : todo.text;
    }

    if (todoText) {
        const todoEl = document.createElement('li');
        if (todo && todo.completed) {
            todoEl.classList.add('completed');
        }
    }

    todoEl.innerText = todoText;
}