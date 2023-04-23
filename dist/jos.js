const JOS = new (class jos {
  default_once = !1;
  default_animation = "fade";
  default_timingFunction = "ease-in-out";
  default_threshold = 0;
  default_duration = 0.4;
  default_delay = 0;
  default_intersectionRatio = 0;
  default_rootMargin = "-10% 0% -40% 0%";
  default_passive = !0;
  debug = !1;
  disable = !1;
  version = "0.6";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  boxes = document.querySelectorAll(".jos");
  constructor() {}
  debugLogger(type = 0) {
    (0 != type && 1 != type) ||
      console.info(
        "JOS [" +
          Date.now() +
          "] [INFO]\n    : Javascript On Scroll Animation Library\n    | Version: " +
          this.version +
          "\n    | Author: " +
          this.author +
          "\n    | Github: " +
          this.github +
          "\n\n"
      ),
      (0 != type && 2 != type) ||
        console.info(
          "JOS [" +
            Date.now() +
            "] [INFO]\n    : Params \n    | Global Animation: " +
            this.default_animation +
            "\n    | Global Duration: " +
            this.default_duration +
            "\n    | Global Timing Function: " +
            this.default_timingFunction +
            "\n    | Global Delay: " +
            this.default_delay +
            "\n    | Global Once: " +
            this.default_once +
            "\n    | Global Intersection Ratio: " +
            this.default_intersectionRatio +
            "\n    | Global Threshold: " +
            this.default_threshold +
            "\n    | Global Root Margin: " +
            this.default_rootMargin +
            "\n    | Passive: " +
            this.default_passive +
            "\n    | Debug Mode: " +
            this.debug +
            "\n\n"
        );
  }
  callbackRouter = (entries, observer) => {
    if (1 == this.disable) return;
    let entry = entries[0],
      target = entry.target;
    if (entry.intersectionRatio > this.default_intersectionRatio) {
      if (null != target.dataset.jos_counter) {
        let counter_value = parseInt(target.dataset.jos_counter);
        counter_value++, (target.dataset.jos_counter = counter_value);
      }
      target.dataset.jos_animation &&
        (target.classList.remove("jos-" + target.dataset.jos_animation),
        null != target.dataset.jos_invoke &&
          window[target.dataset.jos_invoke](target),
        (null == target.dataset.jos_once &&
          "false" == target.dataset.jos_once) ||
          (("true" == target.dataset.jos_once ||
            target.dataset.jos_counter >= target.dataset.jos_once) &&
            observer.unobserve(target)));
    } else
      target.classList.add("jos-" + target.dataset.jos_animation),
        null != target.dataset.jos_invoke_out &&
          window[target.dataset.jos_invoke_out](target);
  };
  animationInit() {
    this.boxes.forEach((box) => {
      let object_default_once = box.dataset.jos_once,
        object_default_animation =
          (box.dataset.jos_count, box.dataset.jos_animation),
        object_default_timingFunction = box.dataset.jos_timingFunction,
        object_default_duration = box.dataset.jos_duration,
        object_default_delay = box.dataset.jos_delay;
      null != object_default_once &&
        "false" != object_default_once &&
        ("true" == object_default_once
          ? box.setAttribute("data-jos_once", "1")
          : object_default_once.match(/^[0-9]+$/)
          ? box.setAttribute("data-jos_once", object_default_once)
          : box.setAttribute("data-jos_once", "false")),
        null != object_default_animation
          ? box.setAttribute("data-jos_animation", object_default_animation)
          : (box.setAttribute("data-jos_animation", this.default_animation),
            (object_default_animation = this.default_animation)),
        null != object_default_timingFunction &&
          box.setAttribute(
            "data-jos_timingFunction",
            object_default_timingFunction
          ),
        null != object_default_duration &&
          box.setAttribute("data-jos_duration", object_default_duration),
        null != object_default_delay &&
          box.setAttribute("data-jos_delay", object_default_delay),
        box.setAttribute("data-jos_counter", "0"),
        box.classList.add("jos-" + object_default_animation),
        (this.observer = new IntersectionObserver(this.callbackRouter, {
          rootMargin: this.default_rootMargin,
          threshold: this.default_threshold,
          passive: this.default_passive,
        })),
        this.observer.observe(box);
    });
  }
  init(options) {
    options &&
      (null != options.once && (this.default_once = options.once),
      null != options.animation && (this.default_animation = options.animation),
      null != options.timingFunction &&
        (this.default_timingFunction = options.timingFunction),
      null != options.threshold && (this.default_threshold = options.threshold),
      null != options.intersectionRatio
        ? (console.warn(
            "JOS [" +
              Date.now() +
              "] [WARN] \n    : IntersectionRatio is deprecated\n    | Use threshold instead."
          ),
          (this.default_intersectionRatio =
            1 == options.intersectionRatio ? 0.99 : options.intersectionRatio))
        : (this.default_intersectionRatio =
            1 == this.default_threshold ? 0.99 : this.default_threshold),
      null != options.duration && (this.default_duration = options.duration),
      null != options.delay && (this.default_delay = options.delay),
      null != options.rootMargin
        ? (this.default_rootMargin = options.rootMargin)
        : (null == options.rootMarginTop && null == options.rootMarginBottom) ||
          (this.default_rootMargin =
            (null != options.rootMarginTop ? options.rootMarginTop : "-10%") +
            " 0% " +
            (null != options.rootMarginBottom
              ? options.rootMarginBottom
              : "-40%") +
            " 0%"),
      1 == options.debugMode && this.debugLogger()),
      this.jos_stylesheet.insertRule(
        ".jos {transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          " " +
          this.default_delay +
          "s !important;}"
      ),
      1 == this.disable ? this.rst() : this.animationInit();
  }
  rst = (type = 0) => {
    this.boxes.forEach((box) => {
      0 == type
        ? box.classList.remove("jos-" + box.dataset.jos_animation)
        : box.classList.add("jos-" + box.dataset.jos_animation),
        this.observer.unobserve(box);
    }),
      this.jos_stylesheet.insertRule(
        ".jos {transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          ";}"
      );
  };
  start() {
    this.disable = !1;
  }
  reset(type = 0) {
    return (
      0 == type
        ? ((this.disable = !1), this.rst(1))
        : -1 == type
        ? (this.rst(0), this.animationInit())
        : this.rst(0),
      (this.disable = !1),
      !0
    );
  }
  stop(type = 0) {
    return (
      -1 == type
        ? ((this.disable = !0), this.rst(1))
        : 1 == type
        ? (this.disable = !0)
        : ((this.disable = !0), this.rst(0)),
      this.observer.disconnect(),
      !0
    );
  }
  destroy() {
    return (
      this.rst(),
      this.boxes.forEach((box) => {
        box.classList.remove("jos"),
          box.classList.remove("jos-" + box.dataset.jos_animation);
      }),
      null
    );
  }
})();
// By Jesvi Jonathan