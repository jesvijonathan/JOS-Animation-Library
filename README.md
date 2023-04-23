<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/jesvijonathan/JOS-Animation-Library">
    <img src="../res/images/OFRJa1eN_2x.jpg" alt="Logo" height="200">
  </a>

  <h3 align="center">JOS : Animation Library</h3>

  <p align="center">
    A simple & easy to use animation library for web developers
    <br />
    <br />
    <a href="https://jesvijonathan.github.io/JOS-Animation-Library"><strong>Git Pages</strong></a>
    <br />
    <br />
    <a href="https://jesvijonathan.github.io/JOS-Animation-Library">View Demo</a>
    ·
    <a href="https://github.com/jesvijonathan/JOS-Animation-Library/issues">Report Bug</a>
    ·
    <a href="https://github.com/jesvijonathan/JOS-Animation-Library/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS
## Table of Contents

- [About This Project](#about-this-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
    - [Normal Installation](#normal-installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



<!-- ABOUT THE PROJECT -->

## About This Project

JOS is a simple & easy to use animation library package to instantly add professional animation to your website. It was built to make my life easier while developing websites & comes with tons of features and is fully customizable. It is lightweight & has a very small footprint. The best part of all is that it has No/Min toll on performance.

- Open source, no download or install, just add a script tag (Embed).
- Includes Preset and expert custom animation options.
- Works with all major browsers & frameworks.
- Fast, light and small with no/min toll on performance.
- Simple & easy to setup for both beginners & experts.
- Customize animation settings and build your own scroll invoked functions
- And lots more stuff... explore it yourself.

This project is currently being developed by me & the dev community, So you can expect more features and updates quite often..

Was inpired by GSAP, AOS libraries. I wanted something easier to use, with great performance and wanted to make the implementation better. So I worked on this project from scratch.

Feel free to report an issue or request a feature in this repository :)
& for more information, Check out the [JOS Webpage](https://jesvijonathan.github.io/JOS-Animation-Library).

### Built With

- [JavaScript](https://www.w3schools.com/js/)
- [CSS](https://www.w3schools.com/css/)

## Installation

1. Add the <code>[\<link>](https://github.com/jesvijonathan/Jesvi-Bot/releases)</code> inside the <code>\<head></code> tag :

```html
<link
  id="jos-stylesheet"
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/jos.css"
/>
```

2. Add the <code>[\<script>](https://github.com/jesvijonathan/Jesvi-Bot/releases)</code> right after the <code>\<body></code> tag :

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/jos.min.js"
></script>
```

You can add minified version of the script by replacing <code>jos.js</code> with <code>jos.min.js</code> in the above script tag.
Use <code>defer</code> attribute in script tag to make sure the script is loaded after the DOM is loaded.

- <code>jos.js</code> for basic.
- <code>jos.min.js</code> for production use.
- <b><code>jos.debug.js</code></b> for prettier <b>debugging</b> along with some other function.
- <code>jos.debug.min.js</code> for debugging along in minified version.

## Setup :

1. Use <code>JOS.init();</code> to initialize the library with default settings.

```html
<!-- Initialize JOS with default settings -->
<script>
  JOS.init();
</script>
```

2. (<b>Or</b>) Use <code>JOS.init({\<options>});</code> to overide the default settings with your custom settings.

```html
<!-- Global Parameters -->
<script>
  JOS.init({
    // disable: false, // Disable JOS gloabaly | Values :  'true', 'false'
    debugMode: true, // Enable JOS debug mode | Values :  'true', 'false'
    passive: false, // Set the passive option for the scroll event listener | Values :  'true', 'false'

    once: false, // Disable JOS after first animation | Values :  'true', 'false'
    animation: "fade", // JOS global animation type | Values :  'fade', 'slide', 'zoom', 'flip', 'fade-right', 'fade-left', 'fade-up', 'fade-down', 'zoom-in-right', 'zoom-in-left', 'zoom-in-up', 'zoom-in-down', 'zoom-out-right', 'zoom-out-left', 'zoom-out-up', 'zoom-out-down', 'flip-right', 'flip-left', 'flip-up', 'flip-down, "my-custom-animation"
    timingFunction: "ease-in-out", // JOS global timing function | Values :  'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end', 'steps()', 'cubic-bezier()', 'my-custom-timing-function'
    threshold: 0, // Set gloabal the threshold for the element to be visible | Values :  0-1
    delay: 0, // Set global the delay for the animation to start | Values :  0,1,2,3,4,5
    duration: 0.7, // Set global the duration for the animation playback | Values :  flota : 0-1 & int : 0,1,2,3,4,5

    // rootMargin_top: "0%", // Set by which percent the element should animate out (Recommended value between 10% to -30%)
    // rootMargin_bottom: "-50%", // Set by which percent the element should animate out (Recommended value between -10% to -60%)
    // rootMargin: "0% 0% -50% 0%", // Set the root margin for the element to be visible | Values :  _% _% _% _%  (automaticaly set)
    // intersectionRatio: 0.4, // Set the intersection ratio between which the element should be visible | Values :  0-1 (automaticaly set)
    // rootMargin: jos_rootMargin_top + " 0% " + jos_rootMargin_bottom + " 0%"; // Set the root margin for the element to be visible | Values :  _% _% _% _%  (automaticaly set)

    // animate_out: false, // Set whether elements should animate out while scrolling past them | Values :  'true', 'false'
    // debounce: 0, // Set global the debounce time/rate for listening to scroll events | Values :  0-1000
  });
</script>
```

1. Set <code>class="jos"</code> to the element you want to animate :

```html
<!-- JOS class is required to animate the element -->
<div class="jos"></div>
```

4. Set <code>data-jos</code> \*attributes to customize the element you want to animate :

```html
<!-- JOS attributes are optional and will work without them (class="jos" is mandatory). these attributes can be used to customize the animation of the element -->
<div
  class="jos"
  data-jos_animation="zoom"
  data-jos-once="true"
  data-jos_duration="0.5"
  data-jos_delay="0.2"
  data-jos_timing-function="ease-in-out"
  data-jos_invoke="myCustomFunction"
  data-jos_invoke_out="myCustomFunction_onExit"
></div>
```

See [JOS Props](#jos-attributes) for full information regarding the animation, attributes, and options.

## Custom Animation

1. Create a custom animation by adding the following code to your stylesheet :

```css
/* Custom animation class name starts with 'jos-' keyword followed by the animation name*/
.jos-my-custom-animation {
  /* Set the initial state of the element */
}
```

2. Use your cutom animation by setting the <code>data-jos_animation</code> attribute to <code>my-custom-animation</code> :

```html
<div class="jos" data-jos_animation="my-custom-animation"></div>
```

Example : [Custom Animation]()

## Custom Timing Function

1. Create a custom timing function by adding the following code to your stylesheet :

```css
/* Custom timing function attribute name starts with 'data-jos_timing_function' keyword & a custom name of your choice */
[data-jos_timing_function="myCustom-timingFunc"] {
  /* Set the timing of the element */
  transition-timing-function: cubic-bezier(0.2, 0.5, 0.2, 0.5) !important;
}
```

2. Use your cutom timing function by setting the <code>data-jos_timing-function</code> attribute to <code>my-custom-timing-function</code> :

```html
<div class="jos" data-jos_timing-function="myCustom-timingFunc"></div>
```

Example : [Custom Timing Function]()

## Create Custom Function

1. Create a custom function by adding the following code to your script :

```js
// Create a custom function
function myCustomFunction() {
  // Do something
}
```

2. Use your cutom function by setting the <code>data-jos_invoke</code> attribute to <code>myCustomFunction</code> :

```html
<div class="jos" data-jos_invoke="myCustomFunction"></div>
```

This triggers the myCustomFunction() function when the element is scrolled into view.

You can use <b><code>data-jos_invoke_out</code></b> attribute to trigger the function when the element is scrolled out of view.

Example : [Custom Function]()

## JOS Attributes

| Attribute                | Type    | Default | Description                                                              | values                                                                                                                                                                                                                                                            |
| ------------------------ | ------- | ------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| data-jos_animation       | string  | fade    | Set the animation type for the element.                                  | <code>fade, slide, zoom, flip, fade-right, fade-left, fade-up, fade-down, zoom-in-right, zoom-in-left, zoom-in-up, zoom-in-down, zoom-out-right, zoom-out-left, zoom-out-up, zoom-out-down, flip-right, flip-left, flip-up, flip-down, my-custom-animation</code> |
| data-jos_once            | boolean | false   | Set whether the element should animate only once.                        | <code>true, false <code>                                                                                                                                                                                                                                          |
| data-jos_delay           | int     | 0       | Set the delay for the animation to start.                                | <code> (float : 0-1) & (int : 0,1,2,3,4,5) </code>                                                                                                                                                                                                                |
| data-jos_duration        | float   | 0.4     | Set the duration for the animation playback.                             | <code> (float : 0-1) & (int : 0,1,2,3,4,5) </code>                                                                                                                                                                                                                |     |
| data-jos_timing-function | string  | ease    | Set the timing function for the animation playback.                      | <code> ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end, steps(1, start), steps(1, end), cubic-bezier(0.1, 0.7, 1.0, 0.1), my-custom-timingFunc </code>                                                                                         |
| data-jos_invoke          | string  | null    | Set the function to be invoked when the element is scrolled into view.   | <code> function, myCustomFunction</code>                                                                                                                                                                                                                          |
| data-jos_invoke_out      | string  | null    | Set the function to be invoked when the element is scrolled out of view. | <code> function, myCustomFunction </code>                                                                                                                                                                                                                         |
| data-once                | boolean | false   | Set whether the element should animate only once.                        | <code>true, false</code>                                                                                                                                                                                                                                          |

<!-- ## JOS OPTIONS

| Option            | Type    | Default | Description                                                                                                                                                                                                                                                                                                                                     |
| ----------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| disable           | boolean | false   | Set whether the animation should be disabled. <br> Values : <br> true, false                                                                                                                                                                                                                                                                    |
| once              | boolean | false   | Set whether the element should animate only once. <br> Values : <br> true, false                                                                                                                                                                                                                                                                |
| animation         | string  | fade    | Set the animation type for the element. <br> Values : <br> fade, slide, zoom, flip, fade-right, fade-left, fade-up, fade-down, zoom-in-right, zoom-in-left, zoom-in-up, zoom-in-down, zoom-out-right, zoom-out-left, zoom-out-up, zoom-out-down, flip-right, flip-left, flip-up, flip-down, my-custom-animation                                 |
| timingFunction    | string  | ease    | Set the timing function for the animation playback. <br> Values : <br> ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end, steps(1, start), steps(1, end), cubic-bezier(0.1, 0.7, 1.0, 0.1), my-custom-timingFunc                                                                                                               |
| threshold         | float   | 0.5     | Set the threshold for the animation to start. <br> Values : <br> float : 0-1 & int : 0,1,2,3,4,5                                                                                                                                                                                                                                                |
| debounce          | int     | 0       | Set the debounce time for the animation to start. <br> Values : <br> 0,1,2,3,4,5                                                                                                                                                                                                                                                                |
| delay             | int     | 0       | Set the delay for the animation to start. <br> Values : <br> 0,1,2,3,4,5                                                                                                                                                                                                                                                                        |
| duration          | float   | 0.4     | Set the duration for the animation playback. <br> Values : <br> float : 0-1 & int : 0,1,2,3,4,5                                                                                                                                                                                                                                                 |
| animateIn         | string  | null    | Set the animation type for the element when it is scrolled into view. <br> Values : <br> fade, slide, zoom, flip, fade-right, fade-left, fade-up, fade-down, zoom-in-right, zoom-in-left, zoom-in-up, zoom-in-down, zoom-out-right, zoom-out-left, zoom-out-up, zoom-out-down, flip-right, flip-left, flip-up, flip-down, my-custom-animation   |
| animateOut        | string  | null    | Set the animation type for the element when it is scrolled out of view. <br> Values : <br> fade, slide, zoom, flip, fade-right, fade-left, fade-up, fade-down, zoom-in-right, zoom-in-left, zoom-in-up, zoom-in-down, zoom-out-right, zoom-out-left, zoom-out-up, zoom-out-down, flip-right, flip-left, flip-up, flip-down, my-custom-animation |
| rootmargin        | string  | 0px     | Set the root margin for the animation to start. <br> Values : <br> 0px, 0px 0px 0px 0px, 0px 0px 0px 0px, 0px 0px 0px 0px                                                                                                                                                                                                                       |
| rootMargin_top    | int     | 0       | Set the top root margin for the animation to start. <br> Values : <br> 0,1,2,3,4,5                                                                                                                                                                                                                                                              |
| rootMargin_bottom | int     | 0       | Set the bottom root margin for the animation to start. <br> Values : <br> 0,1,2,3,4,5                                                                                                                                                                                                                                                           |
| intersectionRatio | float   | 0.5     | Set the intersection ratio for the animation to start. <br> Values : <br> float : 0-1 & int : 0,1,2,3,4,5                                                                                                                                                                                                                                       | -->

<!-- ## JOS EVENTS

| Event      | Description                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| onInit     | Fires when the element is initialized.                                                        |
| onEnter    | Fires when the element is scrolled into view.                                                 |
| onLeave    | Fires when the element is scrolled out of view.                                               |
| onProgress | Fires when the element is scrolled into view and the animation is in progress.                |
| onComplete | Fires when the element is scrolled into view and the animation is completed.                  |
| onRevert   | Fires when the element is scrolled out of view and the animation is reverted to its original. |
| onReset    | Fires when the element is scrolled out of view and the animation is reset to its original.    |

## JOS METHODS

| Method | Description                                                                                 |
| ------ | ------------------------------------------------------------------------------------------- |
| init   | Initialize the element.                                                                     |
| enter  | Scroll the element into view.                                                               |
| leave  | Scroll the element out of view.                                                             |
| revert | Revert the element to its original state.                                                   |
| reset  | Reset the element to its original state and remove all the JOS attributes from the element. | -->

## Bugs and Issues

- ~~JOS Methods do not work as of now.~~ (fixed in v0.3 upstream)
- attribute names are not consistent.
- .~~attribute <code>delay</code> is not working as of now..~~ (added in v0.5)
- ~~<code>init</code> method is not working as of now. (need to be set manually as var in html inline script)~~ (added in v0.5)
- <code>bebounce</code> is not working as of now.
- requires both js & css cdn links for JOS v0.5 & below.
- .~~JOS <code>disable</code> attribute is not working as of now..~~ (fixed in v0.3 upstream)
- ~~should move from function workaround to class based approach~~ (added in v0.5)
- ~~Need to add minified and other versions of JOS package~~ (updated in v0.6)
- bug where the element is not animating when the page is loaded and the element is already in view.

<!-- status
critical
major
minor
 -->

<!--
priority
high
medium
low
 -->

<!--
type
bug
enhancement
update
workaround
temporary
 -->

<!-- | Issue | Description                                                                                        | Status   | Priority | Type        |
| ----- | -------------------------------------------------------------------------------------------------- | -------- | -------- | ----------- |
| 1     | Jos Methods do not work as of now.                                                                 | critical | high     | bug         |
| 2     | attribute names are not consistent.                                                                | minor    | medium   | temporary   |
| 3     | attribute delay is not working as of now.                                                          | minor    | low      | temporary   |
| 4     | init method is not working as of now. (need to be set manually as var in html inline script)       | critical | high     | workaround  |
| 5     | debounce is not working as of now.                                                                 | major    | high     | enhancement |
| 6     | Requires both js & css cdn links for JOS v0.3 & below                                              | major    | high     | update      |
| 7     | JOS disable attribute is not working as of now.                                                    | major    | high     | temporary   |
| 8     | Best practices Reu should move from function workaround to class based approach                    | major    | medium   | enhancement |
| 9     | Bug where the element is not animating when the page is loaded and the element is already in view. | critical | high     | bug         | -->

## Contributing

- Fork it from [main branch](https://github.com/jesvijonathan/JOS-Animation-Library)
- Add your useful feature or fix a bug
- Create a pull request

## License

- [JOS]() is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Used In

- [CIT Takshashila 23](https://www.cittakshashila.in/)
- [JOS Demo](https://jesvijonathan.github.io/JOS-Animation-Library/)

### Why use JOS ?

- For <b>Performance</b>, JOS has a different implementation and it's sellingpoint is obviously performance.
- <b>Easy to use</b>, you can use it in your projects with very minimal effort.
- JOS is lightweight
- Customizable with own attributes and animation.
- Open sourced and free to use

## Credits

- ##### [Jesvi Jonathan](https://jesvi.pythonanywhere.com)
