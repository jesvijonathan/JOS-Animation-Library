/**
 * StyleManager - Dynamic stylesheet injection for JOS.
 */
export class StyleManager {
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
