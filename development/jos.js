class jos {
  // JOS global parameter
  default_once = false;
  default_animation = "fade";
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_delay = 0;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_passive = true;
  debug = false;
  disable = false;
  // Package Info
  version = "0.6 (Development)";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  // Read DOM
  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  boxes = document.querySelectorAll(".jos");

  constructor() {
    // will be completed later
  }

  //Init Debugger
  debugLogger(type = 0) {
    if (type == 0 || type == 1) {
      console.info(
        "JOS " +
          ("[" + Date.now() + "] [INFO]\n") +
          "    : Javascript On Scroll Animation Library\n" +
          ("    | Version: " + this.version + "\n") +
          ("    | Author: " + this.author + "\n") +
          ("    | Github: " + this.github + "\n\n")
      );
    }
    if (type == 0 || type == 2) {
      console.info(
        "JOS " +
          ("[" + Date.now() + "] [INFO]\n") +
          "    : Params \n" +
          ("    | Global Animation: " + this.default_animation + "\n") +
          ("    | Global Duration: " + this.default_duration + "\n") +
          ("    | Global Timing Function: " +
            this.default_timingFunction +
            "\n") +
          ("    | Global Delay: " + this.default_delay + "\n") +
          ("    | Global Once: " + this.default_once + "\n") +
          ("    | Global Intersection Ratio: " +
            this.default_intersectionRatio +
            "\n") +
          ("    | Global Threshold: " + this.default_threshold + "\n") +
          ("    | Global Root Margin: " + this.default_rootMargin + "\n") +
          ("    | Passive: " + this.default_passive + "\n") +
          ("    | Debug Mode: " + this.debug + "\n") +
          "\n"
      );
    }

    console.info(
      "JOS " +
        ("[" + Date.now() + "] [INFO]\n") +
        "    : Debugging (Enable Verbose Mode to see more info)\n" +
        "\n"
    );
  }

  callbackRouter = (entries, observer) => {
    if (this.disable == true) {
      return;
    }
    // target/entry being observed
    let entry = entries[0];
    let target = entry.target;
    // debug variable
    let text_once = "";
    let text_invoke = "";
    let state = "";
    let text_target = "";
    let text_duration = "";
    let text_timingFunction = "";
    let text_delay = "";
    let text_iterationCount = "";
    let target_jos_animation = target.dataset.jos_animation;

    // Check for viewport intersection
    if (entry.intersectionRatio > this.default_intersectionRatio) {
      state = "Enter";
      // add to element counter
      if (target.dataset.jos_counter != undefined) {
        let counter_value = parseInt(target.dataset.jos_counter);
        counter_value++;
        target.dataset.jos_counter = counter_value;
        text_iterationCount = "\n    | Counter : " + counter_value;
      }
      // start animation
      if (target_jos_animation) {
        target.classList.remove("jos-" + target_jos_animation);

        // check for element invoke function
        if (target.dataset.jos_invoke != undefined) {
          window[target.dataset.jos_invoke](target);
          text_invoke = "\n    | Invoked : " + target.dataset.jos_invoke;
        }

        // once or n times on viewport logic
        if (
          target.dataset.jos_once != undefined ||
          target.dataset.jos_once != "false"
        ) {
          // target.classList.remove("jos");
          // console.log("Removed-Observer");
          if (target.dataset.jos_once == "true") {
            observer.unobserve(target);
            text_once = "\n    | Once :  Removed Observer (1)";
          } else if (target.dataset.jos_counter >= target.dataset.jos_once) {
            observer.unobserve(target);
            text_once =
              "\n    | Once :  Removed Observer (" +
              target.dataset.jos_once +
              ")";
          }
        }
      }

      // iiterate the counter for the element
    } else {
      // revert animation
      state = "Exit";
      target.classList.add("jos-" + target_jos_animation);

      // check for element invoke function
      if (target.dataset.jos_invoke_out != undefined) {
        window[target.dataset.jos_invoke_out](target);
        text_invoke = "\n    | Invoked : " + target.dataset.jos_invoke_out;
      }
      // console.log("jos-" + target_jos_animation);
    }

    // debug info
    if (target.id != "") {
      text_target = "\n    | ID : " + target.id;
    }

    if (target.dataset.jos_duration != undefined) {
      text_duration = "\n    | Duration : " + target.dataset.jos_duration + "s";
    }
    if (target.dataset.jos_timingFunction != undefined) {
      text_timingFunction =
        "\n    | Timing Function : " + target.dataset.jos_timingFunction;
    }

    if (target.dataset.jos_delay != undefined) {
      text_delay = "\n    | Delay : " + target.dataset.jos_delay + "s";
    }
    // debug info
    if (this.debug == true) {
      console.debug(
        "JOS " +
          ("[" + Date.now() + "] [DEBUG]\n") +
          "    : On-" +
          state +
          " (" +
          target.tagName +
          ") Info" +
          text_target +
          "\n    | Class : (" +
          target.className +
          ")\n    | Intersection Ratio : (" +
          entry.intersectionRatio +
          " ~ " +
          this.default_intersectionRatio +
          ")\n    | Animation : " +
          target.dataset.jos_animation +
          text_duration +
          text_delay +
          text_timingFunction +
          text_once +
          text_iterationCount +
          text_invoke
      );
    }
  };

  // initialize the observer
  animationInit() {
    let log_text = "";
    this.boxes.forEach((box) => {
      // observer.observe(box);;
      // check for default values
      let object_default_once = box.dataset.jos_once;
      let object_default_itterationCount = box.dataset.jos_count;
      let object_default_animation = box.dataset.jos_animation;
      let object_default_timingFunction = box.dataset.jos_timingFunction;
      let object_default_duration = box.dataset.jos_duration;
      let object_default_delay = box.dataset.jos_delay;

      // set element attribute values
      if (object_default_once != undefined && object_default_once != "false") {
        //object_default_once = this.default_once;
        if (object_default_once == "true") {
          box.setAttribute("data-jos_once", "1");
        }
        // checl and apply condition only if the value is a number
        else if (object_default_once.match(/^[0-9]+$/)) {
          box.setAttribute("data-jos_once", object_default_once);
        } else {
          box.setAttribute("data-jos_once", "false");
        }
      }
      // if (
      //   object_default_itterationCount == undefined ||
      //   object_default_itterationCount <= 0
      // ) {
      //   console.log("deprecated : jos-itterationCount is not defined or <= 0");
      //   box.dataset.jos_itterationCount = 1;
      //   box.setAttribute(
      //     "data-jos_iterationCount",
      //     object_default_itterationCount
      //   );
      // } else {
      // }
      if (object_default_animation != undefined) {
        //object_default_animation = this.default_animation;
        box.setAttribute("data-jos_animation", object_default_animation);
      } else {
        box.setAttribute("data-jos_animation", this.default_animation);
        object_default_animation = this.default_animation;
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
      if (object_default_delay != undefined) {
        //object_default_duration = this.default_duration;
        box.setAttribute("data-jos_delay", object_default_delay);
      }

      box.setAttribute("data-jos_counter", "0");
      box.classList.add("jos-" + object_default_animation);

      // refresh the dom to apply the re insert the elements in the body

      this.observer = new IntersectionObserver(this.callbackRouter, {
        rootMargin: this.default_rootMargin,
        threshold: this.default_threshold,
        passive: this.default_passive,
      });

      // add observer for element
      this.observer.observe(box);
    });
    // debug info
    if (this.debug == true) {
      console.log(
        "JOS " +
          ("[" + Date.now() + "] [DEBUG]\n") +
          "    : Initialized\n    |",
        {
          log_element_object: this.boxes,
        }
      );

      // console.log(
      //   "JOS : Init\n" +
      //     box.id +
      //     "    | " +
      //     box.className +
      //     " | " +
      //     box.tagName +
      //     "\n" +
      //     "    | " +
      //     object_default_animation
      // );
    }
  }

  // initialize JOS class
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
        console.warn(
          "JOS [" +
            Date.now() +
            "] [WARN] \n    : IntersectionRatio is deprecated\n" +
            "    | Use threshold instead."
        );
        this.default_intersectionRatio =
          options.intersectionRatio == 1 ? 0.99 : options.intersectionRatio;
      } else {
        this.default_intersectionRatio =
          this.default_threshold == 1 ? 0.99 : this.default_threshold;
      }
      if (options.duration != undefined) {
        this.default_duration = options.duration;
      }
      if (options.delay != undefined) {
        this.default_delay = options.delay;
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
      // debug info for debug mode
      if (options.debugMode == true) {
        this.debug = true;
        this.debugLogger();
      }
    }
    // add global css for jos
    this.jos_stylesheet.insertRule(
      ".jos {" +
        // ("transition-timing-function: " +
        //   this.default_timingFunction +
        //   " !important;") +
        // ("transition-duration: " + this.default_duration + "s !important;") +
        // ("transition-delay: " + this.default_delay + "s; ") +
        ("transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          " " +
          this.default_delay +
          "s !important;") +
        "}"
    );
    if (options.disable == true) {
      this.rst();
      if (this.debug == true) {
        console.info("JOS [" + Date.now() + "] [DEBUG]\n    : Disbaled");
      }
    } else {
      if (this.debug == true) {
        console.info("JOS [" + Date.now() + "] [DEBUG]\n    : Started");
      }
      this.animationInit();
    }
  }
  // reset common function
  rst = (type = 0) => {
    // 0 resets to initial state (opacity 0 all elements)
    this.boxes.forEach((box) => {
      // reset to initial state
      if (type == 0) {
        box.classList.remove("jos-" + box.dataset.jos_animation);
      } else {
        // reset to final state
        box.classList.add("jos-" + box.dataset.jos_animation);
      }
      // unobserve element
      this.observer.unobserve(box);
    });

    // reset jos css class
    this.jos_stylesheet.insertRule(
      ".jos {" +
        ("transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          ";") +
        "}"
    );
  };

  // start the animation class
  start() {
    this.disable = false;
  }
  // reset the animation class
  reset(type = 0) {
    // 0 resets to initial state (opacity 0 all elements)
    // 1 resets to final state (opacity 1 all elements)
    // -1 re initialize variables (opacity 1 for elements that are in view only)

    let returnString = "";

    if (type == 0) {
      this.disable = false;
      this.rst(1);

      returnString = "Reset | In initial state (ie: Opacity 0 all elements)";
    } else if (type == -1) {
      this.rst(0);
      this.animationInit();
      returnString =
        "Reset | Re-initialize variables (opacity 1 for elements that are in view only)";
    }
    // console.log("JOS Reset");
    else {
      this.rst(0);
      returnString = "Reset | In final state (ie: Opacity 1 all elements)";
    }

    this.disable = false;
    // return this;
    // debug info
    if (this.debug == true) {
      console.info("JOS [" + Date.now() + "] [STATUS]\n    : " + returnString);
    }
    return true;
  }
  // stop the animation class
  stop(type = 0) {
    // -1 = disable and reset to initial state (opacity 0)
    // 0  or any = disable and reset to final state (opacity 1)
    // 1 = disable in place
    var returnString = "";
    if (type == -1) {
      this.disable = true;
      this.rst(1);
      returnString = "Disabled | Reset to initial state (ie: Opacity 0)";
    } else if (type == 1) {
      this.disable = true;
      returnString = "Disabled | Elements in place";
    } else {
      this.disable = true;
      this.rst(0);
      returnString = "Disabled | Reset to final state (ie: Opacity 1)";
    }

    if (this.debug == true) {
      console.info("JOS [" + Date.now() + "] [STATUS]\n    : " + returnString);
    }
    this.observer.disconnect();
    return true;
    // return this;
  }
  // destroy the animation class
  destroy() {
    this.rst();
    this.boxes.forEach((box) => {
      // remove jos class from all element
      box.classList.remove("jos");
      box.classList.remove("jos-" + box.dataset.jos_animation);
    });
    // console.log("JOS Destroyed");
    // debug info
    if (this.debug == true) {
      console.info("JOS [" + Date.now() + "] [DEBUG]\n    : Destroyed");
    }
    return null;
    // return this;
  }
}

// Create an JOS object
const JOS = new jos();
