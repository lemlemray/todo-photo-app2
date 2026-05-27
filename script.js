const taskInput = document.getElementById("task-input");

const addButton = document.getElementById("add-button");

const taskList = document.getElementById("task-list");

const imageInput = document.getElementById("image-input");



let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



tasks = tasks.filter(task => task && task.text);



saveTasks();

drawTasks();

setRandomBackground();



addButton.onclick = () => {

    const text = taskInput.value.trim();

    if (!text) return;



    tasks.push({

        text: text,

        completed: false
    });



    saveTasks();

    drawTasks();



    taskInput.value = "";
};



function drawTasks() {

    taskList.innerHTML = "";



    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task-item";



        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;



        checkbox.onchange = () => {

            tasks[index].completed = checkbox.checked;

            saveTasks();
        };



        const span = document.createElement("span");

        span.textContent = task.text;



        if (task.completed) {

            span.style.textDecoration = "line-through";

            span.style.opacity = "0.5";
        }



        const deleteButton = document.createElement("button");

        deleteButton.textContent = "削除";



        deleteButton.onclick = () => {

            tasks.splice(index, 1);

            saveTasks();

            drawTasks();
        };



        li.appendChild(checkbox);

        li.appendChild(span);

        li.appendChild(deleteButton);



        taskList.appendChild(li);
    });
}



function saveTasks() {

    localStorage.setItem(

        "tasks",

        JSON.stringify(tasks)
    );
}



imageInput.addEventListener("change", (e) => {

    const files = e.target.files;



    if (!files.length) return;



    let backgrounds = [];



    let loaded = 0;



    for (const file of files) {

        const reader = new FileReader();



        reader.onload = (event) => {

            backgrounds.push({

                image: event.target.result
            });



            loaded++;



            if (loaded === files.length) {

                localStorage.setItem(

                    "backgrounds",

                    JSON.stringify(backgrounds)
                );



                setRandomBackground();



                alert("写真を追加しました");
            }
        };



        reader.readAsDataURL(file);
    }
});



function setRandomBackground() {

    const backgrounds = JSON.parse(

        localStorage.getItem("backgrounds")

    ) || [];



    if (backgrounds.length === 0) {

        document.body.style.background = "black";

        return;
    }



    const random = backgrounds[0];



    document.body.style.backgroundImage =

        `url(${random.image})`;



    document.body.style.backgroundSize = "cover";

    document.body.style.backgroundPosition = "center";

    document.body.style.backgroundRepeat = "no-repeat";

    document.body.style.backgroundAttachment = "fixed";
}