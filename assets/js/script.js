function showModal() {
  document.getElementById("modal-task").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal-task").classList.add("hidden");
}

let tasks = [];

function saveTask(event) {
  event.preventDefault();

  const taskName = document.getElementById("task-name").value;
  const taskDesc = document.getElementById("task-desc").value;
  const taskStatus = document.getElementById("task-status").value;
  const taskDue = document.getElementById("task-due").value;
  const taskPriority = document.getElementById("task-priority").value;

  const task = {
    id: Date.now(),
    name: taskName,
    description: taskDesc,
    status: taskStatus,
    dueDate: taskDue,
    priority: taskPriority,
  };

  tasks.push(task);
  closeModal();
  document.getElementById("form-task").reset();
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
  taskDiv.className = `p-2 rounded shadow-lg text-white`;

  taskDiv.innerHTML = `
      <h4 class="font-semibold">${task.name}</h4>
      <p>Due: ${task.dueDate}</p>
      <p>Priority: ${task.priority}</p>
      <div class="flex justify-between">
          <select onchange="changeStatus(${
            task.id
          }, this.value)" class="text-sm rounded border max-w-md text-black">
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
          <button onclick="deleteTask(${
            task.id
          })" class="text-white text-sm border p-2 rounded shadow-md">Delete</button>
          
      </div>
  `;

  return taskDiv;
}

// function getPriorityColor(priority) {
//   switch (priority) {
//     case "P1":
//       return "bg-red-500";
//     case "P2":
//       return "bg-orange-500";
//     case "P3":
//       return "bg-green-500";
//     default:
//       return "bg-gray-500";
//   }
// }

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

function updateSelectColor(select) {
  select.className =
    "w-full p-2 border rounded mb-4 " + getPriorityColor(select.value);
}
