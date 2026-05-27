const gallery =
  document.getElementById("gallery");

const selectAllButton =
  document.getElementById(
    "select-all"
  );

const clearSelectionButton =
  document.getElementById(
    "clear-selection"
  );

const deleteButton =
  document.getElementById(
    "delete-button"
  );

let images =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

let selected = [];

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

      drawGallery();
    };

    gallery.appendChild(item);
  });
}

selectAllButton.onclick = () => {

  selected = [];

  for (
    let i = 0;
    i < images.length;
    i++
  ) {

    selected.push(i);
  }

  drawGallery();
};

clearSelectionButton.onclick = () => {

  selected = [];

  drawGallery();
};

deleteButton.addEventListener(
  "click",
  () => {

    if (
      selected.length === 0
    ) {

      alert(
        "画像が選択されていません"
      );

      return;
    }

    images =
      images.filter(
        (_, index) =>
          !selected.includes(index)
      );

    saveImages();

    selected = [];

    drawGallery();

    alert("削除しました");
  }
);

drawGallery();