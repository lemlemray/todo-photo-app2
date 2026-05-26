const gallery =
  document.getElementById("gallery");

const deleteSelectedButton =
  document.getElementById("delete-selected");

let allImages =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

showGallery();

function showGallery() {

  gallery.innerHTML = "";

  allImages.forEach((image, index) => {

    const div =
      document.createElement("div");

    div.className = "image-item";

    const checkbox =
      document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.className =
      "image-check";

    checkbox.dataset.index = index;

    const img =
      document.createElement("img");

    img.src = image;

    img.className = "gallery-image";

    div.appendChild(checkbox);

    div.appendChild(img);

    gallery.appendChild(div);
  });
}

deleteSelectedButton.addEventListener(
  "click",
  () => {

    const checked =
      document.querySelectorAll(
        ".image-check:checked"
      );

    const indexes = [];

    checked.forEach(box => {

      indexes.push(
        Number(box.dataset.index)
      );
    });

    allImages =
      allImages.filter(
        (_, index) =>
          !indexes.includes(index)
      );

    localStorage.setItem(
      "allImages",
      JSON.stringify(allImages)
    );

    showGallery();
  }
);