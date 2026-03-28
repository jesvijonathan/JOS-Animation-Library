<p align="center">
  <a href="https://jos-animation.vercel.app">
    <img src="https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library@master/res/logo/jos_full_white.svg" alt="JOS Animation Library" height="200"/>
  </a>
</p>

<h3 align="center">JOS Animation Library</h3>

<p align="center">
  A lightweight, performant scroll animation library for the web.
  <br /><br />
  <a href="https://www.npmjs.com/package/jos-animation"><img src="https://img.shields.io/npm/v/jos-animation?color=6366f1&label=npm" alt="npm version"></a>
  <a href="https://www.jsdelivr.com/package/npm/jos-animation"><img src="https://data.jsdelivr.com/v1/package/npm/jos-animation/badge?style=rounded" alt="jsDelivr"></a>
  <a href="https://bundlephobia.com/package/jos-animation"><img src="https://img.shields.io/bundlephobia/minzip/jos-animation?color=22c55e&label=size" alt="bundle size"></a>
  <a href="https://github.com/jesvijonathan/JOS-Animation-Library/blob/master/LICENSE.md"><img src="https://img.shields.io/github/license/jesvijonathan/JOS-Animation-Library?color=blue" alt="MIT License"></a>
  <br /><br />
  <a href="https://jos-animation.vercel.app">Playground</a> · <a href="https://jesvijonathan.github.io/JOS-Animation-Library">Docs</a> · <a href="https://github.com/jesvijonathan/JOS-Animation-Library/issues">Report Bug</a> · <a href="https://github.com/jesvijonathan/JOS-Animation-Library/issues">Request Feature</a>
</p>

---

## About

JOS (JavaScript On Scroll) is a scroll animation library that uses the Intersection Observer API for high-performance, jank-free animations. Add `class="jos"` to any element and it animates on scroll — zero configuration required.

**Key features:**

- **Tiny footprint** — under 3KB gzipped
- **60+ built-in animations** — fade, slide, zoom, flip, rotate, spin, skew, filters, and more
- **Stagger support** — sequential child animations with configurable delay
- **Scroll progress callbacks** — bind element properties to scroll position
- **Direction-aware** — animate only on scroll up or down
- **Anchor triggers** — trigger animations based on another element's visibility
- **Custom animations** — define your own with simple CSS classes
- **Framework-friendly** — works with React, Vue, Angular, Svelte, Next.js, Nuxt
- **Zero dependencies** — pure JavaScript + CSS
- **ES Modules, CJS, UMD** — works everywhere

## Quick Start

### CDN (fastest)

```html
<script src="https://cdn.jsdelivr.net/npm/jos-animation@latest/dist/jos.min.js"></script>
<script>
  JOS.init();
</script>
```

That's it. The JS-only build auto-injects the required CSS. For separate CSS control:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/jos-animation@latest/dist/jos.min.css" />
<script src="https://cdn.jsdelivr.net/npm/jos-animation@latest/dist/jos.min.js"></script>
```

### npm

```bash
npm install jos-animation
```

```js
import JOS from "jos-animation";
import "jos-animation/css"; // optional — only needed if using the JS-only bundle

JOS.init();
```

### Other CDNs

```html
<!-- CDNJS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jos-animation/1.0.0/jos.min.js"></script>

<!-- unpkg -->
<script src="https://unpkg.com/jos-animation/dist/jos.min.js"></script>
```

## Usage

### 1. Add the `jos` class

```html
<div class="jos">I'll fade in on scroll</div>
```

### 2. Customize with data attributes

```html
<div
  class="jos"
  data-jos_animation="flip-up"
  data-jos_duration="0.6"
  data-jos_delay="0.2"
  data-jos_once="true"
>
  Flip up once with a delay
</div>
```

### 3. Initialize with global options

```html
<script>
  JOS.init({
    animation: "fade",         // Default animation for all elements
    duration: 0.4,             // Transition duration in seconds
    delay: 0,                  // Transition delay in seconds
    timingFunction: "ease",    // CSS timing function
    threshold: 0,              // IntersectionObserver threshold (0-1)
    rootMargin: "10% 0% 30% 0%", // Viewport margins for triggering
    once: false,               // Animate only once?
    mirror: null,              // Instant reverse on exit
    scrollDirection: null,     // "up", "down", "left", or "right"
    startVisible: null,        // true or delay in ms
    passive: true,             // Passive scroll listeners
    scrollProgressDisable: false, // Disable scroll progress tracking
    debugMode: false,          // Show debug overlay with trigger lines
  });
</script>
```

## Animations

### Transform Animations

| Category | Animations |
|----------|-----------|
| **Fade** | `fade`, `fade-up`, `fade-down`, `fade-left`, `fade-right`, `fade-left-up`, `fade-left-down`, `fade-right-up`, `fade-right-down` |
| **Slide** | `slide`, `slide-left`, `slide-up`, `slide-down`, `slide-right-up`, `slide-right-down`, `slide-left-up`, `slide-left-down` |
| **Zoom** | `zoom`, `zoom-in`, `zoom-out-right`, `zoom-out-left`, `zoom-out-up`, `zoom-out-down`, `zoom-in-right`, `zoom-in-left`, `zoom-in-up`, `zoom-in-down` |
| **Flip** | `flip`, `flip-left`, `flip-up`, `flip-down` |
| **Rotate** | `rotate`, `rotate-left` |
| **Spin** | `spin`, `spin-left` |
| **Revolve** | `revolve`, `revolve-left` |
| **Grow** | `grow`, `grow-right`, `grow-left`, `grow-up`, `grow-down` |
| **Shrink** | `shrink`, `shrink-right`, `shrink-left`, `shrink-up`, `shrink-down` |
| **Stretch** | `stretch`, `stretch-vertical` |
| **Skew** | `skew`, `skew-left`, `skew-right`, `skew-up`, `skew-down` |
| **Slant** | `slant`, `slant-right`, `slant-left` |
| **Bar** | `bar`, `bar_horizontal` |

### Filter Animations

`blur`, `grey`, `sepia`, `invert`, `brightness`, `saturate`, `hue-rotate`, `backdrop`

### Playable (Looping) Animations

`slide-play`, `slide-vertical-play`, `zoom-in-play`, `zoom-play`, `flip-play`, `rotate-play`, `spin-play`, `revolve-play`, `grow-play`, `shrink-play`, `stretch-play`, `stretch-vertical-play`, `fade-play`, `fade-horizontal-play`, `fade-vertical-play`, `blink-play`, `pulse-play`

### Utility Classes

`static`, `none`, `hidden`, `visible`, `no-transition`

## Features

### Stagger

Animate children sequentially:

```html
<div class="jos"
  data-jos_stagger="fade-up"
  data-jos_stagger_seq="0.1"
  data-jos_stagger_duration="0.5"
>
  <div>First</div>
  <div>Second (0.1s later)</div>
  <div>Third (0.2s later)</div>
</div>
```

### Scroll Direction

Animate only when scrolling in a specific direction:

```html
<div class="jos" data-jos_animation="fade-left" data-jos_scrollDirection="down">
  Only animates on scroll down
</div>
```

### Scroll Progress Callback

Bind element properties to scroll position:

```html
<div class="jos jos-no-transition" data-jos_scroll="myScrollFn" id="progress">
  0%
</div>

<script>
  function myScrollFn(el) {
    el.style.opacity = 1 - el.jos.scrollProgress;
    el.innerHTML = Math.round((1 - el.jos.scrollProgress) * 100) + "%";
  }
</script>
```

### Anchor Triggers

Animate an element based on another element's visibility:

```html
<div id="trigger-area">Scroll me into view...</div>
<div class="jos fixed-banner" data-jos_animation="fade" data-jos_anchor="#trigger-area">
  I animate when #trigger-area enters the viewport
</div>
```

### Inverse Animations

Apply a different animation on exit:

```html
<div class="jos"
  data-jos_animation="static"
  data-jos_animationinverse="my-custom-exit"
>
  Normal on enter, custom animation on exit
</div>
```

### Custom Animations

Define your own with a CSS class prefixed with `jos-`:

```css
.jos-my-animation {
  opacity: 0;
  transform: translateX(-50px) rotate(-10deg);
}
```

```html
<div class="jos" data-jos_animation="my-animation">Custom!</div>
```

### Invoke Callbacks

Run functions on enter/exit:

```html
<div class="jos"
  data-jos_invoke="onEnter"
  data-jos_invoke_out="onExit"
  data-jos_animation="fade"
>
  Check the console
</div>

<script>
  function onEnter(el) { console.log("Entered:", el); }
  function onExit(el) { console.log("Exited:", el); }
</script>
```

### Once / Repeat Count

```html
<div class="jos" data-jos_once="true">Animates once</div>
<div class="jos" data-jos_once="3">Animates 3 times</div>
```

### Start Visible

Skip initial animation for above-the-fold elements:

```html
<div class="jos" data-jos_startVisible="true">Visible immediately</div>
<div class="jos" data-jos_startVisible="2000">Visible after 2s</div>
```

### Scroll Progress CSS Custom Properties

Every element with `data-jos_scroll` gets live CSS custom properties you can use directly in CSS:

| Property | Range | Description |
|----------|-------|-------------|
| `--jos_scroll` | `0` → `1` | Scroll progress (0 at bottom trigger, 1 at top) |
| `--jos_scroll_reverse` | `1` → `0` | Inverse of `--jos_scroll` |
| `--jos_scroll_perc` | `0%` → `100%` | Progress as percentage string |
| `--jos_scroll_deg` | `0deg` → `360deg` | Progress as rotation |
| `--jos_windowScroll` | `0` → `1` | Element position relative to viewport |
| `--jos_windowScroll_reverse` | `1` → `0` | Inverse of window scroll |
| `--jos_rootScroll` | `0` → `1` | Same as `--jos_scroll` |
| `--jos_rootScroll_reverse` | `1` → `0` | Same as `--jos_scroll_reverse` |

```html
<!-- Pure CSS parallax using scroll progress -->
<div class="jos jos-no-transition"
  data-jos_scroll="true"
  style="transform: translateY(calc(var(--jos_scroll) * -50px));"
>
  Parallax element
</div>
```

### Anchor-to-Anchor Scroll Progress

Track scroll between two reference elements instead of the viewport:

```html
<div id="start-marker">Start</div>

<div class="jos jos-no-transition"
  data-jos_scroll="myCallback"
  data-jos_scroll_start="#start-marker"
  data-jos_scroll_end="#end-marker"
>
  0% at #start-marker, 100% at #end-marker
</div>

<div id="end-marker">End</div>
```

### Debug Mode

Enable `debugMode` to show an interactive overlay with draggable trigger lines:

```js
JOS.init({ debugMode: true });
```

The overlay shows top/right/bottom/left trigger lines that can be dragged to adjust `rootMargin` in real-time. Anchor-to-anchor elements get a fixed progress indicator on the left edge.

To auto-hide the overlay while the hero/landing section is visible, add a sentinel element:

```html
<div data-jos-debug-after></div>
```

The overlay hides whenever this element is in the viewport and appears once scrolled past it.

## Attributes Reference

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-jos_animation` | string | `fade` | Animation type |
| `data-jos_animationinverse` | string | — | Exit animation type |
| `data-jos_duration` | number | `0.4` | Transition duration (seconds) |
| `data-jos_delay` | number | `0` | Transition delay (seconds) |
| `data-jos_timing_function` | string | `ease-in-out` | CSS timing function |
| `data-jos_once` | bool/int | `false` | Animate once or N times |
| `data-jos_mirror` | string | — | `"false"` for instant reverse |
| `data-jos_rootmargin` | string | — | Override root margin per element |
| `data-jos_rootmargin_top` | string | — | Override top margin |
| `data-jos_rootmargin_bottom` | string | — | Override bottom margin |
| `data-jos_scrollDirection` | string | — | `"up"`, `"down"`, `"left"`, `"right"`, or `"none"` |
| `data-jos_startVisible` | bool/int | — | `true` or delay in ms |
| `data-jos_anchor` | string | — | Anchor element ID (e.g. `"#myId"`) |
| `data-jos_scroll` | string | — | Scroll progress callback function name |
| `data-jos_invoke` | string | — | Enter callback function name |
| `data-jos_invoke_out` | string | — | Exit callback function name |
| `data-jos_rootmargin_top` | string | — | Override top margin |
| `data-jos_rootmargin_right` | string | — | Override right margin |
| `data-jos_rootmargin_bottom` | string | — | Override bottom margin |
| `data-jos_rootmargin_left` | string | — | Override left margin |
| `data-jos_threshold` | number | `0` | IntersectionObserver threshold |
| `data-jos_scroll_start` | string | — | Anchor-to-anchor start element ID |
| `data-jos_scroll_end` | string | — | Anchor-to-anchor end element ID |
| `data-jos_scroll_axis` | string | `"y"` | Scroll axis: `"x"` or `"y"` |

### Stagger Attributes

| Attribute | Description |
|-----------|-------------|
| `data-jos_stagger` | Animation for children |
| `data-jos_stagger_seq` | Delay between children (seconds) |
| `data-jos_stagger_delay` | Base delay for all children |
| `data-jos_stagger_duration` | Duration for all children |
| `data-jos_stagger_once` | Once setting for children |
| `data-jos_stagger_anchor` | Anchor for children (`"true"` = parent) |
| `data-jos_stagger_mirror` | Mirror for children |
| `data-jos_stagger_rootmargin` | Root margin for children |
| `data-jos_stagger_scrolldirection` | Scroll direction for children |
| `data-jos_stagger_startVisible` | Start visible for children |
| `data-jos_stagger_scroll` | Scroll callback for children |
| `data-jos_stagger_invoke` | Enter callback for children |
| `data-jos_stagger_invoke_out` | Exit callback for children |
| `data-jos_stagger_timingFunction` | Timing function for children |
| `data-jos_staggerinverse` | Exit animation for children |

## API Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `JOS.init(options)` | Initialize with options | `options: {}` (see above) |
| `JOS.start(state)` | Start animations | `0`: full restart, `-1`: resume |
| `JOS.stop(state)` | Stop animations | `0`: stop (show), `1`: stop (hide), `-1`: pause |
| `JOS.refresh()` | Re-scan DOM for new elements | — |
| `JOS.destroy(state)` | Destroy instance | `0`: keep styles, `1`: remove styles |
| `JOS.version()` | Print version info | — |

## Framework Integration

<details>
<summary><b>React / Next.js</b></summary>

```jsx
import { useEffect } from "react";
import JOS from "jos-animation";

function App() {
  useEffect(() => {
    JOS.init({ animation: "fade", duration: 0.4 });
    return () => JOS.destroy();
  }, []);

  // Call JOS.refresh() after route changes or dynamic content
  useEffect(() => { JOS.refresh(); });

  return <div className="jos" data-jos_animation="fade-up">Hello</div>;
}
```
</details>

<details>
<summary><b>Vue / Nuxt</b></summary>

```js
// main.js
import JOS from "jos-animation";
import { watch, nextTick } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

JOS.init();

watch(() => router.currentRoute.value, () => {
  nextTick(() => JOS.refresh());
});
```
</details>

<details>
<summary><b>Angular</b></summary>

```ts
import { Component, OnInit, AfterViewChecked } from "@angular/core";
import JOS from "jos-animation";

@Component({ selector: "app-root", templateUrl: "./app.component.html" })
export class AppComponent implements OnInit, AfterViewChecked {
  ngOnInit() { JOS.init(); }
  ngAfterViewChecked() { JOS.refresh(); }
}
```
</details>

<details>
<summary><b>Svelte</b></summary>

```svelte
<script>
  import { onMount, onDestroy } from "svelte";
  import JOS from "jos-animation";

  onMount(() => JOS.init());
  onDestroy(() => JOS.destroy());
</script>

<div class="jos" data-jos_animation="fade-up">Hello from Svelte</div>
```
</details>

## Development

```bash
# Clone
git clone https://github.com/jesvijonathan/JOS-Animation-Library.git
cd JOS-Animation-Library

# Install
npm install

# Build
npm run build

# Dev (watch mode)
npm run dev
```

### Project Structure

```
src/
├── index.js              # Entry point (JS only)
├── index.full.js         # Entry point (JS + CSS embedded)
├── core/
│   ├── JOS.js            # Main JOS class
│   ├── ElementManager.js # Element initialization & stagger
│   ├── ObserverManager.js# IntersectionObserver management
│   ├── ScrollTracker.js  # Scroll progress tracking (rAF)
│   ├── StyleManager.js   # Dynamic stylesheet injection
│   ├── DebugOverlay.js   # Debug trigger line overlay
│   └── defaults.js       # Default configuration
├── utils/
│   └── dom.js            # DOM helpers
└── animations/
    └── jos.css           # All animation definitions
```

### Build Outputs

| File | Format | Use Case |
|------|--------|----------|
| `dist/jos.js` | UMD | `<script>` tag |
| `dist/jos.min.js` | UMD (minified) | Production `<script>` tag |
| `dist/jos.esm.js` | ES Module | `import` in bundlers |
| `dist/jos.cjs.js` | CommonJS | `require()` in Node |
| `dist/jos.full.js` | UMD + CSS | All-in-one `<script>` |
| `dist/jos.full.min.js` | UMD + CSS (min) | All-in-one production |
| `dist/jos.css` | CSS | Separate stylesheet |
| `dist/jos.min.css` | CSS (minified) | Production stylesheet |
| `dist/jos.debug.js` | UMD + sourcemap | Debugging |

### Releasing

Releases are automated via GitHub Actions:

1. Update version in `package.json`
2. `git tag v1.0.0 && git push --tags`
3. CI builds, tests, creates GitHub Release, and publishes to npm

## Used In

- [CIT Takshashila 23](https://2023.cittakshashila.in)
- [JOS Playground](https://jos-animation.vercel.app)
- [Bitspace](https://bitspace-nextjs-jos.vercel.app)
- [MS Agency](https://www.ms-agency.org/)
- [AI Avenue](https://ai-avenue.netlify.app/)
- [Azzle AI](https://azzle.netlify.app/)
- [mystep](https://www.mystep-s.com/)
- [kazifi-landing](https://kazifi-landing-preview.vercel.app)

*Using JOS? Open a PR to add your site!*

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run `npm run build` to verify
5. Commit and push
6. Open a Pull Request

See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## License

[MIT](LICENSE.md) — by [Jesvi Jonathan](https://github.com/jesvijonathan)
