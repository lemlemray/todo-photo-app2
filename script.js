const imageInput =
  document.getElementById(
    "image-input"
  );

const photoArea =
  document.getElementById(
    "photo-area"
  );

let allImages =
  JSON.parse(
    localStorage.getItem("allImages")
  ) || [];

showRandomImage();

imageInput.addEventListener(
  "change",
  event => {

    const files =
      event.target.files;

    if (!files.length) {

      return;
    }

    let loaded = 0;

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      const file = files[i];

      const reader =
        new FileReader();

      reader.onload = e => {

        allImages.push(
          e.target.result
        );

        loaded++;

        if (
          loaded === files.length
        ) {

          localStorage.setItem(
            "allImages",
            JSON.stringify(allImages)
          );

          showRandomImage();

          alert(
            "画像を追加しました"
          );
        }
      };

      reader.readAsDataURL(file);
    }
  }
);

function showRandomImage() {

  photoArea.innerHTML = "";

  if (
    allImages.length === 0
  ) {

    return;
  }

  const randomImage =

    allImages[
      Math.floor(
        Math.random()
        * allImages.length
      )
    ];

  const img =
    document.createElement("img");

  img.src = randomImage;

  img.className =
    "main-photo";

  photoArea.appendChild(img);
}