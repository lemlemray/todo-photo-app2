let allImages =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

showGallery();

function showGallery() {

  const gallery =
    document.getElementById("gallery");

  gallery.innerHTML = "";

  allImages.forEach((image, index) => {

    const div =
      document.createElement("div");

    div.className = "image-item";

    const img =
      document.createElement("img");

    img.src = image;

    const button =
      document.createElement("button");

    button.className =
      "delete-image";

    button.textContent = "削除";

    button.onclick = () => {

      allImages.splice(index, 1);

      localStorage.setItem(
        "allImages",
        JSON.stringify(allImages)
      );

      showGallery();
    };

    div.appendChild(img);

    div.appendChild(button);

    gallery.appendChild(div);
  });
}