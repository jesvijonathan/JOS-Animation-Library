/**
 * ObserverManager - Manages IntersectionObserver instances for JOS elements.
 */
import { addClass, removeClass, toggleClass, byId, queryAll } from "../utils/dom.js";

export class ObserverManager {
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
