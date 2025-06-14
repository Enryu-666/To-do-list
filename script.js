document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('todo-form');
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    // Load todos from localStorage
    loadTodos();

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const todoText = input.value.trim();
        if (todoText) {
            addTodoItem(todoText);
            input.value = '';
        }
    });

    // Function to add a new todo item
    function addTodoItem(text) {
        const li = document.createElement('li');
        li.textContent = text;
        li.addEventListener('click', () => {
            li.classList.toggle('completed');
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            li.remove();
            saveTodos();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);
        saveTodos();
    }

    // Save todos to localStorage
    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    // Load existing todos from localStorage
    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.textContent = todo.text;
            if (todo.completed) {
                li.classList.add('completed');
            }
            li.addEventListener('click', () => {
                li.classList.toggle('completed');
                saveTodos();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation();
                li.remove();
                saveTodos();
            });

            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
    }
});