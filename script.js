const taskInput =
  document.getElementById(
    "task-input"
  );

const addButton =
  document.getElementById(
    "add-button"
  );

const todoList =
  document.getElementById(
    "todo-list"
  );

const imageInput =
  document.getElementById(
    "image-input"
  );



/* ======================
   Todo
====================== */

let tasks =
  JSON.parse(
    localStorage.getItem(
      "tasks"
    )
  ) || [];

drawTasks();

addButton.onclick =
  () => {

    const text =
      taskInput.value.trim();

    if (!text) {

      return;
    }

    tasks.push(text);

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

    taskInput.value = "";

    drawTasks();
  };

function drawTasks() {

  todoList.innerHTML =
    "";

  tasks.forEach(
    (task, index) => {

      const li =
        document.createElement(
          "li"
        );

      li.className =
        "task-item";

      const checkbox =
        document.createElement(
          "input"
        );

      checkbox.type =
        "checkbox";

      checkbox.onchange =
        () => {

          tasks.splice(
            index,
            1
          );

          localStorage.setItem(
            "tasks",
            JSON.stringify(tasks)
          );

          drawTasks();
        };

      const span =
        document.createElement(
          "span"
        );

      span.innerText =
        task;

      li.appendChild(
        checkbox
      );

      li.appendChild(span);

      todoList.appendChild(
        li
      );
    }
  );
}



/* ======================
   IndexedDB
====================== */

let db;

const request =
  indexedDB.open(
    "PhotoDB",
    1
  );

request.onupgradeneeded =
  event => {

    db =
      event.target.result;

    db.createObjectStore(
      "images",
      {
        keyPath: "id",
        autoIncrement: true
      }
    );
  };

request.onsuccess =
  event => {

    db =
      event.target.result;

    setRandomBackground();
  };



/* ======================
   Upload
====================== */

imageInput.addEventListener(
  "change",
  event => {

    const files =
      event.target.files;

    if (
      files.length === 0
    ) {

      return;
    }

    let loaded = 0;

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      saveImage(
        files[i],
        () => {

          loaded++;

          if (
            loaded === files.length
          ) {

            setRandomBackground();

            alert(
              `${files.length}枚追加しました`
            );
          }
        }
      );
    }
  }
);

function saveImage(
  file,
  callback
) {

  const reader =
    new FileReader();

  reader.onload =
    event => {

      const tx =
        db.transaction(
          "images",
          "readwrite"
        );

      const store =
        tx.objectStore(
          "images"
        );

      store.add({
        image:
          event.target.result
      });

      tx.oncomplete =
        () => {

          callback();
        };
    };

  reader.readAsDataURL(file);
}



/* ======================
   Background
====================== */

function setRandomBackground() {

  const tx =
    db.transaction(
      "images",
      "readonly"
    );

  const store =
    tx.objectStore(
      "images"
    );

  const req =
    store.getAll();

  req.onsuccess =
    () => {

      const images =
        req.result;

      if (
        images.length === 0
      ) {

        return;
      }

      const random =

        images[
          Math.floor(
            Math.random()
            * images.length
          )
        ];

      document.body.style.backgroundImage =
        `url(${random.image})`;

      document.body.style.backgroundSize =
        "cover";

      document.body.style.backgroundPosition =
        "center";
    };
}