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
  version = "0.7";
  author = "Jesvi Jonathan";
  github = "https://github.com/jesvijonathan/JOS-Animation-Library";
  jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  boxes = document.querySelectorAll(".jos");
  constructor() {}
  debugLogger(t = 0) {}
  callbackRouter_anchor = (t, e) => {
    let s = t[0],
      a = s.target;
    document
      .querySelectorAll("[data-jos_anchor='#" + a.id + "']")
      .forEach((t) => {
        let a = "",
          o = "",
          i = "",
          n = "",
          l = "",
          d = "",
          r = t.dataset.jos_animation;
        if (s.intersectionRatio > this.default_intersectionRatio) {
          if (((i = "Enter"), null != t.dataset.jos_counter)) {
            let e = parseInt(t.dataset.jos_counter);
            e++, (t.dataset.jos_counter = e), (d = "\n    | Counter : " + e);
          }
          r &&
            (t.classList.remove("jos-" + r),
            null != t.dataset.jos_invoke &&
              (window[t.dataset.jos_invoke](t),
              (o = "\n    | Invoked : " + t.dataset.jos_invoke)),
            (null == t.dataset.jos_once && "false" == t.dataset.jos_once) ||
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
        } else
          (i = "Exit"),
            t.classList.add("jos-" + r),
            null != t.dataset.jos_invoke_out &&
              (window[t.dataset.jos_invoke_out](t),
              (o = "\n    | Invoked : " + t.dataset.jos_invoke_out));
        "" != t.id && (n = "\n    | ID : " + t.id),
          null != t.dataset.jos_duration &&
            (l = "\n    | Duration : " + t.dataset.jos_duration + "s"),
          this.debug;
      });
  };
  callbackRouter = (t, e, s = 1) => {
    if (1 == this.disable) return;
    let a = t[0],
      o = a.target,
      i = "",
      n = "",
      l = "",
      d = "",
      r = "",
      u = "",
      h = "",
      _ = "",
      c = o.dataset.jos_animation;
    if (a.intersectionRatio > this.default_intersectionRatio) {
      if (((l = "Enter"), null != o.dataset.jos_counter)) {
        let t = parseInt(o.dataset.jos_counter);
        t++, (o.dataset.jos_counter = t), (_ = "\n    | Counter : " + t);
      }
      c &&
        (o.classList.remove("jos-" + c),
        null != o.dataset.jos_invoke &&
          (window[o.dataset.jos_invoke](o),
          (n = "\n    | Invoked : " + o.dataset.jos_invoke)),
        (null == o.dataset.jos_once && "false" == o.dataset.jos_once) ||
          ("true" == o.dataset.jos_once
            ? (e.unobserve(o), (i = "\n    | Once :  Removed Observer (1)"))
            : o.dataset.jos_counter >= o.dataset.jos_once &&
              (e.unobserve(o),
              (i =
                "\n    | Once :  Removed Observer (" +
                o.dataset.jos_once +
                ")"))));
    } else
      (l = "Exit"),
        o.classList.add("jos-" + c),
        null != o.dataset.jos_invoke_out &&
          (window[o.dataset.jos_invoke_out](o),
          (n = "\n    | Invoked : " + o.dataset.jos_invoke_out));
    "" != o.id && (d = "\n    | ID : " + o.id),
      null != o.dataset.jos_duration &&
        (r = "\n    | Duration : " + o.dataset.jos_duration + "s"),
      null != o.dataset.jos_timingFunction &&
        (u = "\n    | Timing Function : " + o.dataset.jos_timingFunction),
      null != o.dataset.jos_delay &&
        (h = "\n    | Delay : " + o.dataset.jos_delay + "s"),
      this.debug;
  };
  animationInit() {
    this.boxes.forEach((t) => {
      let e = t.dataset.jos_once,
        s = (t.dataset.jos_count, t.dataset.jos_animation),
        a = t.dataset.jos_timingFunction,
        o = t.dataset.jos_duration,
        i = t.dataset.jos_delay;
      null != e &&
        "false" != e &&
        ("true" == e
          ? t.setAttribute("data-jos_once", "1")
          : e.match(/^[0-9]+$/)
          ? t.setAttribute("data-jos_once", e)
          : t.setAttribute("data-jos_once", "false")),
        null != s
          ? t.setAttribute("data-jos_animation", s)
          : (t.setAttribute("data-jos_animation", this.default_animation),
            (s = this.default_animation)),
        null != a && t.setAttribute("data-jos_timingFunction", a),
        null != o && t.setAttribute("data-jos_duration", o),
        null != i && t.setAttribute("data-jos_delay", i),
        t.setAttribute("data-jos_counter", "0"),
        t.classList.add("jos-" + s),
        null != t.dataset.jos_anchor
          ? ((this.observer = new IntersectionObserver(
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
          : ((this.observer = new IntersectionObserver(this.callbackRouter, {
              rootMargin: this.default_rootMargin,
              threshold: this.default_threshold,
              passive: this.default_passive,
            })),
            this.observer.observe(t));
    }),
      this.debug;
  }
  init(t = {}) {
    t &&
      (null != t.once && (this.default_once = t.once),
      null != t.animation && (this.default_animation = t.animation),
      null != t.timingFunction &&
        (this.default_timingFunction = t.timingFunction),
      null != t.threshold && (this.default_threshold = t.threshold),
      null != t.intersectionRatio
        ? (this.default_intersectionRatio =
            1 == t.intersectionRatio ? 0.99 : t.intersectionRatio)
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
      1 == t.debugMode && ((this.debug = !0), this.debugLogger())),
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
        ? (this.rst(), this.debug)
        : (this.debug, this.animationInit());
  }
  rst = (t = 0) => {
    this.boxes.forEach((e) => {
      0 == t
        ? e.classList.remove("jos-" + e.dataset.jos_animation)
        : e.classList.add("jos-" + e.dataset.jos_animation),
        this.observer.unobserve(e);
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
  reset(t = 0) {
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
      this.debug,
      !0
    );
  }
  stop(t = 0) {
    return (
      -1 == t
        ? ((this.disable = !0),
          this.rst(1),
          "Disabled | Reset to initial state (ie: Opacity 0)")
        : 1 == t
        ? ((this.disable = !0), "Disabled | Elements in place")
        : ((this.disable = !0),
          this.rst(0),
          "Disabled | Reset to final state (ie: Opacity 1)"),
      this.debug,
      this.observer.disconnect(),
      !0
    );
  }
  destroy() {
    return (
      this.rst(),
      this.boxes.forEach((t) => {
        t.classList.remove("jos"),
          t.classList.remove("jos-" + t.dataset.jos_animation);
      }),
      this.debug,
      null
    );
  }
})();
// By Jesvi Jonathan
