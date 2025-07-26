console.log("Script loaded successfully!");

let task = [];

let filterStatus = 'all'; // all, completed, incomplete
let filterDate = ''; // date string in yyyy-mm-dd format

function showNotification(message) {
    const container = document.getElementById("notification-container");
    container.textContent = message;
    container.classList.remove("hidden");
    container.classList.add("notification");
    setTimeout(() => {
        container.classList.add("hidden");
        container.classList.remove("notification");
    }, 3000);
}

function addTask() {
    // Function to add a task
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    if (!taskInput.value || !dateInput.value) {
        showNotification("Please fill in both task and date fields.");
        console.error("Task and date inputs cannot be empty.");
        return;
    } else {
        task.push({
            title: taskInput.value,
            date: dateInput.value,
            completed: false,
        });
    }

    console.log("Task added:", taskInput.value, "on", dateInput.value);
    console.log(task);
    
    renderTasks();
}

function removeAllTask() {
    // Function to remove all tasks
    task = [];
    renderTasks();
}

function deleteTask(index) {
    // Function to delete a single task by index
    task.splice(index, 1);
    renderTasks();
}

function completeTask(index) {
    // Function to mark a task as complete or incomplete
    task[index].completed = !task[index].completed;
    renderTasks();
}

function setFilterStatus(status) {
    filterStatus = status;
    renderTasks();
}

function setFilterDate(date) {
    filterDate = date;
    renderTasks();
}

function renderTasks() {
    // Function to render tasks with filters applied
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = ""; // Clear existing tasks

    let filteredTasks = task;

    // Filter by completion status
    if (filterStatus === 'completed') {
        filteredTasks = filteredTasks.filter(t => t.completed);
    } else if (filterStatus === 'incomplete') {
        filteredTasks = filteredTasks.filter(t => !t.completed);
    }

    // Filter by date if set
    if (filterDate) {
        filteredTasks = filteredTasks.filter(t => t.date === filterDate);
    }

    // Sort tasks: incomplete first, completed last
    filteredTasks.sort((a, b) => {
        if (a.completed === b.completed) return 0;
        return a.completed ? 1 : -1;
    });

    if (filteredTasks.length === 0) {
        taskList.innerHTML = "<p>No tasks available</p>";
        return;
    }

    filteredTasks.forEach((taskItem, index) => {
        taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center bg-white p-4 mb-2">
            <span class="flex-grow${taskItem.completed ? ' line-through text-gray-500' : ''}">${taskItem.title} - <small>${taskItem.date}</small></span>
            <div>
                <button type="button" class="px-[10px] py-[2px] bg-green-500 text-white rounded" onclick="completeTask(${index});">${taskItem.completed ? 'Undo' : 'Complete'}</button>
                <button type="button" class="px-[10px] py-[2px] bg-red-500 text-white rounded" onclick="deleteTask(${index});">Delete</button>
            </div>
        </li>
        `;
    });
}