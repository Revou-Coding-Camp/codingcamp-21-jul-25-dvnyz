




console.log("Script loaded successfully!");

// Theme management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update toggle buttons
    document.getElementById('lightTheme').classList.toggle('active', theme === 'light');
    document.getElementById('darkTheme').classList.toggle('active', theme === 'dark');
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Global variables
let filterStatus = 'all';
let filterDate = '';
let task = [];

// Function to load tasks from localStorage
function loadTasks() {
    const saved = localStorage.getItem('todo-tasks');
    if (saved) {
        try {
            task = JSON.parse(saved);
        } catch (e) {
            task = [];
        }
        renderTasks(); // Render tasks after loading
    }
}

// Function to save tasks to localStorage
function saveTasks() {
    localStorage.setItem('todo-tasks', JSON.stringify(task));
}

// Function to set date filter
function setFilterDate(date) {
    filterDate = date;
    renderTasks();
}

// Initialize when page loads
window.onload = function() {
    loadTasks();
    
    // Set up filter handlers
    const filterDateInput = document.getElementById('filter-date');
    const filterStatusSelect = document.getElementById('filter-status');
    
    if (filterDateInput) {
        filterDateInput.value = filterDate;
    }
    if (filterStatusSelect) {
        filterStatusSelect.value = filterStatus;
    }
};




function showNotification(message) {
    let container = document.getElementById("notification-container");
    if (!container) {
        container = document.createElement('div');
        container.id = 'notification-container';
        container.className = 'notification';
        document.body.appendChild(container);
    }
    container.innerHTML = `<span>${message}</span><button id="notification-close" onclick="closeNotification()">&times;</button>`;
    container.classList.remove("hidden");
    container.classList.add("notification");
    setTimeout(() => {
        closeNotification();
    }, 3000);
}

function closeNotification() {
    const container = document.getElementById("notification-container");
    if (container) {
        container.classList.add("hidden");
        container.classList.remove("notification");
    }
}

function addTask() {
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");
    if (!taskInput.value || !dateInput.value) {
        showNotification("Please fill in both task and date fields.");
        return;
    } else {
        task.push({
            title: taskInput.value,
            date: dateInput.value,
            completed: false,
        });
        saveTasks();
        showNotification("Task added!");
    }
    taskInput.value = '';
    dateInput.value = '';
    renderTasks();
}

function removeAllTask() {
    if (confirm('Are you sure you want to delete all tasks?')) {
        task = [];
        saveTasks();
        showNotification("All tasks deleted.");
        renderTasks();
    }
}

function deleteTask(index) {
    task.splice(index, 1);
    saveTasks();
    showNotification("Task deleted.");
    renderTasks();
}

function completeTask(index) {
    task[index].completed = !task[index].completed;
    saveTasks();
    showNotification(task[index].completed ? "Task completed!" : "Task marked as incomplete.");
    renderTasks();
}

function setFilterStatus(status) {
    filterStatus = status;
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById("todo-list");
    if (!taskList) return; // Guard against rendering before DOM is ready
    
    taskList.innerHTML = "";
    let filteredTasks = [...task]; // Create a copy of the task array
    
    if (filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.completed);
    } else if (filterStatus === 'incomplete') {
        filteredTasks = filteredTasks.filter(t => !t.completed);
    }
    
    if (filterDate) {
        filteredTasks = filteredTasks.filter(t => t.date === filterDate);
    }
    filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });
    if (filteredTasks.length === 0) {
        taskList.innerHTML = "<p>No tasks available</p>";
        return;
    }
    filteredTasks.forEach((taskItem, idx) => {
        // Use the index in the main array for actions
        const mainIndex = task.indexOf(taskItem);
        taskList.innerHTML += `<li class="todo-item flex justify-between items-center bg-white p-4 mb-2 rounded shadow-sm transition hover:shadow-lg">
            <span class="flex-grow${taskItem.completed ? ' line-through text-gray-500' : ''}">${taskItem.title} <small class="ml-2 text-xs text-gray-400">${taskItem.date}</small></span>
            <div class="flex gap-2">
                <button type="button" class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded transition" onclick="completeTask(${mainIndex});">${taskItem.completed ? 'Undo' : 'Complete'}</button>
                <button type="button" class="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded transition" onclick="deleteTask(${mainIndex});">Delete</button>
            </div>
        </li>`;
    });
}

// Initial render
renderTasks();