const imageInput =
  document.getElementById(
    "image-input"
  );

const photoArea =
  document.getElementById(
    "photo-area"
  );

let db;

const request =
  indexedDB.open(
    "PhotoDB",
    1
  );

request.onupgradeneeded =
  event => {

    db =
      event.target.result;

    db.createObjectStore(
      "images",
      {
        keyPath: "id",
        autoIncrement: true
      }
    );
  };

request.onsuccess =
  event => {

    db =
      event.target.result;

    showRandomImage();
  };

imageInput.addEventListener(
  "change",
  event => {

    const files =
      event.target.files;

    if (
      files.length === 0
    ) {

      return;
    }

    for (
      let i = 0;
      i < files.length;
      i++
    ) {

      saveImage(
        files[i]
      );
    }
  }
);

function saveImage(file) {

  const reader =
    new FileReader();

  reader.onload =
    event => {

      const tx =
        db.transaction(
          "images",
          "readwrite"
        );

      const store =
        tx.objectStore(
          "images"
        );

      store.add({
        image:
          event.target.result
      });

      tx.oncomplete =
        () => {

          alert(
            "画像追加完了"
          );

          showRandomImage();
        };
    };

  reader.readAsDataURL(file);
}

function showRandomImage() {

  photoArea.innerHTML =
    "";

  const tx =
    db.transaction(
      "images",
      "readonly"
    );

  const store =
    tx.objectStore(
      "images"
    );

  const req =
    store.getAll();

  req.onsuccess =
    () => {

      const images =
        req.result;

      if (
        images.length === 0
      ) {

        return;
      }

      const random =

        images[
          Math.floor(
            Math.random()
            * images.length
          )
        ];

      const img =
        document.createElement(
          "img"
        );

      img.src =
        random.image;

      img.className =
        "main-photo";

      photoArea.appendChild(
        img
      );
    };
}