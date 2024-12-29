import EventEmitter from "./EventEmitter.ts";

export default class Time extends EventEmitter {
  start: number;
  current: number;
  elapsed: number;
  delta: number;

  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.elapsed = 0;
    this.delta = 16; // Not putting in 0 to avoid unexpected bugs. 16 is the rough value of the delta when the user has a 60Hz screen.

    window.requestAnimationFrame(() => {
      this.#tick();
    });
  }

  #tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;

    this.trigger("tick");

    window.requestAnimationFrame(() => {
      this.#tick();
    });
  }
}
