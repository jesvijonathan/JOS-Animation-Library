// try {
//   document.querySelector("#image1"), document.querySelector("#image2");
// } catch (r) {
//   console.log("Error: " + r);
// }
const image1 = document.querySelector("#image1"),
  image2 = document.querySelector("#image2"),
  image5 = document.querySelector("#image5"),
  cursor = document.querySelector("#cursor"),
  cursor_border = document.querySelector("#cursor_border"),
  cursor_circle = document.querySelector("#cursor_circle");
document.addEventListener("mousemove", (r) => {
  let e = r.clientX,
    t = r.clientY;
  (cursor.style.transform = `translate3d(${e - 20}px, ${t - 20}px, 0)`),
    (cursor.style.transform = `translate3d(${e - 20}px, ${t - 20}px, 0)`);
  let c = t / window.innerHeight,
    s = e / window.innerHeight;
  (image1.style.transform = `translate(${-2 * s}vw, ${1 * c}vw)`),
    (image1.style.transform = `scale(1) translate(${-80 * s}px, ${20 * c}px)`),
    (image2.style.transform = `scale(1.5) rotate(${-14 * s}deg) translate(${
      70 * s
    }px, ${180 * c}px)`),
    (image5.style.transform = `translate(${-7 * s}px, ${-7 * c}px)`),
    $(".link_cur").hover(
      function () {
        c <= 0.5
          ? (cursor_circle.style.transform = "scale(7) translate(10px, 10px)")
          : (cursor_circle.style.transform = "scale(7) translate(10px, -10px)"),
          (cursor_circle.innerHTML = $(this).data("text"));
      },
      function () {
        (cursor_circle.style.transform = "scale(1)"),
          (cursor_circle.innerHTML = "");
      }
    ),
    document.addEventListener("mousedown", function () {
      cursor_circle.classList.add("cursor_circle_click"),
        (cursor_border.style.background = "white");
    }),
    document.addEventListener("mouseup", function () {
      cursor_circle.classList.remove("cursor_circle_click"),
        (cursor_border.style.background = "transparent");
    });
}),
  document.addEventListener("mouseout", () => {
    let r = event.clientX,
      e = event.clientY;
    (e <= 0 || r <= 0 || r >= window.innerWidth || e >= window.innerHeight) &&
      (cursor.style.display = "none");
  }),
  document.addEventListener("mouseenter", () => {
    cursor.style.display = "block";
  });
