const gallery =
  document.getElementById("gallery");

const deleteButton =
  document.getElementById(
    "delete-selected"
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