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

renderGallery();

function renderGallery() {

  gallery.innerHTML = "";

  allImages.forEach((image, index) => {

    const item =
      document.createElement("div");

    item.className =
      "image-item";

    if (
      selected.includes(index)
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
        selected.includes(index)
      ) {

        selected =
          selected.filter(
            i => i !== index
          );

      } else {

        selected.push(index);
      }

      renderGallery();
    };

    gallery.appendChild(item);
  });
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

  renderGallery();
};

clearSelectionButton.onclick = () => {

  selected = [];

  renderGallery();
};

deleteSelectedButton.onclick = () => {

  if (selected.length === 0) {

    return;
  }

  selected.sort((a, b) => b - a);

  selected.forEach(index => {

    allImages.splice(index, 1);

  });

  localStorage.setItem(
    "allImages",
    JSON.stringify(allImages)
  );

  selected = [];

  renderGallery();
};