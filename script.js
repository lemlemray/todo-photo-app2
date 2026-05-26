const images = [
  "images/S__4038781_0.jpg",
  "images/S__4038782_0.jpg",
  "images/S__4038783_0.jpg",
  "images/S__4038784_0.jpg"
];

const randomImage =
  images[Math.floor(Math.random() * images.length)];

document.getElementById("random-image").src = randomImage;

function addTask() {

  const input =
    document.getElementById("task-input");

  const text = input.value;

  if (text.trim() === "") return;

  const li = document.createElement("li");

  li.className = "task";

  li.innerHTML = `
    <input type="checkbox" class="check">
    <span>${text}</span>
  `;

  let startX = 0;

  li.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
  });

  li.addEventListener("touchend", e => {

    const endX = e.changedTouches[0].clientX;

    if (startX - endX > 100) {
      li.classList.add("remove");

      setTimeout(() => {
        li.remove();
      }, 300);
    }

  });

  document
    .getElementById("todo-list")
    .appendChild(li);

  input.value = "";
}