class jos {
  default_once = false;
  default_animation = "fade";
  default_animationinverse = undefined;
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
  static version = "0.7.5 (Development)";
  static author = "Jesvi Jonathan";
  static github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  jos_stylesheet = undefined;
  boxes = undefined;
  observers = [];

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
      let object_default_animationinverse = box.dataset.jos_animationinverse;
      let object_default_timingFunction = box.dataset.jos_timingFunction;
      let object_default_duration = box.dataset.jos_duration;
      let object_default_delay = box.dataset.jos_delay;

      if (box.classList.contains("jos_disabled")) {
        box.classList.remove("jos_disabled");
        box.classList.add("jos");
      }
      if (
        object_default_once &&
        (object_default_once == "true" || /^\d+$/.test(object_default_once))
      ) {
        box.setAttribute("data-jos_once", object_default_once);
      } else {
        box.setAttribute("data-jos_once", this.default_once ? "1" : "false");
      }

      box.setAttribute("data-jos_animation", object_default_animation);

      if (object_default_animationinverse) {
        box.setAttribute(
          "data-jos_animationinverse",
          object_default_animationinverse
        );
      }

      if (object_default_timingFunction) {
        box.setAttribute(
          "data-jos_timingFunction",
          object_default_timingFunction
        );
      }

      if (object_default_duration) {
        box.setAttribute("data-jos_duration", object_default_duration);
      }

      if (object_default_delay) {
        box.setAttribute("data-jos_delay", object_default_delay);
      }

      box.setAttribute("data-jos_counter", "0");
      box.classList.add("jos-" + object_default_animation);

      if (box.dataset.jos_startvisible || this.default_startVisible) {
        doit.push(box);
      }

      if (this.default_scrolldirection) {
        box.setAttribute(
          "data-jos_scrolldirection",
          this.default_scrolldirection
        );
      }

      let rootMargin = [
        box.dataset.jos_rootmargin_top || this.default_rootMargin.split(" ")[0],
        box.dataset.jos_rootmargin_left ||
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
      if (box.dataset.jos_anchor) {
        const observer = new IntersectionObserver(
          this.callbackRouter_anchor,
          box_observer
        );
        this.observers.push(observer);
        observer.observe(
          document.getElementById(box.dataset.jos_anchor.substring(1))
        );
      } else {
        const observer = new IntersectionObserver(
          this.callbackRouter,
          box_observer
        );
        this.observers.push(observer);
        observer.observe(box);
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
        }, box_time || this.default_startVisible);
      });
    }, 100);
  }

  getstylesheet() {
    if (!this.jos_stylesheet) {
      this.jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
    }

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

    return this.jos_stylesheet;
  }

  getBoxes() {
    if (!this.boxes) {
      this.boxes = document.querySelectorAll(".jos");
    }
    return this.boxes;
  }

  getdefault(options = {}) {
    let {
      once,
      animation,
      animationinverse,
      timingFunction,
      threshold,
      startVisible,
      scrollDirection,
      intersectionRatio,
      duration,
      delay,
      disable,
      rootMargin,
      rootMarginTop,
      rootMarginBottom,
    } = options;

    this.default_once = once || this.default_once;
    this.default_animation = animation || this.default_animation;
    this.default_animationinverse = animationinverse || this.default_animation;
    this.default_timingFunction = timingFunction || this.default_timingFunction;
    this.default_threshold = threshold || this.default_threshold;
    this.default_startVisible = startVisible || this.default_startVisible;
    this.default_scrolldirection =
      scrollDirection || this.default_scrolldirection;
    this.default_intersectionRatio =
      intersectionRatio || this.default_threshold;
    this.default_duration = duration || this.default_duration;
    this.default_delay = delay || this.default_delay;
    this.disable = disable || this.disable;
    this.default_rootMargin =
      rootMargin ||
      `${rootMarginTop || "-10%"} 0% ${rootMarginBottom || "-40%"} 0%`;
  }

  // initialize JOS class
  init(options = {}) {
    this.getstylesheet();
    this.getBoxes();
    this.getdefault(options);

    // if (this.disable == true) {
    //   this.rst();
    // } else {
    //   this.animationInit();
    // }
    this.start();
  }

  animationUnset(state = 0) {
    if (state != -1) {
      this.boxes?.forEach((box) => {
        box.classList.remove("jos");
        box.classList.add("jos_disabled");
        if (state == 0) {
          box.classList.add("jos-" + box.dataset.jos_animation);
        } else {
          box.classList.remove("jos-" + box.dataset.jos_animation);
        }
      });
    }
    this.observers.forEach((observer) => observer.disconnect());
  }

  start(state = 0) {
    // 0 - Normal/Full Start
    // -1 - Resume with current state
    if (state != -1) {
      this.stop();
      this.animationInit();
    }

    this.disable = false;

    return "Started";
  }

  stop(state = 0) {
    state = state === 1 ? 0 : 1;

    // 0 - Stop | final state | opacity 1
    // 1 - Stop | blank | opacity 0
    // -1 - Pause | final state of elements in viewport

    this.disable = true;
    if (state != -1) {
      this.animationUnset(state);
    }
    return "Stopped";
  }

  reset(state = 0) {
    // 0 - Complete Reset | Init + Start
    // -1 - Refresh without affecting Current state | Un noticed Refresh
    this.animationUnset(state);
    this.init();
    return "Reset";
  }
}

// Create an JOS object
const JOS = new jos();
// By Jesvi Jonathan

/*

// add global startvisivle
// add global scrolldirection
## add debugger function
// remove debugger lines
optimize code | remove redundancy
// working init, reset, destroy, start, stop

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
