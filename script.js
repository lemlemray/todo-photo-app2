let db;

const request =
indexedDB.open("TodoPhotoAppDB", 1);

request.onupgradeneeded = (event) => {

    db = event.target.result;

    if (!db.objectStoreNames.contains("tasks")) {

        db.createObjectStore("tasks", {
            keyPath: "id",
            autoIncrement: true
        });
    }

    if (!db.objectStoreNames.contains("photos")) {

        db.createObjectStore("photos", {
            keyPath: "id",
            autoIncrement: true
        });
    }
};

request.onsuccess = (event) => {

    db = event.target.result;

    loadTasks();

    setRandomBackground();
};

const taskInput =
document.getElementById("task-input");

const addButton =
document.getElementById("add-button");

const taskList =
document.getElementById("task-list");

addButton.onclick = () => {

    const text =
    taskInput.value.trim();

    if (text === "") return;

    const transaction =
    db.transaction(["tasks"], "readwrite");

    const store =
    transaction.objectStore("tasks");

    store.add({
        text: text,
        completed: false
    });

    transaction.oncomplete = () => {

        taskInput.value = "";

        loadTasks();
    };
};

function loadTasks() {

    taskList.innerHTML = "";

    const transaction =
    db.transaction(["tasks"], "readonly");

    const store =
    transaction.objectStore("tasks");

    const request =
    store.getAll();

    request.onsuccess = () => {

        const tasks =
        request.result;

        tasks.forEach((task) => {

            const li =
            document.createElement("li");

            li.className =
            "task-item";

            const checkbox =
            document.createElement("input");

            checkbox.type =
            "checkbox";

            checkbox.checked =
            task.completed;

            checkbox.onchange = () => {

                const transaction =
                db.transaction(["tasks"], "readwrite");

                const store =
                transaction.objectStore("tasks");

                task.completed =
                checkbox.checked;

                store.put(task);
            };

            const span =
            document.createElement("span");

            span.textContent =
            task.text;

            const deleteButton =
            document.createElement("button");

            deleteButton.textContent =
            "削除";

            deleteButton.onclick = () => {

                const transaction =
                db.transaction(["tasks"], "readwrite");

                const store =
                transaction.objectStore("tasks");

                store.delete(task.id);

                transaction.oncomplete = () => {

                    loadTasks();
                };
            };

            li.appendChild(checkbox);

            li.appendChild(span);

            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });
    };
}

function setRandomBackground() {

    const transaction =
    db.transaction(["photos"], "readonly");

    const store =
    transaction.objectStore("photos");

    const request =
    store.getAll();

    request.onsuccess = () => {

        const photos =
        request.result;

        if (photos.length === 0) {

            document.body.style.background =
            "#111";

            return;
        }

        const random =
        photos[
            Math.floor(
                Math.random() * photos.length
            )
        ];

        document.body.style.backgroundImage =
        `url(${random.image})`;

        document.body.style.backgroundSize =
        "cover";

        document.body.style.backgroundRepeat =
        "no-repeat";

        document.body.style.backgroundPosition =
        "center";

        document.body.style.backgroundAttachment =
        "fixed";
    };
}