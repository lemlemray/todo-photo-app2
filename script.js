const input =
document.getElementById("input");

const button =
document.getElementById("button");

const list =
document.getElementById("list");

const imageInput =
document.getElementById("image-input");



let todos =
JSON.parse(
  localStorage.getItem("todos")
) || [];



drawTodos();

setRandomBackground();





button.onclick = () => {

  const text =
  input.value.trim();

  if(!text) return;



  todos.push({

    id:Date.now(),

    text:text,

    completed:false

  });



  saveTodos();

  drawTodos();

  input.value = "";
};





function drawTodos(){

  list.innerHTML = "";



  todos.forEach((todo)=>{

    const li =
    document.createElement("li");

    li.className =
    "todo-item";



    const checkbox =
    document.createElement("input");

    checkbox.type =
    "checkbox";

    checkbox.checked =
    todo.completed;



    checkbox.onchange = ()=>{

      todo.completed =
      checkbox.checked;

      saveTodos();

      drawTodos();
    };



    const span =
    document.createElement("span");

    span.textContent =
    todo.text;



    if(todo.completed){

      span.style.textDecoration =
      "line-through";

      span.style.opacity =
      "0.5";
    }



    const del =
    document.createElement("button");

    del.textContent =
    "削除";



    del.onclick = ()=>{

      todos =
      todos.filter(
        t => t.id !== todo.id
      );

      saveTodos();

      drawTodos();
    };



    li.appendChild(checkbox);

    li.appendChild(span);

    li.appendChild(del);



    list.appendChild(li);

  });

}





function saveTodos(){

  localStorage.setItem(
    "todos",
    JSON.stringify(todos)
  );
}





imageInput.onchange = (e)=>{

  const files =
  e.target.files;

  if(!files.length) return;



  let backgrounds =
  JSON.parse(
    localStorage.getItem("backgrounds")
  ) || [];



  let loaded = 0;



  for(let i=0;i<files.length;i++){

    const file =
    files[i];



    const reader =
    new FileReader();



    reader.onload = ()=>{

      backgrounds.push({

        id:Date.now()+i,

        image:reader.result

      });



      loaded++;



      if(
        loaded === files.length
      ){

        localStorage.setItem(

          "backgrounds",

          JSON.stringify(backgrounds)

        );



        alert(
          ${files.length}枚追加しました
        );



        setRandomBackground();
      }
    };



    reader.readAsDataURL(file);

  }

};





function setRandomBackground(){

  const backgrounds =
  JSON.parse(

    localStorage.getItem(
      "backgrounds"
    )

  ) || [];



  if(backgrounds.length === 0){

    document.body.style.backgroundColor =
    "black";

    return;
  }



  const random =

  backgrounds[
    Math.floor(
      Math.random()
      * backgrounds.length
    )
  ];



  document.body.style.backgroundImage =

  `url(${random.image})`;



  document.body.style.backgroundSize =
  "cover";

  document.body.style.backgroundPosition =
  "center";

  document.body.style.backgroundRepeat =
  "no-repeat";

  document.body.style.backgroundAttachment =
  "fixed";

}