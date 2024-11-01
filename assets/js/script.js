function updateSelectColor(select) {
  select.classList.remove("text-red-500", "text-orange-500", "text-green-500");

  const selectedOption = select.options[select.selectedIndex];
  const colorClass = selectedOption.getAttribute("class");

  if (colorClass) {
    select.classList.add(colorClass);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  updateSelectColor(document.getElementById("task-priority"));
});

function showModal() {
  document.getElementById("modal-task").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("modal-task").classList.add("hidden");
}

function saveTask(event) {
  event.preventDefault();

  const title = document.getElementById("task-name").value;
  const desc = document.getElementById("task-desc").value;
  const status = document.getElementById("task-status").value;
  const dueDate = document.getElementById("task-due").value;
  const priority = document.getElementById("task-priority").value;

  addCard(title, desc, status, dueDate, priority);

  document.getElementById("form-task").reset();
  closeModal();
}

function addCard(title, desc, status, dueDate, priority) {
  const column = document.getElementById(`${status}-list`);

  const card = document.createElement("div");
  card.className = `p-4 border rounded shadow bg-white ${
    priority === "P1"
      ? "bg-red-600"
      : priority === "P2"
      ? "bg-orange-600"
      : "bg-green-600"
  }`;

  card.innerHTML = `
    <h4 class="font-bold">${title}</h4>
    <p class="text-sm">${desc}</p>
    <p class="text-xs text-gray-600">Due: ${dueDate}</p>
    <span class="inline-block px-2 py-1 text-xs font-semibold ${
      priority === "P1"
        ? "bg-red-500 text-white"
        : priority === "P2"
        ? "bg-orange-500 text-white"
        : "bg-green-500 text-white"
    } rounded-full">${priority}</span>
  `;

  column.appendChild(card);
}
