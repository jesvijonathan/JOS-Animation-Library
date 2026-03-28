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
export class ScrollTracker {
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
