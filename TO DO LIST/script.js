const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Carregar tarefas do LocalStorage
document.addEventListener('DOMContentLoaded', loadTasks);

addTaskBtn.addEventListener('click', addTask);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    createTaskElement(taskText);
    saveTask(taskText);

    taskInput.value = '';
}

function createTaskElement(taskText) {
    const li = document.createElement('li');

    li.innerHTML = `
        <span>${taskText}</span>
        <div>
            <button onclick="toggleTask(this)">✔</button>
            <button onclick="removeTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
}

function toggleTask(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
}

function removeTask(button) {
    const li = button.parentElement.parentElement;
    const taskText = li.querySelector('span').textContent;

    li.remove();
    removeTaskFromStorage(taskText);
}

function saveTask(taskText) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => createTaskElement(task));
}

function removeTaskFromStorage(taskText) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}