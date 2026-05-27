const taskInput =
  document.getElementById(
    "task-input"
  );

const addButton =
  document.getElementById(
    "add-button"
  );

const taskList =
  document.getElementById(
    "task-list"
  );

const imageInput =
  document.getElementById(
    "image-input"
  );

const photoArea =
  document.getElementById(
    "photo-area"
  );



/* =========================
   Todo
========================= */

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

  taskList.innerHTML = "";

  tasks.forEach(
    (task, index) => {

      const div =
        document.createElement(
          "div"
        );

      div.className =
        "task-item";

      const text =
        document.createElement(
          "span"
        );

      text.innerText =
        task;

      const deleteButton =
        document.createElement(
          "button"
        );

      deleteButton.innerText =
        "削除";

      deleteButton.onclick =
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

      div.appendChild(text);

      div.appendChild(
        deleteButton
      );

      taskList.appendChild(
        div
      );
    }
  );
}



/* =========================
   IndexedDB
========================= */

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

    showRandomImage();
  };



/* =========================
   Upload
========================= */

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

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      saveImage(
        files[i]
      );
    }
  }
);

function saveImage(file) {

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

          showRandomImage();

          alert(
            "画像追加完了"
          );
        };
    };

  reader.readAsDataURL(file);
}



/* =========================
   Random Image
========================= */

function showRandomImage() {

  photoArea.innerHTML =
    "";

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

      const img =
        document.createElement(
          "img"
        );

      img.src =
        random.image;

      img.className =
        "main-photo";

      photoArea.appendChild(
        img
      );
    };
}