const addTaskBtn = document.getElementById("add-task-btn");
const taskInput = document.getElementById("task-input");
const listContainer = document.querySelector(".show-task");

// Function to save tasks to local storage
function saveTasks() {
  const listItems = listContainer.querySelectorAll("li");
  const tasks = [];
  listItems.forEach((item) => {
    // Store the task text and its checked status
    tasks.push({
      text: item.firstChild.textContent,
      checked: item.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage and display them
function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  storedTasks.forEach((task) => {
    createTaskItem(task.text, task.checked);
  });
}

// Function to create a list item for a task
function createTaskItem(taskText, isChecked = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  // Apply the "checked" class if the task was previously checked
  if (isChecked) {
    li.classList.add("checked");
  }

  const span = document.createElement("span");
  li.appendChild(span);
  listContainer.appendChild(li);
}

// Event listener for adding new tasks
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value;
  if (taskText !== "") {
    createTaskItem(taskText);
    taskInput.value = "";
    saveTasks();
  } else {
    alert("Please enter a task first.");
  }
});

// Event listener for handling clicks on the list container
listContainer.addEventListener("click", (event) => {
  const clickedElement = event.target;

  // Toggle the "checked" class if a list item is clicked
  if (clickedElement.tagName === "LI") {
    clickedElement.classList.toggle("checked");
    saveTasks();
  } else if (clickedElement.tagName === "SPAN") {
    clickedElement.parentElement.remove();
    saveTasks();
  }
});

// Load tasks from local storage when the page loads
loadTasks();
