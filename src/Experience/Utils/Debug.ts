import GUI from "lil-gui";

import EventEmitter from "./EventEmitter.ts";

export default class Debug extends EventEmitter {
  ui?: GUI;
  helpersEnabled = false;

  constructor() {
    super();

    const isActive = window.location.hash === "#debug";

    if (!isActive) return;

    this.helpersEnabled = true;

    // Setup
    this.ui = new GUI({
      width: 400,
      title: "Christmas 2024 Challenge Debug Menu",
      closeFolders: true,
    });

    this.#setGeneralOptions();
  }

  #setGeneralOptions() {
    this.ui!.add(this, "toggleHelpers");
  }

  toggleHelpers() {
    this.helpersEnabled = !this.helpersEnabled;
    this.trigger("toggleHelpers");
  }
}
