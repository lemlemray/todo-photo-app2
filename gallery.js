const gallery =
  document.getElementById(
    "gallery"
  );

const selectAllButton =
  document.getElementById(
    "select-all"
  );

const deleteButton =
  document.getElementById(
    "delete-button"
  );

let db;

let selected = [];

const request =
  indexedDB.open(
    "PhotoDB",
    1
  );

request.onsuccess =
  event => {

    db =
      event.target.result;

    drawGallery();
  };

function drawGallery() {

  gallery.innerHTML =
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

      images.forEach(
        imageData => {

          const item =
            document.createElement(
              "div"
            );

          item.className =
            "gallery-item";

          const img =
            document.createElement(
              "img"
            );

          img.src =
            imageData.image;

          img.className =
            "gallery-image";

          item.onclick =
            () => {

              if (
                selected.includes(
                  imageData.id
                )
              ) {

                selected =
                  selected.filter(
                    id =>
                      id !==
                      imageData.id
                  );

                item.classList.remove(
                  "selected"
                );

              } else {

                selected.push(
                  imageData.id
                );

                item.classList.add(
                  "selected"
                );
              }
            };

          item.appendChild(
            img
          );

          gallery.appendChild(
            item
          );
        } );
    };
}

selectAllButton.onclick =
  () => {

    selected = [];

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

        selected =
          req.result.map(
            image =>
              image.id
          );

        drawGallery();
      };
};

deleteButton.onclick =
  () => {

    const tx =
      db.transaction(
        "images",
        "readwrite"
      );

    const store =
      tx.objectStore(
        "images"
      );

    selected.forEach(
      id => {

        store.delete(id);
      }
    );

    tx.oncomplete =
      () => {

        selected = [];

        drawGallery();

        alert(
          "削除完了"
        );
      };
};