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

showGallery();

function showGallery() {

  gallery.innerHTML = "";

  allImages.forEach((image, index) => {

    const div =
      document.createElement("div");

    div.className = "image-item";

    if (
      selectedIndexes.includes(index)
    ) {

      div.classList.add("selected");
    }

    const img =
      document.createElement("img");

    img.src = image;

    img.className =
      "gallery-image";

    div.appendChild(img);

    gallery.appendChild(div);

    div.addEventListener(
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

        showGallery();
      }
    );
  });
}

selectAllButton.addEventListener(
  "click",
  () => {

    selectedIndexes =
      allImages.map(
        (_, index) => index
      );

    showGallery();
  }
);

clearButton.addEventListener(
  "click",
  () => {

    selectedIndexes = [];

    showGallery();
  }
);

deleteButton.addEventListener(
  "click",
  () => {

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

    showGallery();
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

    showGallery();
  }
);