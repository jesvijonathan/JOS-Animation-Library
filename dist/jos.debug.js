/*!
 * JOS Animation Library v1.0.0
 * https://jos-animation.vercel.app
 * (c) 2026 Jesvi Jonathan
 * Released under the MIT License
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.JOS = factory());
})(this, (function () { 'use strict';

  /**
   * Default configuration for JOS Animation Library.
   */
  const DEFAULTS = Object.freeze({
    once: false,
    animation: "fade",
    animationInverse: null,
    timingFunction: "ease-in-out",
    threshold: 0,
    duration: 0.4,
    delay: 0,
    rootMargin: "-10% 0% -40% 0%",
    startVisible: null,
    scrollDirection: null,
    mirror: null,
    passive: true,
    disable: false,
    debugMode: false,
    scrollProgressDisable: false,
  });

  /**
   * DOM utilities for JOS.
   */

  function getData(el, key, fallback) {
    const val = el.dataset[key];
    return val !== undefined ? val : fallback;
  }

  function setData(el, key, value) {
    el.dataset[key] = value;
  }

  function addClass(el, cls) {
    if (cls) el.classList.add(cls);
  }

  function removeClass(el, cls) {
    if (cls) el.classList.remove(cls);
  }

  function toggleClass(el, cls, force) {
    el.classList.toggle(cls, force);
  }

  function hasClass(el, cls) {
    return el.classList.contains(cls);
  }

  function queryAll(selector, root) {
    return Array.from((document).querySelectorAll(selector));
  }

  function byId(id) {
    return document.getElementById(id.charAt(0) === "#" ? id.slice(1) : id);
  }

  let _id = 0;
  function uniqueId(prefix) {
    return (prefix) + "_" + (++_id) + "_" + ((Math.random() * 36e4) | 0).toString(36);
  }

  /**
   * ElementManager - Element initialization, stagger children, and attribute setup.
   */

  class ElementManager {
    constructor(config) {
      this._config = config;
      this._durationSet = new Set();
      this._delaySet = new Set();
      this._startVisibleQueue = [];
    }

    get durationSet() { return this._durationSet; }
    get delaySet() { return this._delaySet; }

    initElement(el) {
      const cfg = this._config;
      const extras = [];

      // Reset any previous JOS state on re-init
      el._josState = undefined;
      el._josCooldown = false;

      if (hasClass(el, "jos_disabled")) {
        removeClass(el, "jos_disabled");
        addClass(el, "jos");
      }

      // Resolve per-element settings with fallback to globals
      const once = getData(el, "jos_once") || cfg.once;
      const animation = getData(el, "jos_animation") || cfg.animation;
      const inverse = getData(el, "jos_animationinverse") || cfg.animationInverse;
      const timing = getData(el, "jos_timingfunction") || getData(el, "jos_timingFunction") || cfg.timingFunction;
      const duration = getData(el, "jos_duration") || cfg.duration;
      const delay = getData(el, "jos_delay") || cfg.delay;
      const mirror = getData(el, "jos_mirror") || cfg.mirror;

      // Handle once
      if (once && (once === "true" || /^\d+$/.test(String(once)))) {
        setData(el, "jos_once", String(once));
      } else {
        setData(el, "jos_once", cfg.once ? "1" : "false");
      }

      // Process stagger children
      if (el.dataset.jos_stagger) {
        const children = this._initStagger(el);
        extras.push(...children);
        if (!el.dataset.jos_animation) {
          removeClass(el, "jos");
          return extras;
        }
      }

      setData(el, "jos_animation", animation);
      if (inverse) setData(el, "jos_animationinverse", inverse);
      if (timing) setData(el, "jos_timingfunction", timing);
      if (mirror === "false") setData(el, "jos_mirror", mirror);

      if (duration) {
        setData(el, "jos_duration", duration);
        this._durationSet.add(parseFloat(duration));
      }
      if (delay) {
        setData(el, "jos_delay", delay);
        this._delaySet.add(parseFloat(delay));
      }

      // Reset counter
      setData(el, "jos_counter", "0");

      // Add animation class (the "off" state)
      addClass(el, `jos-${animation}`);

      // Determine startVisible:
      // Per-element data-jos_startvisible takes priority, then global config.
      // Explicit "false" must NOT queue the element (fixes startVisible=false re-init bug).
      const svAttr = el.dataset.jos_startvisible;
      if (svAttr !== undefined && svAttr !== "false" && svAttr !== null) {
        this._startVisibleQueue.push(el);
      } else if (svAttr === undefined && cfg.startVisible) {
        this._startVisibleQueue.push(el);
      }

      // Set scroll direction
      if (cfg.scrollDirection && !el.dataset.jos_scrolldirection) {
        setData(el, "jos_scrolldirection", cfg.scrollDirection);
      }

      return extras;
    }

    _initStagger(parent) {
      const cfg = this._config;
      const created = [];

      if (!parent.id) parent.id = uniqueId("jos-stagger");

      const children = parent.children;
      const stagger = parent.dataset.jos_stagger;
      const sDelay = parseFloat(parent.dataset.jos_stagger_delay || cfg.delay);
      const sSeq = parseFloat(parent.dataset.jos_stagger_seq || 0);
      const sDur = parent.dataset.jos_stagger_duration || cfg.duration;
      const sOnce = parent.dataset.jos_stagger_once || cfg.once;
      const sInverse = parent.dataset.jos_staggerinverse || cfg.animationInverse;
      const sMirror = parent.dataset.jos_stagger_mirror || cfg.mirror;
      const sVisible = parent.dataset.jos_stagger_startVisible;
      const sDir = parent.dataset.jos_stagger_scrolldirection || cfg.scrollDirection;
      const sMargin = parent.dataset.jos_stagger_rootmargin || cfg.rootMargin;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (hasClass(child, "jos")) continue;

        addClass(child, "jos");
        if (!child.id) child.id = `${parent.id}_${i}`;

        if (parent.dataset.jos_stagger_anchor || child.dataset.jos_anchor) {
          const anchor = parent.dataset.jos_stagger_anchor === "true"
            ? `#${parent.id}`
            : parent.dataset.jos_stagger_anchor;
          setData(child, "jos_anchor", anchor);
        }

        setData(child, "jos_animation", stagger);
        if (sInverse) setData(child, "jos_animationinverse", sInverse);
        setData(child, "jos_duration", sDur);
        setData(child, "jos_delay", parseFloat(sSeq * i + sDelay));
        setData(child, "jos_once", sOnce);
        if (sMirror === "false") setData(child, "jos_mirror", "false");
        if (sVisible) this._startVisibleQueue.push(child);
        if (sDir) setData(child, "jos_scrolldirection", sDir);
        if (sMargin) setData(child, "jos_rootmargin", sMargin);

        // Pass-through attributes
        const pass = [
          ["jos_stagger_scroll", "jos_scroll"],
          ["jos_stagger_timingFunction", "jos_timingfunction"],
          ["jos_stagger_invoke", "jos_invoke"],
          ["jos_stagger_invoke_out", "jos_invoke_out"],
        ];
        for (let j = 0; j < pass.length; j++) {
          if (parent.dataset[pass[j][0]]) setData(child, pass[j][1], parent.dataset[pass[j][0]]);
        }

        created.push(child);
      }

      return created;
    }

    processStartVisible() {
      const cfg = this._config;
      // Use rAF instead of setTimeout(100) for faster first paint
      requestAnimationFrame(() => {
        for (let i = 0; i < this._startVisibleQueue.length; i++) {
          const el = this._startVisibleQueue[i];
          const val = el.dataset.jos_startvisible;
          const delayMs = val === "true" ? 0 : parseInt(val, 10) || cfg.startVisible || 0;

          if (delayMs <= 0) {
            removeClass(el, `jos-${el.dataset.jos_animation}`);
          } else {
            setTimeout(() => { removeClass(el, `jos-${el.dataset.jos_animation}`); }, delayMs);
          }
        }
      });
    }

    unsetElements(elements, state) {
      if (!elements) return;
      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        removeClass(el, "jos");
        addClass(el, "jos_disabled");
        if (state === 0) {
          addClass(el, `jos-${el.dataset.jos_animation}`);
        } else {
          removeClass(el, `jos-${el.dataset.jos_animation}`);
        }
      }
    }
  }

  /**
   * ObserverManager - Manages IntersectionObserver instances for JOS elements.
   */

  class ObserverManager {
    constructor(config, scrollTracker) {
      this._config = config;
      this._scrollTracker = scrollTracker;
      this._observers = [];
      this._minCooldownMs = 50;
      this._lastScrollX = 0;
      this._lastScrollY = 0;

      // Track horizontal scroll for left/right direction (#33)
      if (typeof window !== "undefined") {
        this._lastScrollX = window.scrollX || window.pageXOffset || 0;
        this._lastScrollY = window.scrollY || window.pageYOffset || 0;
      }
    }

    observe(el) {
      const rootMargin = this._computeRootMargin(el);
      const observer = new IntersectionObserver(
        (entries) => this._handleIntersection(entries, observer),
        {
          rootMargin,
          threshold: parseFloat(el.dataset.jos_threshold || this._config.threshold),
        }
      );
      this._observers.push(observer);
      observer.observe(el);
    }

    observeAnchor(el) {
      const anchorId = el.dataset.jos_anchor;
      const anchorEl = byId(anchorId);
      if (!anchorEl) {
        if (this._config.debugMode) console.warn(`[JOS] Anchor "${anchorId}" not found`);
        return;
      }

      const rootMargin = this._computeRootMargin(el);
      const observer = new IntersectionObserver(
        (entries) => this._handleAnchorIntersection(entries, observer),
        {
          rootMargin,
          threshold: parseFloat(el.dataset.jos_threshold || this._config.threshold),
        }
      );
      this._observers.push(observer);
      observer.observe(anchorEl);
    }

    disconnectAll() {
      for (let i = 0; i < this._observers.length; i++) {
        this._observers[i].disconnect();
      }
      this._observers.length = 0;
    }

    /**
     * Compute rootMargin from element data attrs, falling back to global config.
     * Supports per-element data-jos_rootmargin="..." (#47) and
     * individual data-jos_rootmargin_top/right/bottom/left.
     * Supports px, %, vw, vh, rem units (#27).
     */
    _computeRootMargin(el) {
      // Per-element shorthand takes priority (#47)
      const perElem = el.dataset.jos_rootmargin;
      const base = perElem || this._config.rootMargin;
      const parts = base.trim().split(/\s+/);

      const top = el.dataset.jos_rootmargin_top || parts[0] || "0%";
      const right = el.dataset.jos_rootmargin_right || parts[1] || "0%";
      const bottom = el.dataset.jos_rootmargin_bottom || parts[2] || "0%";
      const left = el.dataset.jos_rootmargin_left || parts[3] || "0%";

      // Invert sign: JOS positive=inward, IO negative=inward
      return [top, right, bottom, left].map(this._invertValue).join(" ");
    }

    /**
     * Invert a single margin value (supports any CSS unit).
     */
    _invertValue(v) {
      if (v.startsWith("-")) return v.slice(1);
      if (v === "0" || v === "0%" || v === "0px") return v;
      return `-${v}`;
    }

    /**
     * Detect scroll direction: up, down, left, right (#33).
     */
    _getScrollDirection(entry) {
      const curY = window.scrollY || window.pageYOffset || 0;
      const curX = window.scrollX || window.pageXOffset || 0;
      const dy = curY - this._lastScrollY;
      const dx = curX - this._lastScrollX;
      this._lastScrollY = curY;
      this._lastScrollX = curX;

      // Dominant axis
      if (Math.abs(dy) >= Math.abs(dx)) {
        return dy >= 0 ? "down" : "up";
      }
      return dx >= 0 ? "right" : "left";
    }

    /**
     * Cooldown = max(50ms, transition duration) so the animation finishes
     * before state can flip.  Prevents the IO feedback loop where an
     * animation that changes element geometry triggers an immediate
     * reverse callback.
     */
    _getCooldownMs(el) {
      var dur = parseFloat(el.dataset.jos_duration || this._config.duration) || 0.4;
      return Math.max(this._minCooldownMs, dur * 1000);
    }

    _shouldRespond(el, scrollDir) {
      const filter = el.dataset.jos_scrolldirection;
      if (!filter || filter === "none") return true;
      return filter === scrollDir;
    }

    _handleIntersection(entries, observer) {
      if (this._config.disable) return;
      const entry = entries[0];
      const el = entry.target;
      const animation = el.dataset.jos_animation;
      const inverse = el.dataset.jos_animationinverse;
      const dir = this._getScrollDirection(entry);

      if (entry.isIntersecting) {
        this._onEnter(el, animation, inverse, observer);
      } else {
        this._onLeave(el, animation, inverse, dir);
      }
    }

    _handleAnchorIntersection(entries, observer) {
      if (this._config.disable) return;
      const entry = entries[0];
      const anchor = entry.target;
      const elements = queryAll(`[data-jos_anchor='#${anchor.id}']`);
      const dir = this._getScrollDirection(entry);

      for (let i = 0; i < elements.length; i++) {
        const el = elements[i];
        const animation = el.dataset.jos_animation;
        const inverse = el.dataset.jos_animationinverse;

        if (entry.isIntersecting) {
          this._onAnchorEnter(el, animation, inverse, observer, anchor);
        } else {
          this._onAnchorLeave(el, animation, inverse, dir);
        }
      }
    }

    _onEnter(el, animation, inverse, observer) {
      if (el._josState === "in" || el._josCooldown) return;
      el._josState = "in";
      el._josCooldown = true;
      setTimeout(() => { el._josCooldown = false; }, this._getCooldownMs(el));

      if (el.dataset.jos_scroll && el.dataset.jos_scroll !== "false") {
        this._scrollTracker.track(el);
      }

      this._incrementCounter(el);

      if (el.dataset.jos_mirror === "false") {
        removeClass(el, "jos-no-mirror");
      }

      // Remove hidden/off-screen state
      if (animation) {
        removeClass(el, `jos-${animation}`);
      }
      // Clean up inverse from a previous leave cycle
      if (inverse) {
        removeClass(el, `jos-${inverse}`);
      }

      this._invokeCallback(el, "jos_invoke");
      if (animation) this._handleOnce(el, observer);
    }

    _onLeave(el, animation, inverse, scrollDir) {
      if (el._josState === "out" || el._josCooldown) return;

      // Check direction filter BEFORE committing state change
      if (!this._shouldRespond(el, scrollDir)) return;

      var prevState = el._josState; // undefined on first IO, "in" after real enter
      el._josState = "out";
      el._josCooldown = true;
      setTimeout(() => { el._josCooldown = false; }, this._getCooldownMs(el));

      toggleClass(el, "jos-no-mirror", el.dataset.jos_mirror === "false");

      // Only use inverse after element has been entered at least once.
      // On initial IO false callback (_josState was undefined), use the
      // base animation so "static" elements stay visible until first enter.
      var useInverse = inverse && prevState === "in";

      if (useInverse) {
        addClass(el, `jos-${inverse}`);
      } else if (animation) {
        addClass(el, `jos-${animation}`);
      }

      this._invokeCallback(el, "jos_invoke_out");

      // Don't untrack anchor-to-anchor elements — they track between anchors, not viewport
      if (el.dataset.jos_scroll && el.dataset.jos_scroll !== "false") {
        if (!el.dataset.jos_scroll_start && !el.dataset.jos_scroll_end) {
          this._scrollTracker.untrack(el);
        }
      }
    }

    _onAnchorEnter(el, animation, inverse, observer, anchor) {
      if (el._josState === "in" || el._josCooldown) return;
      el._josState = "in";
      el._josCooldown = true;
      setTimeout(() => { el._josCooldown = false; }, this._getCooldownMs(el));

      this._incrementCounter(el);

      if (animation) {
        removeClass(el, `jos-${animation}`);
      }
      // Clean up inverse from previous leave
      if (inverse) {
        removeClass(el, `jos-${inverse}`);
      }

      this._invokeCallback(el, "jos_invoke");

      if (animation) {
        const once = el.dataset.jos_once;
        if (once && (once === "true" || parseInt(el.dataset.jos_counter) >= parseInt(once))) {
          const siblings = queryAll(`[data-jos_anchor='#${anchor.id}']`);
          if (siblings.length < 2) {
            observer.unobserve(anchor);
          } else {
            el.removeAttribute("data-jos_anchor");
          }
        }
      }
    }

    _onAnchorLeave(el, animation, inverse, scrollDir) {
      if (el._josState === "out" || el._josCooldown) return;
      if (!this._shouldRespond(el, scrollDir)) return;

      var prevState = el._josState;
      el._josState = "out";
      el._josCooldown = true;
      setTimeout(() => { el._josCooldown = false; }, this._getCooldownMs(el));

      var useInverse = inverse && prevState === "in";

      if (useInverse) {
        addClass(el, `jos-${inverse}`);
      } else if (animation) {
        addClass(el, `jos-${animation}`);
      }

      this._invokeCallback(el, "jos_invoke_out");
    }

    _incrementCounter(el) {
      el.dataset.jos_counter = (parseInt(el.dataset.jos_counter || 0) + 1).toString();
    }

    _handleOnce(el, observer) {
      const once = el.dataset.jos_once;
      if (!once || once === "false") return;
      if (once === "true" || parseInt(el.dataset.jos_counter) >= parseInt(once)) {
        observer.unobserve(el);
      }
    }

    _invokeCallback(el, attr) {
      const fnName = el.dataset[attr];
      if (!fnName) return;
      const fn = typeof window !== "undefined" && window[fnName];
      if (typeof fn === "function") {
        try { fn(el); } catch (e) {
          if (this._config.debugMode) console.warn(`[JOS] Callback "${fnName}" error:`, e);
        }
      }
    }
  }

  /**
   * ScrollTracker - Scroll progress tracking with CSS custom properties (#26).
   * Uses requestAnimationFrame for jank-free updates.
   *
   * Progress is 0% when element top hits the BOTTOM trigger line,
   * and 100% when element top hits the TOP trigger line.
   *
   * Modes:
   * - Element-to-viewport: uses rootMargin trigger zone
   * - Anchor-to-anchor: data-jos_scroll_start="#a" data-jos_scroll_end="#b"
   * - Horizontal: data-jos_scroll_axis="x"
   */
  class ScrollTracker {
    constructor() {
      this._elements = new Set();
      this._ticking = false;
      this._onScroll = this._onScroll.bind(this);
      this._update = this._update.bind(this);
      this._bound = false;
      this._config = null;
    }

    setConfig(config) {
      this._config = config;
    }

    track(el) {
      this._elements.add(el);
      if (!this._bound) {
        document.addEventListener("scroll", this._onScroll, { passive: true });
        window.addEventListener("resize", this._onScroll, { passive: true });
        this._bound = true;
      }
      if (!this._ticking) {
        this._ticking = true;
        requestAnimationFrame(this._update);
      }
    }

    untrack(el) {
      this._elements.delete(el);
      if (this._bound && this._elements.size === 0) {
        document.removeEventListener("scroll", this._onScroll);
        window.removeEventListener("resize", this._onScroll);
        this._bound = false;
      }
    }

    destroy() {
      this._elements.clear();
      if (this._bound) {
        document.removeEventListener("scroll", this._onScroll);
        window.removeEventListener("resize", this._onScroll);
        this._bound = false;
      }
    }

    _onScroll() {
      if (!this._ticking) {
        this._ticking = true;
        requestAnimationFrame(this._update);
      }
    }

    _update() {
      this._ticking = false;
      var wh = window.innerHeight;
      var ww = window.innerWidth;
      var cfg = this._config;
      // Global rootMargin as fallback (JOS convention: positive = inward)
      var globalMargin = cfg ? cfg.rootMargin : "0% 0% 0% 0%";

      for (var el of this._elements) {
        var cbName = el.dataset.jos_scroll;
        if (!cbName || cbName === "false") continue;

        var startId = el.dataset.jos_scroll_start;
        var endId = el.dataset.jos_scroll_end;
        var sp, wp;

        if (startId && endId) {
          // ─── Anchor-to-anchor progress ───
          // 0% when viewport center is at start anchor, 100% at end anchor
          var sEl = document.getElementById(startId.charAt(0) === "#" ? startId.slice(1) : startId);
          var eEl = document.getElementById(endId.charAt(0) === "#" ? endId.slice(1) : endId);
          if (sEl && eEl) {
            var sR = sEl.getBoundingClientRect();
            var eR = eEl.getBoundingClientRect();
            var sY = sR.top + sR.height * 0.5;
            var eY = eR.top + eR.height * 0.5;
            var vc = wh * 0.5;
            // eY > sY (end is below start in viewport coords because it's further down the page)
            // As we scroll down, both decrease. Progress goes 0→1 as vc moves from sY to eY.
            var denom = eY - sY;
            sp = Math.abs(denom) > 0.5 ? (vc - sY) / denom : 0;
          } else {
            sp = 0;
          }
          sp = sp < 0 ? 0 : sp > 1 ? 1 : sp;
          wp = sEl ? sEl.getBoundingClientRect().top / wh : 0;
        } else if ((el.dataset.jos_scroll_axis || "y") === "x") {
          // ─── Horizontal progress ───
          // Use left/right rootMargin trigger lines analogous to vertical top/bottom
          var marginStrX = el.dataset.jos_rootmargin || globalMargin;
          var mvx = marginStrX.trim().split(/\s+/);
          var rightInset = this._parsePx(mvx[1] || "0%", ww);
          var leftInset = this._parsePx(mvx[3] || mvx[1] || "0%", ww);

          // Trigger positions (px from left of viewport)
          var leftTrigger = Math.abs(leftInset);
          var rightTrigger = ww - Math.abs(rightInset);

          var rect = el.getBoundingClientRect();
          var zoneX = rightTrigger - leftTrigger;

          // 0% when rect.left = rightTrigger, 100% when rect.left = leftTrigger
          sp = zoneX > 0 ? (rightTrigger - rect.left) / zoneX : 0;
          sp = sp < 0 ? 0 : sp > 1 ? 1 : sp;
          wp = rect.left / ww;
        } else {
          // ─── Vertical progress (default) ───
          // Use rootMargin trigger lines: 0% at bottom trigger, 100% at top trigger
          var marginStr = el.dataset.jos_rootmargin || globalMargin;
          var mv = marginStr.trim().split(/\s+/);
          var topInset = this._parsePx(mv[0] || "0%", wh);
          var bottomInset = this._parsePx(mv[2] || mv[0] || "0%", wh);

          // Trigger positions (px from top of viewport)
          // rootMargin "10% 0% 30% 0%" → topTrigger at 10% from top, bottomTrigger at 30% from bottom
          var topTrigger = Math.abs(topInset);
          var bottomTrigger = wh - Math.abs(bottomInset);

          var rect2 = el.getBoundingClientRect();
          var zone = bottomTrigger - topTrigger;

          // 0% when rect.top = bottomTrigger, 100% when rect.top = topTrigger
          sp = zone > 0 ? (bottomTrigger - rect2.top) / zone : 0;
          sp = sp < 0 ? 0 : sp > 1 ? 1 : sp;
          wp = rect2.top / wh;
        }

        // Attach data for callback access
        el.jos = {
          scrollProgress: sp,
          scrollProgressReverse: 1 - sp,
          windowScrollProgress: wp,
          rootScrollProgress: sp,
          percent: Math.round(sp * 100),
        };

        // CSS custom properties (#26)
        var st = el.style;
        var s4 = sp.toFixed(4);
        var sr4 = (1 - sp).toFixed(4);
        st.setProperty("--jos_scroll", s4);
        st.setProperty("--jos_scroll_reverse", sr4);
        st.setProperty("--jos_scroll_perc", (sp * 100).toFixed(1) + "%");
        st.setProperty("--jos_scroll_deg", (sp * 360).toFixed(1) + "deg");
        st.setProperty("--jos_windowScroll", wp.toFixed(4));
        st.setProperty("--jos_windowScroll_reverse", (1 - wp).toFixed(4));
        st.setProperty("--jos_rootScroll", s4);
        st.setProperty("--jos_rootScroll_reverse", sr4);

        if (typeof window !== "undefined" && typeof window[cbName] === "function") {
          try { window[cbName](el); } catch (_) { /* silent */ }
        }
      }
    }

    _parsePx(val, viewportSize) {
      if (!val) return 0;
      var num = parseFloat(val);
      if (isNaN(num)) return 0;
      if (val.endsWith("px")) return num;
      if (val.endsWith("vw")) return (num * window.innerWidth) / 100;
      if (val.endsWith("vh")) return (num * window.innerHeight) / 100;
      if (val.endsWith("rem")) {
        var fs = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        return num * fs;
      }
      return (num * viewportSize) / 100;
    }
  }

  /**
   * StyleManager - Dynamic stylesheet injection for JOS.
   */
  class StyleManager {
    constructor() {
      this._el = null;
      this._sheet = null;
    }

    create(config, durations, delays) {
      // Remove previous stylesheet on re-init
      this.destroy();

      const style = document.createElement("style");
      style.setAttribute("data-jos", "");
      document.head.appendChild(style);
      this._el = style;
      this._sheet = style.sheet;

      const s = this._sheet;
      s.insertRule(".jos-no-mirror { transition: 0s forwards !important; }");

      const t = `all ${config.duration}s ${config.timingFunction} ${config.delay}s`;
      s.insertRule(`.jos { transition: ${t}; }`);

      for (const v of durations) {
        s.insertRule(`[data-jos_duration="${v}"] { transition-duration: ${v}s !important; }`);
      }
      for (const v of delays) {
        s.insertRule(`[data-jos_delay="${v}"] { transition-delay: ${v}s !important; }`);
      }
    }

    disable() {
      if (this._sheet) this._sheet.disabled = true;
    }

    destroy() {
      if (this._el && this._el.parentNode) {
        this._el.parentNode.removeChild(this._el);
      }
      this._el = null;
      this._sheet = null;
    }
  }

  /**
   * DebugOverlay - Draggable trigger lines for JOS debug mode.
   * Shows top/right/bottom/left trigger lines that can be dragged to adjust rootMargin.
   * Calls onChange(topPct, rightPct, bottomPct, leftPct) when any line is dragged.
   */
  class DebugOverlay {
    constructor() {
      this._container = null;
      this._active = false;
      this._onResize = null;
      this.onChange = null;
      this._pcts = { top: 0, right: 0, bottom: 0, left: 0 };
      this._lines = {};
    }

    create(config) {
      if (this._active) this.destroy();
      if (typeof document === "undefined") return;

      var self = this;
      var wh = window.innerHeight;
      var ww = window.innerWidth;
      var parts = config.rootMargin.trim().split(/\s+/);
      this._pcts.top = Math.abs(parseFloat(parts[0]) || 0);
      this._pcts.right = Math.abs(parseFloat(parts[1] || parts[0]) || 0);
      this._pcts.bottom = Math.abs(parseFloat(parts[2] || parts[0]) || 0);
      this._pcts.left = Math.abs(parseFloat(parts[3] || parts[1] || parts[0]) || 0);

      var c = document.createElement("div");
      c.setAttribute("data-jos-debug", "");
      c.style.cssText = "position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:99999;" +
        "opacity:0;transition:opacity 0.4s;";

      // Auto-show: find sentinel [data-jos-debug-after], show overlay when it enters viewport
      this._showObserver = null;
      var sentinel = document.querySelector("[data-jos-debug-after]");
      if (sentinel) {
        this._showObserver = new IntersectionObserver(function (entries) {
          if (entries[0].isIntersecting) {
            c.style.opacity = "0";
          } else {
            c.style.opacity = "1";
          }
        }, { threshold: 0 });
        this._showObserver.observe(sentinel);
      } else {
        // No sentinel — show immediately
        c.style.opacity = "1";
      }

      // Top line (horizontal, from top)
      var topPx = (this._pcts.top / 100) * wh;
      this._lines.top = this._makeHLine(topPx, "top");
      c.appendChild(this._lines.top.line);

      // Bottom line (horizontal, from bottom)
      var bottomPx = (this._pcts.bottom / 100) * wh;
      this._lines.bottom = this._makeHLine(bottomPx, "bottom");
      c.appendChild(this._lines.bottom.line);

      // Right line (vertical, from right) — only if > 0
      var rightPx = (this._pcts.right / 100) * ww;
      this._lines.right = this._makeVLine(rightPx, "right");
      c.appendChild(this._lines.right.line);
      if (this._pcts.right <= 0) this._lines.right.line.style.display = "none";

      // Left line (vertical, from left) — only if > 0
      var leftPx = (this._pcts.left / 100) * ww;
      this._lines.left = this._makeVLine(leftPx, "left");
      c.appendChild(this._lines.left.line);
      if (this._pcts.left <= 0) this._lines.left.line.style.display = "none";

      document.body.appendChild(c);
      this._container = c;
      this._active = true;

      this._updateLabels();

      // Show anchor markers (green start, orange end)
      this._createAnchorMarkers(c);

      // ─── Drag handling ───
      var dragging = null;
      var startPointer = 0;
      var startPx2 = 0;

      function onPointerDown(e) {
        var x = e.clientX;
        var y = e.clientY;
        var h = window.innerHeight;
        var w = window.innerWidth;
        var threshold = 14;

        var tY = (self._pcts.top / 100) * h;
        var bY = h - (self._pcts.bottom / 100) * h;
        // Clamp to at least 6px from edge so lines at 0% are still reachable
        var rX = Math.min(w - 6, w - (self._pcts.right / 100) * w);
        var lX = Math.max(6, (self._pcts.left / 100) * w);

        if (Math.abs(y - tY) < threshold) {
          dragging = "top"; startPointer = y; startPx2 = tY;
        } else if (Math.abs(y - bY) < threshold) {
          dragging = "bottom"; startPointer = y; startPx2 = bY;
        } else if (Math.abs(x - lX) < threshold) {
          dragging = "left"; startPointer = x; startPx2 = (self._pcts.left / 100) * w;
        } else if (Math.abs(x - rX) < threshold) {
          dragging = "right"; startPointer = x; startPx2 = w - (self._pcts.right / 100) * w;
        } else {
          return;
        }
        e.preventDefault();
        var isH = dragging === "top" || dragging === "bottom";
        document.body.style.cursor = isH ? "ns-resize" : "ew-resize";
        document.body.style.userSelect = "none";
      }

      function onPointerMove(e) {
        if (!dragging) return;
        var h = window.innerHeight;
        var w = window.innerWidth;

        if (dragging === "top") {
          var dy = e.clientY - startPointer;
          var pct = Math.max(0, Math.min(50, ((startPx2 + dy) / h) * 100));
          self._pcts.top = pct;
          self._lines.top.line.style.top = ((pct / 100) * h) + "px";
        } else if (dragging === "bottom") {
          var dy2 = e.clientY - startPointer;
          var fromBtm = h - (startPx2 + dy2);
          var pct2 = Math.max(0, Math.min(50, (fromBtm / h) * 100));
          self._pcts.bottom = pct2;
          self._lines.bottom.line.style.bottom = ((pct2 / 100) * h) + "px";
        } else if (dragging === "left") {
          var dx = e.clientX - startPointer;
          var pct3 = Math.max(0, Math.min(50, ((startPx2 + dx) / w) * 100));
          self._pcts.left = pct3;
          self._lines.left.line.style.left = ((pct3 / 100) * w) + "px";
          self._lines.left.line.style.display = pct3 > 0 ? "" : "none";
        } else if (dragging === "right") {
          var dx2 = e.clientX - startPointer;
          var fromRt = w - (startPx2 + dx2);
          var pct4 = Math.max(0, Math.min(50, (fromRt / w) * 100));
          self._pcts.right = pct4;
          self._lines.right.line.style.right = ((pct4 / 100) * w) + "px";
          self._lines.right.line.style.display = pct4 > 0 ? "" : "none";
        }
        self._updateLabels();
      }

      function onPointerUp() {
        if (!dragging) return;
        dragging = null;
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
        if (self.onChange) {
          self.onChange(self._pcts.top, self._pcts.right, self._pcts.bottom, self._pcts.left);
        }
      }

      document.addEventListener("pointerdown", onPointerDown);
      document.addEventListener("pointermove", onPointerMove);
      document.addEventListener("pointerup", onPointerUp);

      this._cleanupDrag = function () {
        document.removeEventListener("pointerdown", onPointerDown);
        document.removeEventListener("pointermove", onPointerMove);
        document.removeEventListener("pointerup", onPointerUp);
      };

      // ─── Resize + scroll → update positions ───
      this._onResize = function () {
        if (!self._active) return;
        var h = window.innerHeight;
        var w = window.innerWidth;
        self._lines.top.line.style.top = ((self._pcts.top / 100) * h) + "px";
        self._lines.bottom.line.style.bottom = ((self._pcts.bottom / 100) * h) + "px";
        self._lines.right.line.style.right = ((self._pcts.right / 100) * w) + "px";
        self._lines.left.line.style.left = ((self._pcts.left / 100) * w) + "px";
        self._updateAnchorPositions();
      };
      window.addEventListener("resize", this._onResize, { passive: true });
      document.addEventListener("scroll", this._onResize, { passive: true });
    }

    /** Horizontal line (top or bottom) — spans full width, with glowing grab handle below label */
    _makeHLine(posPx, side) {
      var isTop = side === "top";
      var line = document.createElement("div");
      line.style.cssText =
        "position:absolute;left:0;right:0;height:2px;" +
        "background:rgba(99,102,241,0.25);" +
        "border-" + (isTop ? "bottom" : "top") + ":1px dashed rgba(99,102,241,0.5);" +
        "cursor:ns-resize;pointer-events:auto;padding:5px 0;margin:-5px 0;" +
        "background-clip:content-box;" +
        (isTop ? "top:" + posPx + "px;" : "bottom:" + posPx + "px;");

      // Label + handle wrapper (stacked vertically, right side)
      var wrapper = document.createElement("div");
      wrapper.style.cssText =
        "position:absolute;right:12px;pointer-events:none;" +
        "display:flex;flex-direction:column;align-items:center;gap:3px;" +
        (isTop ? "top:6px;" : "bottom:6px;");

      var label = document.createElement("div");
      label.style.cssText =
        "font:11px/1.3 monospace;color:rgba(99,102,241,0.85);background:rgba(9,9,11,0.9);" +
        "padding:2px 6px;border-radius:3px;white-space:nowrap;";

      // Glowing grab bar (below label)
      var handle = document.createElement("div");
      handle.style.cssText =
        "width:36px;height:8px;border-radius:4px;" +
        "background:rgba(99,102,241,0.6);" +
        "box-shadow:0 0 8px rgba(99,102,241,0.7),0 0 16px rgba(99,102,241,0.3);";

      wrapper.appendChild(label);
      wrapper.appendChild(handle);
      line.appendChild(wrapper);

      return { line: line, label: label, handle: handle };
    }

    /** Vertical line (left or right) — spans full height, with glowing grab handle below label */
    _makeVLine(posPx, side) {
      var isLeft = side === "left";
      var line = document.createElement("div");
      line.style.cssText =
        "position:absolute;top:0;bottom:0;width:2px;" +
        "background:rgba(99,102,241,0.25);" +
        "border-" + (isLeft ? "right" : "left") + ":1px dashed rgba(99,102,241,0.5);" +
        "cursor:ew-resize;pointer-events:auto;padding:0 5px;margin:0 -5px;" +
        "background-clip:content-box;" +
        (isLeft ? "left:" + posPx + "px;" : "right:" + posPx + "px;");

      // Label + handle wrapper (stacked vertically, bottom area)
      var wrapper = document.createElement("div");
      wrapper.style.cssText =
        "position:absolute;bottom:24px;pointer-events:none;" +
        "display:flex;flex-direction:column;align-items:center;gap:3px;" +
        (isLeft ? "left:6px;" : "right:6px;");

      var label = document.createElement("div");
      label.style.cssText =
        "font:11px/1.3 monospace;color:rgba(99,102,241,0.85);background:rgba(9,9,11,0.9);" +
        "padding:2px 6px;border-radius:3px;white-space:nowrap;";

      // Glowing grab bar (below label)
      var handle = document.createElement("div");
      handle.style.cssText =
        "width:8px;height:36px;border-radius:4px;" +
        "background:rgba(99,102,241,0.6);" +
        "box-shadow:0 0 8px rgba(99,102,241,0.7),0 0 16px rgba(99,102,241,0.3);";

      wrapper.appendChild(label);
      wrapper.appendChild(handle);
      line.appendChild(wrapper);

      return { line: line, label: label, handle: handle };
    }

    /** Show anchor markers for elements with data-jos_scroll_start / data-jos_scroll_end */
    _createAnchorMarkers(container) {
      this._anchorEls = [];
      var anchors = document.querySelectorAll("[data-jos_scroll_start][data-jos_scroll_end]");
      for (var i = 0; i < anchors.length; i++) {
        var el = anchors[i];
        var sId = el.dataset.jos_scroll_start;
        var eId = el.dataset.jos_scroll_end;
        var sEl = document.getElementById(sId.charAt(0) === "#" ? sId.slice(1) : sId);
        var eEl = document.getElementById(eId.charAt(0) === "#" ? eId.slice(1) : eId);
        if (!sEl || !eEl) continue;

        // ─── Fixed vertical progress indicator (left edge) ───
        var panel = document.createElement("div");
        panel.style.cssText =
          "position:fixed;left:10px;top:50%;transform:translateY(-50%);" +
          "width:32px;pointer-events:none;z-index:99999;" +
          "display:flex;flex-direction:column;align-items:center;gap:0;" +
          "opacity:0;transition:opacity 0.3s;";

        // Start label
        var sLabel = document.createElement("div");
        sLabel.style.cssText =
          "font:9px/1.2 monospace;color:rgba(52,211,153,0.9);" +
          "background:rgba(9,9,11,0.9);padding:2px 4px;border-radius:3px 3px 0 0;" +
          "text-align:center;width:100%;white-space:nowrap;";
        sLabel.textContent = "0%";

        // Track background
        var track = document.createElement("div");
        track.style.cssText =
          "width:6px;height:120px;background:rgba(255,255,255,0.08);" +
          "border-radius:3px;position:relative;overflow:hidden;";

        // Fill bar
        var fill = document.createElement("div");
        fill.style.cssText =
          "position:absolute;bottom:0;left:0;right:0;height:0%;" +
          "background:linear-gradient(to top,rgba(52,211,153,0.8),rgba(99,102,241,0.8));" +
          "border-radius:3px;transition:height 0.05s linear;" +
          "box-shadow:0 0 6px rgba(52,211,153,0.5);";
        track.appendChild(fill);

        // End label
        var eLabel = document.createElement("div");
        eLabel.style.cssText =
          "font:9px/1.2 monospace;color:rgba(251,146,60,0.9);" +
          "background:rgba(9,9,11,0.9);padding:2px 4px;border-radius:0 0 3px 3px;" +
          "text-align:center;width:100%;white-space:nowrap;";
        eLabel.textContent = "100%";

        // Percent badge (center)
        var badge = document.createElement("div");
        badge.style.cssText =
          "font:bold 11px/1.2 monospace;color:#fff;" +
          "background:rgba(9,9,11,0.9);border:1px solid rgba(99,102,241,0.4);" +
          "padding:2px 5px;border-radius:3px;margin-top:4px;" +
          "text-align:center;white-space:nowrap;" +
          "box-shadow:0 0 8px rgba(99,102,241,0.3);";
        badge.textContent = "0%";

        panel.appendChild(sLabel);
        panel.appendChild(track);
        panel.appendChild(eLabel);
        panel.appendChild(badge);
        container.appendChild(panel);

        this._anchorEls.push({
          sEl: sEl, eEl: eEl,
          sId: sId, eId: eId,
          trackedEl: el,
          panel: panel,
          fill: fill,
          badge: badge,
          sLabel: sLabel,
          eLabel: eLabel,
        });
      }
      this._updateAnchorPositions();
    }

    _updateAnchorPositions() {
      if (!this._anchorEls) return;
      var wh = window.innerHeight;
      var vc = wh * 0.5;

      for (var i = 0; i < this._anchorEls.length; i++) {
        var a = this._anchorEls[i];
        var sR = a.sEl.getBoundingClientRect();
        var eR = a.eEl.getBoundingClientRect();
        var sY = sR.top + sR.height * 0.5;
        var eY = eR.top + eR.height * 0.5;

        // Progress: 0 at start, 1 at end
        var denom = eY - sY;
        var progress = Math.abs(denom) > 0.5 ? (vc - sY) / denom : 0;
        var inRange = progress > 0 && progress < 1;
        var pct = Math.round(Math.max(0, Math.min(1, progress)) * 100);

        // Show / hide debug panel only (don't touch the page element)
        a.panel.style.opacity = inRange ? "1" : "0";

        // Update fill + badge
        a.fill.style.height = pct + "%";
        a.badge.textContent = pct + "%";
        a.sLabel.textContent = a.sId.replace(/^#/, "");
        a.eLabel.textContent = a.eId.replace(/^#/, "");
      }
    }

    _updateLabels() {
      var p = this._pcts;
      if (this._lines.top) this._lines.top.label.textContent = "top: " + Math.round(p.top) + "%";
      if (this._lines.bottom) this._lines.bottom.label.textContent = "bottom: " + Math.round(p.bottom) + "%";
      if (this._lines.right) this._lines.right.label.textContent = "right: " + Math.round(p.right) + "%";
      if (this._lines.left) this._lines.left.label.textContent = "left: " + Math.round(p.left) + "%";
    }

    destroy() {
      if (this._container && this._container.parentNode) {
        this._container.parentNode.removeChild(this._container);
      }
      if (this._onResize) {
        window.removeEventListener("resize", this._onResize);
        document.removeEventListener("scroll", this._onResize);
      }
      if (this._cleanupDrag) this._cleanupDrag();
      if (this._showObserver) { this._showObserver.disconnect(); this._showObserver = null; }
      this._container = null;
      this._active = false;
      this._lines = {};
      this._anchorEls = null;
    }
  }

  /**
   * JOS - JavaScript On Scroll Animation Library
   *
   * @version 1.0.0
   * @author Jesvi Jonathan
   * @license MIT
   * @see https://jos-animation.vercel.app
   */


  class JOS {
    static version = "1.0.0";
    static author = "Jesvi Jonathan";
    static webpage = "https://jos-animation.vercel.app";
    static github = "https://github.com/jesvijonathan/JOS-Animation-Library";

    constructor() {
      this._config = { ...DEFAULTS };
      this._elements = [];
      this._scrollTracker = new ScrollTracker();
      this._observerManager = null;
      this._elementManager = null;
      this._styleManager = new StyleManager();
      this._debugOverlay = new DebugOverlay();
      this._initialized = false;
    }

    /**
     * Initialize JOS with user options.
     * On re-init, fully resets config to DEFAULTS first (#29),
     * then tears down previous state before rebuilding.
     */
    init(options = {}) {
      // On re-init: tear down old state completely
      if (this._initialized) {
        this._teardownObservers();
        this._scrollTracker.destroy();
        this._styleManager.destroy();
        this._debugOverlay.destroy();
        this._elements = [];
      }

      // Always reset to DEFAULTS, then overlay user options (#29)
      this._config = { ...DEFAULTS };
      this._applyOptions(options);

      if (this._config.disable) return;

      this._collectElements();

      if (this._config.debugMode) {
        this._printDebugInfo();
      }

      this._setup();
      this._styleManager.create(
        this._config,
        this._elementManager.durationSet,
        this._elementManager.delaySet
      );

      if (this._config.debugMode) {
        this._debugOverlay.create(this._config);
        this._debugOverlay.onChange = (topPct, rightPct, bottomPct, leftPct) => {
          var newMargin = Math.round(topPct) + "% " + Math.round(rightPct) + "% " + Math.round(bottomPct) + "% " + Math.round(leftPct) + "%";
          this.init({
            ...this._config,
            rootMargin: newMargin,
          });
        };
      }

      this._initialized = true;
    }

    /**
     * Start or restart animations.
     * @param {number} state - 0: full restart, -1: resume.
     */
    start(state = 0) {
      if (state !== -1) {
        this.stop();
        this._setup();
      }
      this._config.disable = false;
      return "Started";
    }

    /**
     * Stop animations.
     * @param {number} state - 0: stop and show, 1: stop and hide, -1: pause.
     */
    stop(state = 0) {
      const internalState = state === 0 ? 1 : state === 1 ? 0 : state;
      this._config.disable = true;

      if (internalState !== -1) {
        this._teardownElements(internalState);
      }
      return "Stopped";
    }

    /**
     * Refresh: re-scan DOM for new .jos elements.
     */
    refresh() {
      this._teardownObservers();
      this._collectElements();
      this._setup();
      return "Refreshed";
    }

    /**
     * Destroy the JOS instance completely.
     * @param {number} state - 0: preserve styles, 1: remove styles.
     */
    destroy(state = 0) {
      this._teardownObservers();
      this._scrollTracker.destroy();
      this._debugOverlay.destroy();
      this._elements = [];

      if (state === 1) {
        this._styleManager.destroy();
      }

      this._initialized = false;
      return "Destroyed";
    }

    /**
     * Print version information.
     */
    version() {
      console.log(
        `JOS v${JOS.version} | ${JOS.webpage}`
      );
    }

    // ─── Private ───────────────────────────────────────────────────

    _applyOptions(options) {
      const cfg = this._config;

      cfg.once = options.once ?? cfg.once;
      cfg.animation = options.animation ?? cfg.animation;
      cfg.animationInverse =
        options.animationInverse ?? options.animationinverse ?? cfg.animationInverse;
      cfg.timingFunction = options.timingFunction ?? cfg.timingFunction;
      cfg.threshold = options.threshold ?? cfg.threshold;
      cfg.duration = options.duration ?? cfg.duration;
      cfg.delay = options.delay ?? cfg.delay;
      cfg.startVisible = options.startVisible ?? cfg.startVisible;
      cfg.scrollDirection =
        options.scrollDirection ?? options.scrolldirection ?? cfg.scrollDirection;
      cfg.mirror = options.mirror ?? cfg.mirror;
      cfg.passive = options.passive ?? cfg.passive;
      cfg.debugMode = options.debugMode ?? cfg.debugMode;
      cfg.scrollProgressDisable =
        options.scrollProgressDisable ?? cfg.scrollProgressDisable;

      if (options.disable !== undefined) {
        cfg.disable = options.disable;
      }

      if (options.rootMargin) {
        cfg.rootMargin = options.rootMargin;
      } else if (options.rootMarginTop || options.rootMarginBottom) {
        const top = options.rootMarginTop || "-10%";
        const bottom = options.rootMarginBottom || "-40%";
        cfg.rootMargin = `${top} 0% ${bottom} 0%`;
      }
    }

    _collectElements() {
      this._elements = queryAll(".jos");
    }

    _setup() {
      this._elementManager = new ElementManager(this._config);
      this._scrollTracker.setConfig(this._config);
      this._observerManager = new ObserverManager(
        this._config,
        this._scrollTracker
      );

      const allElements = [...this._elements];

      for (const el of this._elements) {
        const extras = this._elementManager.initElement(el);
        allElements.push(...extras);
        for (const child of extras) {
          this._elementManager.initElement(child);
        }
      }

      this._elements = allElements;

      // Force reflow so the browser paints the hidden state before IO fires.
      // Without this, elements already in-viewport never transition because
      // the "from" state was never rendered.
      void document.body.offsetHeight;

      for (const el of allElements) {
        if (!el.classList.contains("jos")) continue;
        if (el.dataset.jos_anchor) {
          this._observerManager.observeAnchor(el);
        } else {
          this._observerManager.observe(el);
        }
      }

      this._elementManager.processStartVisible();

      // Immediately start tracking anchor-to-anchor elements (persistent, not viewport-gated)
      for (const el of allElements) {
        if (el.dataset.jos_scroll && el.dataset.jos_scroll !== "false" &&
            el.dataset.jos_scroll_start && el.dataset.jos_scroll_end) {
          this._scrollTracker.track(el);
        }
      }
    }

    _teardownObservers() {
      if (this._observerManager) {
        this._observerManager.disconnectAll();
      }
    }

    _teardownElements(state) {
      if (state !== -1 && this._elementManager) {
        this._elementManager.unsetElements(this._elements, state);
      }
      this._teardownObservers();
    }

    _printDebugInfo() {
      this.version();
      console.log("[JOS] Config:", { ...this._config });
      console.log(`[JOS] ${this._elements.length} elements`);
    }
  }

  /**
   * JOS - JavaScript On Scroll Animation Library
   *
   * Entry point. Creates and exports the singleton JOS instance.
   */

  const instance = new JOS();

  // UMD-style export
  if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
    module.exports = instance;
  } else if (typeof define === "function" && define.amd) {
    define([], () => instance);
  } else if (typeof window !== "undefined") {
    window.JOS = instance;
  }

  return instance;

}));
//# sourceMappingURL=jos.debug.js.map
