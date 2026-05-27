const input = document.querySelector("#input");

const button = document.querySelector("#button");

const list = document.querySelector("#list");

const imageInput = document.querySelector("#image-input");



let todos =
    JSON.parse(localStorage.getItem("todos")) || [];



drawTodos();

setRandomBackground();





button.onclick = () => {

    const text = input.value;



    if (text === "") return;



    const todo = {

        id: Date.now(),

        text: text,

        completed: false

    };



    todos.push(todo);



    saveTodos();

    drawTodos();



    input.value = "";
};





function drawTodos() {

    list.innerHTML = "";



    todos.forEach((todo) => {

        const li = document.createElement("li");



        li.className = "todo-item";



        const check = document.createElement("input");

        check.type = "checkbox";

        check.checked = todo.completed;



        check.onchange = () => {

            todo.completed = check.checked;

            saveTodos();

        };



        const span = document.createElement("span");

        span.textContent = todo.text;



        if (todo.completed) {

            span.style.textDecoration = "line-through";

            span.style.opacity = "0.5";

        }



        const del = document.createElement("button");

        del.textContent = "削除";



        del.onclick = () => {

            todos = todos.filter((t) => t.id !== todo.id);

            saveTodos();

            drawTodos();

        };



        li.appendChild(check);

        li.appendChild(span);

        li.appendChild(del);



        list.appendChild(li);
    });
}





function saveTodos() {

    localStorage.setItem(
        "todos",
        JSON.stringify(todos)
    );
}





imageInput.onchange = (e) => {

    const files = e.target.files;



    if (!files.length) return;



    let backgrounds =
        JSON.parse(localStorage.getItem("backgrounds")) || [];



    let loaded = 0;



    for (let i = 0; i < files.length; i++) {

        const file = files[i];



        const reader = new FileReader();



        reader.onload = () => {

            backgrounds.push({

                id: Date.now() + i,

                image: reader.result

            });



            loaded++;



            if (loaded === files.length) {

                localStorage.setItem(
                    "backgrounds",
                    JSON.stringify(backgrounds)
                );



                alert("写真を追加しました");



                setRandomBackground();
            }
        };



        reader.readAsDataURL(file);
    }
};





function setRandomBackground() {

    const backgrounds =
        JSON.parse(localStorage.getItem("backgrounds")) || [];



    console.log(backgrounds);



    if (backgrounds.length === 0) {

        document.body.style.backgroundColor = "black";

        return;
    }



    const random =
        backgrounds[
            Math.floor(
                Math.random() * backgrounds.length
            )
        ];



    if (!random.image) {

        console.log("画像データなし");

        return;
    }



    document.body.style.backgroundImage =
        `url("${random.image}")`;



    document.body.style.backgroundSize = "cover";

    document.body.style.backgroundPosition = "center";

    document.body.style.backgroundRepeat = "no-repeat";

    document.body.style.backgroundAttachment = "fixed";
}