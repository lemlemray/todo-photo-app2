const gallery =
  document.getElementById("gallery");

const selectAllButton =
  document.getElementById(
    "select-all"
  );

const clearAllButton =
  document.getElementById(
    "clear-all"
  );

const deleteButton =
  document.getElementById(
    "delete-button"
  );

let images =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

let selectedImages = [];

function saveImages() {

  localStorage.setItem(
    "allImages",
    JSON.stringify(images)
  );
}

function drawGallery() {

  gallery.innerHTML = "";

  images.forEach((image, index) => {

    const item =
      document.createElement("div");

    item.className =
      "gallery-item";

    const img =
      document.createElement("img");

    img.src = image;

    img.className =
      "gallery-image";

    if (
      selectedImages.includes(index)
    ) {

      item.classList.add(
        "selected"
      );
    }

    item.onclick = () => {

      if (
        selectedImages.includes(index)
      ) {

        selectedImages =
          selectedImages.filter(
            i => i !== index
          );

      } else {

        selectedImages.push(index);
      }

      drawGallery();
    };

    item.appendChild(img);

    gallery.appendChild(item);
  });
}

selectAllButton.onclick = () => {

  selectedImages = [];

  for (
    let i = 0;
    i < images.length;
    i++
  ) {

    selectedImages.push(i);
  }

  drawGallery();
};

clearAllButton.onclick = () => {

  selectedImages = [];

  drawGallery();
};

deleteButton.onclick = () => {

  images =
    images.filter(
      (_, index) =>
        !selectedImages.includes(index)
    );

  saveImages();

  selectedImages = [];

  drawGallery();
};

drawGallery();