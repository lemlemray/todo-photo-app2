const initialImages = [
  "images/S__4038781_0.jpg",
  "images/S__4038782_0.jpg",
  "images/S__4038783_0.jpg",
  "images/S__4038784_0.jpg"
];

if (localStorage.getItem("allImages") === null) {

  localStorage.setItem(
    "allImages",
    JSON.stringify(initialImages)
  );
}

let allImages =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

if (allImages.length > 0) {

  const randomImage =
    allImages[
      Math.floor(
        Math.random() * allImages.length
      )
    ];

  document.body.style.backgroundImage =
    `url(${randomImage})`;

  document.body.style.backgroundSize =
    "cover";

  document.body.style.backgroundPosition =
    "center";
}

const taskInput =
  document.getElementById("task-input");

const addButton =
  document.getElementById("add-button");

const todoList =
  document.getElementById("todo-list");

loadTasks();

addButton.addEventListener(
  "click",
  () => {

    const text =
      taskInput.value.trim();

    if (text === "") return;

    createTask(text);

    saveTasks();

    taskInput.value = "";
  }
);

function createTask(text) {

  const li =
    document.createElement("li");

  li.className = "task";

  const checkbox =
    document.createElement("input");

  checkbox.type = "checkbox";

  const span =
    document.createElement("span");

  span.textContent = text;

  li.appendChild(checkbox);

  li.appendChild(span);

  todoList.appendChild(li);

  checkbox.addEventListener(
    "change",
    () => {

      if (checkbox.checked) {

        li.remove();

        saveTasks();
      }
    }
  );
}

function saveTasks() {

  const tasks = [];

  document
    .querySelectorAll(".task span")
    .forEach(span => {

      tasks.push(span.textContent);

    });

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );
}

function loadTasks() {

  const tasks =
    JSON.parse(
      localStorage.getItem("tasks")
    ) || [];

  tasks.forEach(task => {

    createTask(task);

  });
}

const photoInput =
  document.getElementById("photo-input");

photoInput.addEventListener(
  "change",
  event => {

    const files =
      event.target.files;

    if (!files.length) return;

    let loadedCount = 0;

    for (let i = 0; i < files.length; i++) {

      const reader =
        new FileReader();

      reader.onload = function(e) {

        const imageData =
          e.target.result;

        allImages.push(imageData);

        loadedCount++;

        if (
          loadedCount === files.length
        ) {

          localStorage.setItem(
            "allImages",
            JSON.stringify(allImages)
          );

          location.reload();
        }
      };

      reader.readAsDataURL(files[i]);
    }
  }
);