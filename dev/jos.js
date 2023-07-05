class jos {
  default_once = false;
  default_animation = "fade";
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_delay = 0;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_startVisible = undefined;
  default_scrolldirection = undefined;
  default_passive = true;
  debug = false;
  disable = false;
  version = "0.7.5 (Development)";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  boxes = document.querySelectorAll(".jos");

  constructor() {}

  callbackRouter_anchor = (entries, observer) => {
    let entry = entries[0];
    let parentTarget = entry.target;

    let elem = document.querySelectorAll(
      "[data-jos_anchor='#" + parentTarget.id + "']"
    );

    elem.forEach((target) => {
      let target_jos_animation = target.dataset.jos_animation;
      let target_jos_animationinverse = target.dataset.jos_animationinverse;
      let scroll_dir = 1; // 0 - up | 1 - down

      if (entry.isIntersecting) {
        if (target.dataset.jos_counter != undefined) {
          let counter_value = parseInt(target.dataset.jos_counter);
          counter_value++;
          target.dataset.jos_counter = counter_value;
        }

        if (target_jos_animation) {
          target.classList.remove("jos-" + target_jos_animation);

          // check for element invoke function
          if (target.dataset.jos_invoke != undefined) {
            window[target.dataset.jos_invoke](target);
          }

          // once or n times on viewport logic
          if (
            target.dataset.jos_once != undefined ||
            target.dataset.jos_once != "false"
          ) {
            if (target.dataset.jos_once == "true") {
              observer.unobserve(target);
            } else if (target.dataset.jos_counter >= target.dataset.jos_once) {
              observer.unobserve(target);
            }
          }
          if (target_jos_animationinverse != undefined) {
            target.classList.add("jos-" + target_jos_animationinverse);
          }
        }
      } else {
        // revert animation
        if (
          target.dataset.jos_scrolldirection === undefined ||
          (scroll_dir === 1 && target.dataset.jos_scrolldirection === "down") ||
          (scroll_dir === 0 && target.dataset.jos_scrolldirection === "up") ||
          target.dataset.jos_scrolldirection === "none"
        ) {
          target.classList.add("jos-" + target_jos_animation);

          if (target.dataset.jos_invoke_out !== undefined) {
            window[target.dataset.jos_invoke_out](target);
          }
        }
      }
    });
  };

  callbackRouter = (entries, observer, type = 1) => {
    if (this.disable == true) {
      return;
    }
    let entry = entries[0];
    let target = entry.target;

    let target_jos_animation = target.dataset.jos_animation;
    let target_jos_animationinverse = target.dataset.jos_animationinverse;
    let scroll_dir = 1; // 0 - up | 1 - down

    if (entry.boundingClientRect.top < 0) {
      scroll_dir = 0;
    } else {
      scroll_dir = 1;
    }
    if (entry.isIntersecting) {
      if (target.dataset.jos_counter != undefined) {
        let counter_value = parseInt(target.dataset.jos_counter);
        counter_value++;
        target.dataset.jos_counter = counter_value;
      }

      if (target_jos_animation) {
        target.classList.remove("jos-" + target_jos_animation);

        // check for element invoke function
        if (target.dataset.jos_invoke != undefined) {
          window[target.dataset.jos_invoke](target);
        }

        // once or n times on viewport logic
        if (
          target.dataset.jos_once != undefined ||
          target.dataset.jos_once != "false"
        ) {
          if (target.dataset.jos_once == "true") {
            observer.unobserve(target);
          } else if (target.dataset.jos_counter >= target.dataset.jos_once) {
            observer.unobserve(target);
          }
        }
      }
      if (target_jos_animationinverse != undefined) {
        target.classList.add("jos-" + target_jos_animationinverse);
      }
    } else {
      // revert animation
      if (
        target.dataset.jos_scrolldirection === undefined ||
        (scroll_dir === 1 && target.dataset.jos_scrolldirection === "down") ||
        (scroll_dir === 0 && target.dataset.jos_scrolldirection === "up") ||
        target.dataset.jos_scrolldirection === "none"
      ) {
        target.classList.add("jos-" + target_jos_animation);
        if (target_jos_animationinverse != undefined) {
          target.classList.remove("jos-" + target_jos_animationinverse);
        }

        if (target.dataset.jos_invoke_out !== undefined) {
          window[target.dataset.jos_invoke_out](target);
        }
      }
    }
    // Check for viewport intersection

    // else if (scroll_dir == 1 && target.dataset.jos_scrolldirection == "up") {
    //   state = "Exit";
    //   target.classList.add("jos-" + target_jos_animation);

    //   // check for element invoke function
    //   if (target.dataset.jos_invoke_out != undefined) {
    //     window[target.dataset.jos_invoke_out](target);
    //     text_invoke = "\n    | Invoked : " + target.dataset.jos_invoke_out;
    //   }
    // }
    // console.log("jos-" + target_jos_animation);
  };

  // initialize the observer
  animationInit() {
    let doit = [];

    this.boxes.forEach((box) => {
      let object_default_once = box.dataset.jos_once;
      let object_default_animation =
        box.dataset.jos_animation || this.default_animation;
      let object_default_timingFunction = box.dataset.jos_timingFunction;
      let object_default_duration = box.dataset.jos_duration;
      let object_default_delay = box.dataset.jos_delay;

      if (object_default_once != undefined) {
        if (
          object_default_once == "true" ||
          /^\d+$/.test(object_default_once)
        ) {
          box.setAttribute("data-jos_once", object_default_once);
        } else {
          box.setAttribute("data-jos_once", "false");
        }
      } else if (this.default_once) {
        box.setAttribute("data-jos_once", "1");
      }

      box.setAttribute("data-jos_animation", object_default_animation);

      if (object_default_timingFunction != undefined) {
        box.setAttribute(
          "data-jos_timingFunction",
          object_default_timingFunction
        );
      }

      if (object_default_duration != undefined) {
        box.setAttribute("data-jos_duration", object_default_duration);
      }

      if (object_default_delay != undefined) {
        box.setAttribute("data-jos_delay", object_default_delay);
      }

      box.setAttribute("data-jos_counter", "0");
      box.classList.add("jos-" + object_default_animation);

      if (
        box.dataset.jos_startvisible != undefined ||
        this.default_startVisible
      ) {
        doit.push(box);
      }

      if (this.default_scrolldirection != undefined) {
        box.setAttribute(
          "data-jos_scrolldirection",
          this.default_scrolldirection
        );
      }

      let rootMargin =
        box.dataset.jos_rootmargin ||
        [
          box.dataset.jos_rootmargin_top ||
            this.default_rootMargin.split(" ")[0],
          this.default_rootMargin.split(" ")[3],
          box.dataset.jos_rootmargin_bottom ||
            this.default_rootMargin.split(" ")[2],
          box.dataset.jos_rootmargin_left ||
            this.default_rootMargin.split(" ")[1],
        ].join(" ");

      let box_observer = {
        rootMargin,
        threshold: this.default_threshold,
        passive: this.default_passive,
      };

      if (box.dataset.jos_anchor != undefined) {
        this.observer = new IntersectionObserver(
          this.callbackRouter_anchor,
          box_observer
        );
        this.observer.observe(
          document.getElementById(box.dataset.jos_anchor.substring(1))
        );
      } else {
        this.observer = new IntersectionObserver(
          this.callbackRouter,
          box_observer
        );
        this.observer.observe(box);
      }
    });

    setTimeout(() => {
      doit.forEach((box) => {
        let box_time = box.dataset.jos_startvisible;

        setTimeout(() => {
          if (box_time == "true") {
            box_time = 0;
          }
          box.classList.remove("jos-" + box.dataset.jos_animation);
        }, box_time);
      });
    });
  }

  // initialize JOS class
  init(options = {}) {
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
      if (options.startVisible != undefined) {
        this.default_startVisible = options.startVisible;
      }
      if (options.scrollDirection != undefined) {
        this.default_scrolldirection = options.scrollDirection;
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
      if (options.disable != undefined) {
        this.disable = options.disable;
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
    if (this.disable == true) {
      this.rst();
    } else {
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

    if (type == 0) {
      this.disable = false;
      this.rst(1);
    } else if (type == -1) {
      this.rst(0);
      this.animationInit();
    }
    // console.log("JOS Reset");
    else {
      this.rst(0);
    }

    this.disable = false;

    return true;
  }
  // stop the animation class
  stop(type = 0) {
    // -1 = disable and reset to initial state (opacity 0)
    // 0  or any = disable and reset to final state (opacity 1)
    // 1 = disable in place
    if (type == -1) {
      this.disable = true;
      this.rst(1);
    } else if (type == 1) {
      this.disable = true;
    } else {
      this.disable = true;
      this.rst(0);
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

    return null;
    // return this;
  }
}

// Create an JOS object
const JOS = new jos();
// By Jesvi Jonathan

/*

// add global startvisivle
// add global scrolldirection
## add debugger function
## remove debugger lines
optimize code | remove redundancy

convert demo to playground
tweak variables
change no. cube
cube color
make use of all exmaple

document new features with example
mention WONT FIX bugs at issues thread | framework support
complete jos atributes table

ETA | auto import for css using javascript on adding inline script

add playable animation presets to jos

// move scroll direction feature to anchor system

List library for hackathons usage

*/
