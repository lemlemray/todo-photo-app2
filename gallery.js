const gallery =
  document.getElementById("gallery");

const deleteSelectedButton =
  document.getElementById(
    "delete-selected"
  );

const selectAllButton =
  document.getElementById(
    "select-all"
  );

const clearSelectionButton =
  document.getElementById(
    "clear-selection"
  );

let allImages =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

let selected = [];

draw();

function draw() {

  gallery.innerHTML = "";

  for (
    let i = 0;
    i < allImages.length;
    i++
  ) {

    const image =
      allImages[i];

    const item =
      document.createElement("div");

    item.className =
      "image-item";

    if (
      selected.includes(i)
    ) {

      item.classList.add(
        "selected"
      );
    }

    const img =
      document.createElement("img");

    img.src = image;

    img.className =
      "gallery-image";

    item.appendChild(img);

    item.onclick = () => {

      if (
        selected.includes(i)
      ) {

        selected =
          selected.filter(
            index => index !== i
          );

      } else {

        selected.push(i);
      }

      draw();
    };

    gallery.appendChild(item);
  }
}

selectAllButton.onclick = () => {

  selected = [];

  for (
    let i = 0;
    i < allImages.length;
    i++
  ) {

    selected.push(i);
  }

  draw();
};

clearSelectionButton.onclick = () => {

  selected = [];

  draw();
};

deleteSelectedButton.onclick = () => {

  const newImages = [];

  for (
    let i = 0;
    i < allImages.length;
    i++
  ) {

    if (
      !selected.includes(i)
    ) {

      newImages.push(
        allImages[i]
      );
    }
  }

  allImages = newImages;

  localStorage.setItem(
    "allImages",
    JSON.stringify(allImages)
  );

  selected = [];

  draw();
};