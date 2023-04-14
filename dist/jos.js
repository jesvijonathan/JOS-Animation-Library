class jos {
  default_once = !1;
  default_animation = "fade";
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_passive = !0;
  version = "0.5 (Beta)";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  debug = !1;
  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  boxes = document.querySelectorAll(".jos");
  constructor() {}
  debugLogger() {
    console.log(
      "JOS: Javascript Object Scroll Animation Library\n" +
        ("Version: " + this.version + "\n") +
        ("Author: " + this.author + "\n") +
        ("Github: " + this.github + "\n\n")
    );
    console.log(
      "JOS Params:\n" +
        ("Global Animation: " + this.default_animation + "\n") +
        ("Global Duration: " + this.default_duration + "\n") +
        ("Global Timing Function: " + this.default_timingFunction + "\n") +
        ("Global Once: " + this.default_once + "\n") +
        ("Global Intersection Ratio: " +
          this.default_intersectionRatio +
          "\n") +
        ("Global Threshold: " + this.default_threshold + "\n") +
        ("Global Root Margin: " + this.default_rootMargin + "\n") +
        ("Passive: " + this.default_passive + "\n") +
        ("Debug Mode: " + this.debug + "\n")
    );
    console.log("\nDebug :\n");
  }
  callbackRouter = (entries, observer) => {
    let entry = entries[0];
    let target = entry.target;
    let target_jos_animation = target.dataset.jos_animation;
    console.log(
      entry.intersectionRatio + " | " + this.default_intersectionRatio
    );
    if (entry.intersectionRatio > this.default_intersectionRatio) {
      if (target_jos_animation) {
        target.classList.remove("jos-" + target_jos_animation);
        if (target.dataset.jos_invoke != undefined) {
          window[target.dataset.jos_invoke](target);
        }
        if (target.dataset.jos_once == "true") {
          observer.unobserve(target);
        }
      }
    } else {
      target.classList.add("jos-" + target_jos_animation);
    }
  };
  animationInit() {
    this.boxes.forEach((box) => {
      let object_default_once = box.dataset.jos_once;
      let object_default_animation = box.dataset.jos_animation;
      let object_default_timingFunction = box.dataset.jos_timingFunction;
      let object_default_duration = box.dataset.jos_duration;
      if (object_default_once != undefined) {
        box.setAttribute("data-jos_once", object_default_once);
      }
      if (object_default_animation != undefined) {
        box.setAttribute("data-jos_animation", object_default_animation);
      }
      if (object_default_timingFunction != undefined) {
        box.setAttribute(
          "data-jos_timingFunction",
          object_default_timingFunction
        );
      }
      if (object_default_duration != undefined) {
        box.setAttribute("data-jos_duration", object_default_duration);
      }
      box.classList.add("jos-" + object_default_animation);
      this.observer = new IntersectionObserver(this.callbackRouter, {
        rootMargin: this.default_rootMargin,
        threshold: this.default_threshold,
        passive: this.default_passive,
      });
      this.observer.observe(box);
    });
  }
  init(options) {
    if (options) {
      if (options.once != undefined) {
        this.default_once = options.once;
      }
      if (options.animation != undefined) {
        this.default_animation = options.animation;
      }
      if (options.timingFunction != undefined) {
        this.default_timingFunction = options.timingFunction;
      }
      if (options.threshold != undefined) {
        this.default_threshold = options.threshold;
      }
      if (options.intersectionRatio != undefined) {
        console.log("intersectionRatio is deprecated");
        this.default_intersectionRatio =
          options.intersectionRatio == 1 ? 0.99 : options.intersectionRatio;
      } else {
        this.default_intersectionRatio =
          this.default_threshold == 1 ? 0.99 : this.default_threshold;
      }
      if (options.duration != undefined) {
        this.default_duration = options.duration;
      }
      if (options.rootMargin != undefined) {
        this.default_rootMargin = options.rootMargin;
      } else {
        if (
          options.rootMarginTop != undefined ||
          options.rootMarginBottom != undefined
        ) {
          this.default_rootMargin =
            (options.rootMarginTop != undefined
              ? options.rootMarginTop
              : "-10%") +
            " 0% " +
            (options.rootMarginBottom != undefined
              ? options.rootMarginBottom
              : "-40%") +
            " 0%";
        }
      }
      if (options.debugMode == !0) {
        this.debug = !0;
        this.debugLogger();
      }
    }
    this.jos_stylesheet.insertRule(
      ".jos {" +
        ("transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          ";") +
        "}"
    );
    if (options.disable == !0) {
      this.rst();
      console.log("JOS Disabled");
    } else {
      console.log("JOS Enabled");
      this.animationInit();
    }
  }
  rst = () => {
    this.boxes.forEach((box) => {
      box.classList.remove("jos-" + box.dataset.jos_animation);
    });
    this.jos_stylesheet.insertRule(
      ".jos {" +
        ("transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          ";") +
        "}"
    );
    this.observer.disconnect();
  };
  reset() {
    this.rst();
    this.animationInit();
    return "JOS Reset";
  }
  reset2() {
    this.rst();
    return "JOS Reset Retaining Final State";
  }
  disable() {
    this.rst();
    return "JOS Disabled";
  }
}
