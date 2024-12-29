import Experience from "./Experience/Experience.ts";

const canvas = document.querySelector("canvas.webgl") as HTMLCanvasElement;
const button = document.querySelector("button")!;
const p = document.querySelector("p")!;

button.addEventListener("click", () => {
  button.remove();
  p.remove();

  document.body.style.animation = "shiftColor 3s forwards";
  document.body.style.animationDelay = "1s";

  canvas.style.animation = "fadeIn 3s forwards";
  canvas.style.animationDelay = "2s";

  new Experience(canvas);
});
