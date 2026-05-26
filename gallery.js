const gallery =
  document.getElementById("gallery");

const deleteButton =
  document.getElementById(
    "delete-selected"
  );

const deleteAllButton =
  document.getElementById(
    "delete-all"
  );

const selectAllButton =
  document.getElementById(
    "select-all"
  );

const clearButton =
  document.getElementById(
    "clear-selection"
  );

let allImages =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

let selectedIndexes = [];

renderGallery();

function renderGallery() {

  gallery.innerHTML = "";

  allImages.forEach((image, index) => {

    const item =
      document.createElement("div");

    item.className = "image-item";

    if (
      selectedIndexes.includes(index)
    ) {

      item.classList.add("selected");
    }

    const img =
      document.createElement("img");

    img.src = image;

    img.className =
      "gallery-image";

    item.appendChild(img);

    item.addEventListener(
      "click",
      () => {

        if (
          selectedIndexes.includes(index)
        ) {

          selectedIndexes =
            selectedIndexes.filter(
              i => i !== index
            );

        } else {

          selectedIndexes.push(index);
        }

        renderGallery();
      }
    );

    gallery.appendChild(item);
  });
}

selectAllButton.addEventListener(
  "click",
  () => {

    selectedIndexes =
      allImages.map(
        (_, index) => index
      );

    renderGallery();
  }
);

clearButton.addEventListener(
  "click",
  () => {

    selectedIndexes = [];

    renderGallery();
  }
);

deleteButton.addEventListener(
  "click",
  () => {

    if (
      selectedIndexes.length === 0
    ) return;

    allImages =
      allImages.filter(
        (_, index) =>
          !selectedIndexes.includes(index)
      );

    localStorage.setItem(
      "allImages",
      JSON.stringify(allImages)
    );

    selectedIndexes = [];

    renderGallery();
  }
);

deleteAllButton.addEventListener(
  "click",
  () => {

    const ok =
      confirm(
        "本当にすべて削除しますか？"
      );

    if (!ok) return;

    allImages = [];

    localStorage.setItem(
      "allImages",
      JSON.stringify(allImages)
    );

    selectedIndexes = [];

    renderGallery();
  }
);