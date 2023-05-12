// Create an JOS object
const JOS = new (class jos {
  // JOS global parameter
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
  // Package Info
  version = "0.7 (Debug)";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  // Read DOM
  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  boxes = document.querySelectorAll(".jos");
  constructor() {
    // will be completed later
  }
  //Init Debugger
  debugLogger(t = 0) {
    (0 != t && 1 != t) ||
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
      (0 != t && 2 != t) ||
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
        ),
      console.info(
        "JOS [" +
          Date.now() +
          "] [INFO]\n    : Debugging (Enable Verbose Mode to see more info)\n\n"
      );
  }
  // callback for anchor observer
  callbackRouter_anchor = (t, e) => {
    let s = t[0],
      o = s.target;
    // animate all elements with the same anchor
    document
      .querySelectorAll("[data-jos_anchor='#" + o.id + "']")
      .forEach((t) => {
        let a = "",
          n = "",
          i = "",
          l = "",
          d = "",
          r = "",
          u = t.dataset.jos_animation;
        if (s.intersectionRatio > this.default_intersectionRatio) {
          // add to element counter
          if (((i = "Enter"), null != t.dataset.jos_counter)) {
            let e = parseInt(t.dataset.jos_counter);
            e++, (t.dataset.jos_counter = e), (r = "\n    | Counter : " + e);
          }
          // start animation
          u &&
            (t.classList.remove("jos-" + u),
            // check for element invoke function
            null != t.dataset.jos_invoke &&
              (window[t.dataset.jos_invoke](t),
              (n = "\n    | Invoked : " + t.dataset.jos_invoke)),
            // once or n times on viewport logic
            (null == t.dataset.jos_once && "false" == t.dataset.jos_once) ||
              // remove anchor from current element to unobserve
              ("true" == t.dataset.jos_once
                ? (e.unobserve(t),
                  (t.dataset.jos_anchor = null),
                  (a = "\n    | Once :  Removed Observer (1)"))
                : t.dataset.jos_counter >= t.dataset.jos_once &&
                  (e.unobserve(t),
                  (t.dataset.jos_anchor = null),
                  (a =
                    "\n    | Once :  Removed Observer (" +
                    t.dataset.jos_once +
                    ")"))));
          // iiterate the counter for the element
        }
        // revert animation
        else
          (i = "Exit"),
            t.classList.add("jos-" + u),
            // check for element invoke function
            null != t.dataset.jos_invoke_out &&
              (window[t.dataset.jos_invoke_out](t),
              (n = "\n    | Invoked : " + t.dataset.jos_invoke_out));
        "" != t.id && (l = "\n    | ID : " + t.id),
          null != t.dataset.jos_duration &&
            (d = "\n    | Duration : " + t.dataset.jos_duration + "s"),
          1 == this.debug &&
            console.debug(
              "JOS [" +
                Date.now() +
                "] [DEBUG]\n    : On-" +
                i +
                " (" +
                t.tagName +
                ") Info\n    | Anchor : " +
                o.id +
                l +
                "\n    | Class : (" +
                t.className +
                ")\n    | Intersection Ratio : (" +
                s.intersectionRatio +
                " ~ " +
                this.default_intersectionRatio +
                ")\n    | Animation : " +
                t.dataset.jos_animation +
                d +
                a +
                r +
                n
            );
      });
  };
  // callback for observer (main)
  callbackRouter = (t, e, s = 1) => {
    if (1 == this.disable) return;
    // target/entry being observed
    let o = t[0],
      a = o.target,
      n = "",
      i = "",
      l = "",
      d = "",
      r = "",
      u = "",
      h = "",
      c = "",
      _ = a.dataset.jos_animation;
    // Check for viewport intersection
    if (o.intersectionRatio > this.default_intersectionRatio) {
      // add to element counter
      if (((l = "Enter"), null != a.dataset.jos_counter)) {
        let t = parseInt(a.dataset.jos_counter);
        t++, (a.dataset.jos_counter = t), (c = "\n    | Counter : " + t);
      }
      // start animation
      _ &&
        (a.classList.remove("jos-" + _),
        // check for element invoke function
        null != a.dataset.jos_invoke &&
          (window[a.dataset.jos_invoke](a),
          (i = "\n    | Invoked : " + a.dataset.jos_invoke)),
        // once or n times on viewport logic
        (null == a.dataset.jos_once && "false" == a.dataset.jos_once) ||
          // target.classList.remove("jos");
          // console.log("Removed-Observer");
          ("true" == a.dataset.jos_once
            ? (e.unobserve(a), (n = "\n    | Once :  Removed Observer (1)"))
            : a.dataset.jos_counter >= a.dataset.jos_once &&
              (e.unobserve(a),
              (n =
                "\n    | Once :  Removed Observer (" +
                a.dataset.jos_once +
                ")"))));
      // iterate the counter for the element
    }
    // revert animation
    else
      (l = "Exit"),
        a.classList.add("jos-" + _),
        // check for element invoke function
        null != a.dataset.jos_invoke_out &&
          (window[a.dataset.jos_invoke_out](a),
          (i = "\n    | Invoked : " + a.dataset.jos_invoke_out));
    // debug info
    "" != a.id && (d = "\n    | ID : " + a.id),
      null != a.dataset.jos_duration &&
        (r = "\n    | Duration : " + a.dataset.jos_duration + "s"),
      null != a.dataset.jos_timingFunction &&
        (u = "\n    | Timing Function : " + a.dataset.jos_timingFunction),
      null != a.dataset.jos_delay &&
        (h = "\n    | Delay : " + a.dataset.jos_delay + "s"),
      // debug info
      1 == this.debug &&
        console.debug(
          "JOS [" +
            Date.now() +
            "] [DEBUG]\n    : On-" +
            l +
            " (" +
            a.tagName +
            ") Info" +
            d +
            "\n    | Class : (" +
            a.className +
            ")\n    | Intersection Ratio : (" +
            o.intersectionRatio +
            " ~ " +
            this.default_intersectionRatio +
            ")\n    | Animation : " +
            a.dataset.jos_animation +
            r +
            h +
            u +
            n +
            c +
            i
        );
  };
  // initialize the observer
  animationInit() {
    this.boxes.forEach(
      (t) => {
        // observer.observe(box);;
        // check for default values
        let e = t.dataset.jos_once,
          s = (t.dataset.jos_count, t.dataset.jos_animation),
          o = t.dataset.jos_timingFunction,
          a = t.dataset.jos_duration,
          n = t.dataset.jos_delay;
        // set element attribute values
        null != e &&
          "false" != e &&
          //object_default_once = this.default_once;
          ("true" == e
            ? t.setAttribute("data-jos_once", "1")
            : e.match(/^[0-9]+$/)
            ? t.setAttribute("data-jos_once", e)
            : t.setAttribute("data-jos_once", "false")),
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
          null != s
            ? //object_default_animation = this.default_animation;
              t.setAttribute("data-jos_animation", s)
            : (t.setAttribute("data-jos_animation", this.default_animation),
              (s = this.default_animation)),
          null != o &&
            //object_default_timingFunction = this.default_timingFunction;
            t.setAttribute("data-jos_timingFunction", o),
          null != a &&
            //object_default_duration = this.default_duration;
            t.setAttribute("data-jos_duration", a),
          null != n &&
            //object_default_duration = this.default_duration;
            t.setAttribute("data-jos_delay", n),
          t.setAttribute("data-jos_counter", "0"),
          t.classList.add("jos-" + s),
          // refresh the dom to apply the re insert the elements in the body
          null != t.dataset.jos_anchor
            ? // add observer for anchor
              ((this.observer = new IntersectionObserver(
                this.callbackRouter_anchor,
                {
                  rootMargin: this.default_rootMargin,
                  threshold: this.default_threshold,
                  passive: this.default_passive,
                }
              )),
              this.observer.observe(
                document.getElementById(t.dataset.jos_anchor.substring(1))
              ))
            : // add observer for element
              ((this.observer = new IntersectionObserver(this.callbackRouter, {
                rootMargin: this.default_rootMargin,
                threshold: this.default_threshold,
                passive: this.default_passive,
              })),
              this.observer.observe(t));
      }
      // add observer for element
    ),
      // debug info
      1 == this.debug &&
        console.log(
          "JOS [" + Date.now() + "] [DEBUG]\n    : Initialized\n    |",
          { log_element_object: this.boxes }
        );
  }
  // initialize JOS class
  init(t = {}) {
    // apply options if value is not undefined
    t &&
      (null != t.once && (this.default_once = t.once),
      null != t.animation && (this.default_animation = t.animation),
      null != t.timingFunction &&
        (this.default_timingFunction = t.timingFunction),
      null != t.threshold && (this.default_threshold = t.threshold),
      null != t.intersectionRatio
        ? (console.warn(
            "JOS [" +
              Date.now() +
              "] [WARN] \n    : IntersectionRatio is deprecated\n    | Use threshold instead."
          ),
          (this.default_intersectionRatio =
            1 == t.intersectionRatio ? 0.99 : t.intersectionRatio))
        : (this.default_intersectionRatio =
            1 == this.default_threshold ? 0.99 : this.default_threshold),
      null != t.duration && (this.default_duration = t.duration),
      null != t.delay && (this.default_delay = t.delay),
      null != t.disable && (this.disable = t.disable),
      null != t.rootMargin
        ? (this.default_rootMargin = t.rootMargin)
        : (null == t.rootMarginTop && null == t.rootMarginBottom) ||
          (this.default_rootMargin =
            (null != t.rootMarginTop ? t.rootMarginTop : "-10%") +
            " 0% " +
            (null != t.rootMarginBottom ? t.rootMarginBottom : "-40%") +
            " 0%"),
      // debug info for debug mode
      1 == t.debugMode && ((this.debug = !0), this.debugLogger())),
      // add global css for jos
      this.jos_stylesheet.insertRule(
        ".jos {transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          " " +
          this.default_delay +
          "s !important;}"
      ),
      1 == this.disable
        ? (this.rst(),
          1 == this.debug &&
            console.info("JOS [" + Date.now() + "] [DEBUG]\n    : Disbaled"))
        : (1 == this.debug &&
            console.info("JOS [" + Date.now() + "] [DEBUG]\n    : Started"),
          this.animationInit());
  }
  // reset common function
  rst = (t = 0) => {
    // 0 resets to initial state (opacity 0 all elements)
    this.boxes.forEach((e) => {
      // reset to initial state
      0 == t
        ? e.classList.remove("jos-" + e.dataset.jos_animation)
        : // reset to final state
          e.classList.add("jos-" + e.dataset.jos_animation),
        // unobserve element
        this.observer.unobserve(e);
    }),
      // reset jos css class
      this.jos_stylesheet.insertRule(
        ".jos {transition: " +
          this.default_duration +
          "s " +
          this.default_timingFunction +
          ";}"
      );
  };
  // start the animation class
  start() {
    this.disable = !1;
  }
  // reset the animation class
  reset(t = 0) {
    // 0 resets to initial state (opacity 0 all elements)
    // 1 resets to final state (opacity 1 all elements)
    // -1 re initialize variables (opacity 1 for elements that are in view only)
    let e = "";
    return (
      0 == t
        ? ((this.disable = !1),
          this.rst(1),
          (e = "Reset | In initial state (ie: Opacity 0 all elements)"))
        : -1 == t
        ? (this.rst(0),
          this.animationInit(),
          (e =
            "Reset | Re-initialize variables (opacity 1 for elements that are in view only)"))
        : (this.rst(0),
          (e = "Reset | In final state (ie: Opacity 1 all elements)")),
      (this.disable = !1),
      // return this;
      // debug info
      1 == this.debug &&
        console.info("JOS [" + Date.now() + "] [STATUS]\n    : " + e),
      !0
    );
  }
  // stop the animation class
  stop(t = 0) {
    // -1 = disable and reset to initial state (opacity 0)
    // 0  or any = disable and reset to final state (opacity 1)
    // 1 = disable in place
    var e = "";
    return (
      -1 == t
        ? ((this.disable = !0),
          this.rst(1),
          (e = "Disabled | Reset to initial state (ie: Opacity 0)"))
        : 1 == t
        ? ((this.disable = !0), (e = "Disabled | Elements in place"))
        : ((this.disable = !0),
          this.rst(0),
          (e = "Disabled | Reset to final state (ie: Opacity 1)")),
      1 == this.debug &&
        console.info("JOS [" + Date.now() + "] [STATUS]\n    : " + e),
      this.observer.disconnect(),
      !0
    );
    // return this;
  }
  // destroy the animation class
  destroy() {
    return (
      this.rst(),
      this.boxes.forEach((t) => {
        // remove jos class from all element
        t.classList.remove("jos"),
          t.classList.remove("jos-" + t.dataset.jos_animation);
      }),
      // console.log("JOS Destroyed");
      // debug info
      1 == this.debug &&
        console.info("JOS [" + Date.now() + "] [DEBUG]\n    : Destroyed"),
      null
    );
    // return this;
  }
})();
// By Jesvi Jonathan
