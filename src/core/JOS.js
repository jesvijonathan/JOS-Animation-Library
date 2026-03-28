/**
 * JOS - JavaScript On Scroll Animation Library
 *
 * @version 1.0.0
 * @author Jesvi Jonathan
 * @license MIT
 * @see https://jos-animation.vercel.app
 */

import { DEFAULTS } from "./defaults.js";
import { ElementManager } from "./ElementManager.js";
import { ObserverManager } from "./ObserverManager.js";
import { ScrollTracker } from "./ScrollTracker.js";
import { StyleManager } from "./StyleManager.js";
import { DebugOverlay } from "./DebugOverlay.js";
import { queryAll } from "../utils/dom.js";

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

export default JOS;
