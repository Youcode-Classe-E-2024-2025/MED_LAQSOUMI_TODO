function showModal() {
  document.getElementById("modal-task").classList.remove("hidden");
}

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

function closeModal() {
  document.getElementById("modal-task").classList.add("hidden");
}
