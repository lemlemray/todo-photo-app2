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

  allImages.forEach((_, index) => {

    selected.push(index);

  });

  renderGallery();
};

clearSelectionButton.onclick = () => {

  selected = [];

  renderGallery();
};

deleteSelectedButton.onclick = () => {

  allImages =
    allImages.filter(
      (_, index) =>
        !selected.includes(index)
    );

  localStorage.setItem(
    "allImages",
    JSON.stringify(allImages)
  );

  selected = [];

  renderGallery();
};