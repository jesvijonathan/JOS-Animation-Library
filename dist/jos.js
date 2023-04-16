class jos {
  default_once = false;
  default_animation = "fade";
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_passive = true;

  version = "0.5 (Beta)";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  debug = false;

  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;

  boxes = document.querySelectorAll(".jos");

  constructor() {}

  // refer tmp.js

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

  // animationInvoker(target, state) {
  //   let target_jos_animation = target.dataset.jos_animation;
  //   console.log("jos-" + target_jos_animation);

  //   if (state) {
  //   } else {
  //   }
  // }

  callbackRouter = (entries, observer) => {
    let entry = entries[0];
    let target = entry.target;

    // console.log(target);
    let target_jos_animation = target.dataset.jos_animation;
    console.log(
      entry.intersectionRatio + " | " + this.default_intersectionRatio
    );
    if (entry.intersectionRatio > this.default_intersectionRatio) {
      // console.log("jos-" + target_jos_animation);

      if (target_jos_animation) {
        // console.log("Animation-Triggered");
        target.classList.remove("jos-" + target_jos_animation);

        if (target.dataset.jos_invoke != undefined) {
          window[target.dataset.jos_invoke](target);
        }
        if (target.dataset.jos_once == "true") {
          // target.classList.remove("jos");
          // console.log("Removed-Observer");
          observer.unobserve(target);
        }
      }
    } else {
      // console.log("Animation-Removed");
      target.classList.add("jos-" + target_jos_animation);

      if (target.dataset.jos_invoke_out != undefined) {
        window[target.dataset.jos_invoke_out](target);
      }
      // console.log("jos-" + target_jos_animation);
    }
  };

  animationInit() {
    this.boxes.forEach((box) => {
      // observer.observe(box);;

      let object_default_once = box.dataset.jos_once;
      let object_default_animation = box.dataset.jos_animation;
      let object_default_timingFunction = box.dataset.jos_timingFunction;
      let object_default_duration = box.dataset.jos_duration;

      if (object_default_once != undefined) {
        //object_default_once = this.default_once;
        box.setAttribute("data-jos_once", object_default_once);
      }
      if (object_default_animation != undefined) {
        //object_default_animation = this.default_animation;
        box.setAttribute("data-jos_animation", object_default_animation);
      } else {
        box.setAttribute("data-jos_animation", this.default_animation);
      }
      if (object_default_timingFunction != undefined) {
        //object_default_timingFunction = this.default_timingFunction;
        box.setAttribute(
          "data-jos_timingFunction",
          object_default_timingFunction
        );
      }
      if (object_default_duration != undefined) {
        //object_default_duration = this.default_duration;
        box.setAttribute("data-jos_duration", object_default_duration);
      }

      box.classList.add("jos-" + object_default_animation);

      console.log(object_default_animation);

      this.observer = new IntersectionObserver(this.callbackRouter, {
        rootMargin: this.default_rootMargin,
        threshold: this.default_threshold,
        passive: this.default_passive,
      });

      this.observer.observe(box);
    });
  }

  init(options) {
    // apply options if value is not undefined

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
      if (options.debugMode == true) {
        this.debug = true;
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
    if (options.disable == true) {
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

  reset(type = 0) {
    this.rst();
    if (type == -1) {
      return "JOS Disabled";
    }

    if (type == 1) {
      this.animationInit();

      return "JOS Reset";
    }
    // console.log("JOS Reset");

    return "JOS Reset Retaining Final State";

    // return this;
  }
  disable() {
    this.rst();

    // console.log("JOS Disabled");
    return "JOS Disabled";

    // return this;
  }
}

// Create an JOS object

const JOS = new jos();
