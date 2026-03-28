/**
 * ElementManager - Element initialization, stagger children, and attribute setup.
 */
import { getData, setData, addClass, removeClass, hasClass, uniqueId } from "../utils/dom.js";

export class ElementManager {
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
