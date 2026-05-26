const taskInput = document.getElementById("task-input");
const addButton = document.getElementById("add-button");
const todoList = document.getElementById("todo-list");

loadTasks();

addButton.addEventListener("click", () => {
  const text = taskInput.value.trim();

  if (text === "") return;

  createTask(text);

  saveTasks();

  taskInput.value = "";
});

function createTask(text) {

  const li = document.createElement("li");
  li.className = "task";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = text;

  li.appendChild(checkbox);
  li.appendChild(span);

  todoList.appendChild(li);

  checkbox.addEventListener("change", () => {

    if (checkbox.checked) {

      li.remove();

      saveTasks();
    }
  });
}

function saveTasks() {

  const tasks = [];

  document.querySelectorAll(".task span").forEach(span => {
    tasks.push(span.textContent);
  });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks() {

  const tasks =
    JSON.parse(localStorage.getItem("tasks"))
    || [];

  tasks.forEach(task => {
    createTask(task);
  });
}

const photoInput = document.getElementById("photo-input");

photoInput.addEventListener("change", (event) => {

  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {

    const imageData = e.target.result;

    document.body.style.backgroundImage =
      `url(${imageData})`;

    document.body.style.backgroundSize = "cover";

    document.body.style.backgroundPosition = "center";

    localStorage.setItem(
      "backgroundImage",
      imageData
    );
  };

  reader.readAsDataURL(file);
});

window.addEventListener("load", () => {

  const savedImage =
    localStorage.getItem("backgroundImage");

  if (savedImage) {

    document.body.style.backgroundImage =
      `url(${savedImage})`;

    document.body.style.backgroundSize = "cover";

    document.body.style.backgroundPosition = "center";
  }
});