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

  const gallery =
    document.getElementById(
      "gallery"
    );

  gallery.innerHTML = "";

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
        image => {

          const card =
            document.createElement(
              "div"
            );

          card.className =
            "image-card";



          const img =
            document.createElement(
              "img"
            );

          img.src =
            image.image;



          const check =
            document.createElement(
              "input"
            );

          check.type =
            "checkbox";

          check.className =
            "image-check";



          check.onchange =
            () => {

              if (
                check.checked
              ) {

                selected.push(
                  image.id
                );

              } else {

                selected =
                  selected.filter(
                    id =>
                      id !== image.id
                  );
              }
            };



          card.appendChild(
            img
          );

          card.appendChild(
            check
          );

          gallery.appendChild(
            card
          );
        }
      );
    };
}



/* =====================
   全選択
===================== */

const selectAllButton =
  document.getElementById(
    "select-all-button"
  );

selectAllButton.onclick =
  () => {

    selected = [];

    const checks =
      document.querySelectorAll(
        ".image-check"
      );

    checks.forEach(
      check => {

        check.checked = true;

        const id =
          Number(
            check.parentElement.dataset.id
          );
      }
    );

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
      };
  };



/* =====================
   削除
===================== */

const deleteButton =
  document.getElementById(
    "delete-button"
  );

deleteButton.onclick =
  () => {

    if (
      selected.length === 0
    ) {

      alert(
        "画像を選択してください"
      );

      return;
    }

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

        alert(
          "削除完了"
        );

        selected = [];

        drawGallery();
      };
  };