function showModal(task = null) {
  const modal = document.getElementById("modal-task");
  modal.classList.remove("hidden");

  if (task) {
    document.getElementById("task-id").value = task.id;
    document.getElementById("task-name").value = task.name;
    document.getElementById("task-desc").value = task.description;
    document.getElementById("task-status").value = task.status;
    document.getElementById("task-due").value = task.dueDate;
    document.getElementById("task-priority").value = task.priority;
  } else {
    document.getElementById("form-task").reset();
    document.getElementById("task-id").value = "";
  }
}

function closeModal() {
  document.getElementById("modal-task").classList.add("hidden");
}

let tasks = [
  {
    id: 1,
    name: "Default Task 1",
    description: "Description for task 1",
    status: "todo",
    dueDate: "2024-11-05",
    priority: "P1",
  },
  {
    id: 2,
    name: "Default Task 2",
    description: "Description for task 2",
    status: "in-progress",
    dueDate: "2024-11-10",
    priority: "P2",
  },
  {
    id: 3,
    name: "Default Task 3",
    description: "Description for task 3",
    status: "done",
    dueDate: "2024-11-15",
    priority: "P3",
  },
];

function saveTask(event) {
  event.preventDefault();

  const taskId = document.getElementById("task-id").value;
  const taskName = document.getElementById("task-name").value;
  const taskDesc = document.getElementById("task-desc").value;
  const taskStatus = document.getElementById("task-status").value;
  const taskDue = document.getElementById("task-due").value;
  const taskPriority = document.getElementById("task-priority").value;

  if (taskId) {
    const task = tasks.find((t) => t.id == taskId);
    if (task) {
      task.name = taskName;
      task.description = taskDesc;
      task.status = taskStatus;
      task.dueDate = taskDue;
      task.priority = taskPriority;
    }
  } else {
    const task = {
      id: Date.now(),
      name: taskName,
      description: taskDesc,
      status: taskStatus,
      dueDate: taskDue,
      priority: taskPriority,
    };
    tasks.push(task);
  }

  closeModal();
  updateTaskLists();
  updateStatistics();
}

function updateTaskLists() {
  const todoList = document.getElementById("todo-list");
  const inProgressList = document.getElementById("in-progress-list");
  const doneList = document.getElementById("done-list");

  todoList.innerHTML = "";
  inProgressList.innerHTML = "";
  doneList.innerHTML = "";

  tasks.forEach((task) => {
    const taskElement = createTaskElement(task);

    if (task.status === "todo") {
      todoList.appendChild(taskElement);
    } else if (task.status === "in-progress") {
      inProgressList.appendChild(taskElement);
    } else if (task.status === "done") {
      doneList.appendChild(taskElement);
    }
  });
}

function createTaskElement(task) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "p-2 rounded shadow-lg text-purple-700 bg-white";
  taskDiv.id = `task-${task.id}`;

  taskDiv.innerHTML = `
    <h4 class="font-semibold text-blue-700">${task.name}</h4>
    <p>Due: ${task.dueDate}</p>
    <div class="flex justify-start gap-1">
      <p class="text-purple-700">Priority:</p>
      <p class="${getPriorityColor(task.priority)}">${task.priority}</p>
    </div>
    <div class="flex justify-center gap-1">
      <label for="status-${task.id}" class="sr-only"></label>
      <select id="status-${task.id}" name="task-status" 
              onchange="changeStatus(${task.id}, this.value)" 
              class="text-sm rounded border max-w-md text-purple-700">
        <option value="todo" ${
          task.status === "todo" ? "selected" : ""
        }>To Do</option>
        <option value="in-progress" ${
          task.status === "in-progress" ? "selected" : ""
        }>In Progress</option>
        <option value="done" ${
          task.status === "done" ? "selected" : ""
        }>Done</option>
      </select>
      <button onclick="editTask(${
        task.id
      })" class="text-white text-sm border p-1 rounded shadow-md bg-button hover:bg-buttonhover">Edit</button>
      <button onclick="deleteTask(${
        task.id
      })" class="text-white text-sm border p-1 rounded shadow-md bg-button hover:bg-buttonhover">Delete</button>
    </div>
  `;

  return taskDiv;
}

function getPriorityColor(priority) {
  switch (priority) {
    case "P1":
      return "text-red-500";
    case "P2":
      return "text-orange-500";
    case "P3":
      return "text-green-500";
    default:
      return "text-gray-500";
  }
}

function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  updateTaskLists();
  updateStatistics();
}

function changeStatus(taskId, newStatus) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.status = newStatus;
  }
  updateTaskLists();
  updateStatistics();
}

function updateStatistics() {
  const todoCount = tasks.filter((task) => task.status === "todo").length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "in-progress"
  ).length;
  const doneCount = tasks.filter((task) => task.status === "done").length;
  const totalCount = tasks.length;

  const statsElement = document.getElementById("tasks-list");
  statsElement.innerHTML = `<div class="flex justify-center gap-5" >
      <p class="font-semibold">To Do: ${todoCount}</p>
      <p class="font-semibold">In Progress: ${inProgressCount}</p>
      <p class="font-semibold">Done: ${doneCount}</p>
      <p class="font-semibold">Total: ${totalCount}</p></div>
  `;
}

function editTask(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    showModal(task);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  updateTaskLists();
  updateStatistics();
});
