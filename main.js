// Check if username exists in local storage, otherwise prompt for it
let userName = localStorage.getItem('username');

if (!userName) {
    userName = prompt("Enter Your First Name Here");
    if (userName !== null && userName.trim() !== "") {
        localStorage.setItem('username', userName.trim());
    } else {
        userName = "Dude"; // Default name
    }
}

// Set greeting
document.getElementById('greeting').innerHTML = `Good Evening ${userName}👋`;

// Time Format for Website
function updateDateTime() {
    const now = new Date();

    // Format date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    // Format time
    const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        second: '2-digit' 
    });

    // Update the elements
    document.getElementById('date').textContent = formattedDate;
    document.querySelector('.time h2').textContent = formattedTime;
}

// Update every second
setInterval(updateDateTime, 1000);
updateDateTime(); // Call once to show immediately

// Todo list Manager
const addButton = document.querySelector('.todo_create_button');
const taskInput = document.querySelector('.todo_input');
const todoContainer = document.querySelector('.todo_container');

// Load tasks from local storage when page loads
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(task => {
        createTaskElement(task);
    });
});

function createTaskElement(taskText) {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo_item');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Add delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = '×';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => {
        todoItem.remove();
        saveTasksToLocalStorage();
    });

    todoItem.appendChild(taskSpan);
    todoItem.appendChild(deleteButton);
    todoContainer.appendChild(todoItem);
}

function saveTasksToLocalStorage() {
    const tasks = [];
    document.querySelectorAll('.todo_item span').forEach(taskElement => {
        tasks.push(taskElement.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addButton.addEventListener("click", () => {
    if (taskInput.value.trim() !== "") {
        createTaskElement(taskInput.value.trim());
        saveTasksToLocalStorage();
        taskInput.value = "";
    }
});

// Allow adding tasks with Enter key
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && taskInput.value.trim() !== "") {
        createTaskElement(taskInput.value.trim());
        saveTasksToLocalStorage();
        taskInput.value = "";
    }
});