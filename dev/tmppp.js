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
      this.observer?.unobserve(box);
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