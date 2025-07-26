console.log("Script loaded successfully!");

let task = [];

function addTask() {
    // Function to add a task
    const taskInput = document.getElementById("todo-input");
    const dateInput = document.getElementById("date-input");

    if (!taskInput.value || !dateInput.value) {
        alert("Please fill in both task and date fields.");
        console.error("Task and date inputs cannot be empty.");
        return;
    } else {
        task.push({
        title: taskInput.value,
        date: dateInput.value
        });
    }

    console.log("Task added:", taskInput.value, "on", dateInput.value);
    console.log(task);
    
    renderTasks();
}

function removeAllTask() {
    // Function to remove a task
    task = [];

    renderTasks();
}

function toggleFilter() {
    // Function to toggle filter

}

function renderTasks() {
    // Function to render tasks
    const taskList = document.getElementById("todo-list");
    taskList.innerHTML = ""; // Clear existing tasks

    task.forEach((task, index) => {
        taskList.innerHTML += `
        <li class="todo-item flex justify-between items-center bg-white p-4 mb-2">
            <span class="flex-grow">${task.title}</span>
            <div>
                <button class="px-[10px] py-[2px] bg-green-500 text-white rounded">Edit</button>
                <button class="px-[10px] py-[2px] bg-red-500 text-white rounded">Delete</button>
            </div>
            <hr/>
        </li>
        `;
    });
};