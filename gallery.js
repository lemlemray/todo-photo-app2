const galleryList =
document.getElementById(
  "gallery-list"
);

const upload =
document.getElementById(
  "gallery-upload"
);

const deleteButton =
document.getElementById(
  "delete-button"
);

const selectAllButton =
document.getElementById(
  "select-all"
);





let backgrounds =
JSON.parse(
  localStorage.getItem(
    "backgrounds"
  )
) || [];



let selected = [];



drawGallery();





upload.onchange = (e)=>{

  const files =
  e.target.files;

  if(!files.length) return;



  let loaded = 0;



  for(let i=0;i<files.length;i++){

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



        drawGallery();

      }

    };



    reader.readAsDataURL(
      files[i]
    );

  }

};





function drawGallery(){

  galleryList.innerHTML = "";



  backgrounds.forEach((bg)=>{

    const item =
    document.createElement(
      "div"
    );

    item.className =
    "gallery-item";



    const img =
    document.createElement(
      "img"
    );

    img.src =
    bg.image;



    const check =
    document.createElement(
      "input"
    );

    check.type =
    "checkbox";



    check.onchange = ()=>{

      if(check.checked){

        selected.push(bg.id);

      }else{

        selected =
        selected.filter(
          id => id !== bg.id
        );

      }

    };



    item.appendChild(img);

    item.appendChild(check);



    galleryList.appendChild(item);

  });

}





selectAllButton.onclick = ()=>{

  selected =

  backgrounds.map(
    bg => bg.id
  );



  const checks =
  document.querySelectorAll(
    ".gallery-item input"
  );



  checks.forEach((c)=>{

    c.checked = true;

  });

};





deleteButton.onclick = ()=>{

  backgrounds =

  backgrounds.filter(

    bg =>

    !selected.includes(bg.id)

  );



  localStorage.setItem(

    "backgrounds",

    JSON.stringify(backgrounds)

  );



  selected = [];



  drawGallery();



  alert("削除しました");

};