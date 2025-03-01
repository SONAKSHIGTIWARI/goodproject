// Get elements from DOM
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks
function displayTasks() {
    taskList.innerHTML = ''; // Clear the list before displaying tasks
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.classList.toggle("completed", task.completed);
        li.innerHTML = `
            <span onclick="toggleCompletion(${index})">${task.name}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
function addTask() {
    const taskName = taskInput.value.trim();
    if (taskName !== "") {
        const newTask = {
            name: taskName,
            completed: false
        };
        tasks.push(newTask);
        taskInput.value = ''; // Clear input
        saveTasks();
        displayTasks();
    }
}

// Toggle task completion
function toggleCompletion(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

// Delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

// Save tasks to local storage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Event listener for adding a task
addTaskButton.addEventListener("click", addTask);

// Display tasks on load
displayTasks();
