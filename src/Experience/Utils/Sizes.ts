import EventEmitter from "./EventEmitter.ts";

export default class Sizes extends EventEmitter {
  width: number;
  height: number;
  pixelRatio: number;

  constructor() {
    super();

    this.#resize();

    window.addEventListener("resize", () => {
      this.#resize();
      this.trigger("resize");
    });
  }

  #resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2); // Allow a maximum of 2 pixel ratio for performance purposes
  }
}
