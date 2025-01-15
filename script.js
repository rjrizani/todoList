const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');
const add_btn = document.getElementById('add_btn');

const todos = JSON.parse(localStorage.getItem('todos')) || [];

// Add button event listener moved outside the condition
add_btn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo();
});

if (todos.length > 0) {
    todos.forEach(todo => addTodo(todo));
}

function addTodo(todo) {
    let todoText = input.value.trim();  // Simplified text handling

    if (todo) {
        todoText = todo.text;
    }

    if (todoText !== "") {
        const todoEl = document.createElement('li');
        todoEl.textContent = todoText;

        if (todo && todo.completed) {

            todoEl.classList.add('completed');
        }

        // Create buttons with cleaner labels
        const markDoneBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');

        markDoneBtn.textContent = "✔️ Mark as Done";
        deleteBtn.textContent = "❌ Delete";

        // Add styling
        markDoneBtn.style.marginLeft = "20px";
        deleteBtn.style.marginLeft = "10px";

        // Append buttons
        todoEl.appendChild(markDoneBtn);
        todoEl.appendChild(deleteBtn);
        
        // Event Listeners for buttons
        markDoneBtn.addEventListener('click', () => {
            todoEl.classList.toggle('completed');
         
            updateLS();
         
        });

        deleteBtn.addEventListener('click', () => {
            todoEl.remove();
            updateLS();
        });

        todosUL.appendChild(todoEl);
        input.value = '';
        updateLS();
    }
}

function updateLS() {
    const todosEl = document.querySelectorAll('li');
    const todos = [];

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.childNodes[0].textContent.trim(),  // Captures only the task text

            completed: todoEl.classList.contains('completed')
           
        });
    });

    try {
        localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
        console.error('Error updating local storage:', error);
    }
}
