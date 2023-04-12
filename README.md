<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/jesvijonathan/JOS-Animation-Library">
    <img src="/res/images/OFRJa1eN_2x.jpg" alt="Logo" height="200">
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

JOS is a simple & easy to use animation library package to instantly add professional animation to your website. It was built to make my life easier while developing websites & comes with tons of features and is fully customizable. It is lightweight & has a very small footprint. The best part of all is that it has no toll on performance.

- Open source, no download or install, just add a script tag (Embed).
- Includes Preset and expert custom animation options.
- Works with all major browsers & frameworks.
- Fast, light and small with no/min toll on performance.
- Simple & easy to setup for both beginners & experts.
- Customize animation settings and build your own scroll invoked functions
- And lots more stuff... explore it yourself.

This project is currently being developed by me & the dev community, So you can expect more features and updates quite often..

Feel free to report an issue or request a feature in this repository :)
& for more information, Check out the [JOS Webpage](https://jesvijonathan.github.io/JOS-Animation-Library).

### Built With

- [JavaScript](https://www.w3schools.com/js/)
- [CSS](https://www.w3schools.com/css/)

## Installation

1. Add the <code>[\<script>](https://github.com/jesvijonathan/Jesvi-Bot/releases)</code> right after the closing <code>\<body></code> tag :

```html
<script
  defer
  src="https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/jos.js"
></script>
```

## Setup :

1. Use <code>JOS.init();</code> to initialize the library with default settings.

```js
// Initialize JOS with default settings
<script>JOS.init();</script>
```

2. Use <code>JOS.init({\<options>});</code> to overide the default settings with your custom settings.

```js
// Initialize JOS with custom settings
<script>
  JOS.init(
  {
    // Global Options
    jos_default_disable : false; // Disable JOS gloabaly | Values :  'true', 'false'
    jos_default_once : false; // Disable JOS after first animation | Values :  'true', 'false'
    jos_default_animation : "fade"; // JOS global animation type | Values :  'fade', 'slide', 'zoom', 'flip', 'fade-right', 'fade-left', 'fade-up', 'fade-down', 'zoom-in-right', 'zoom-in-left', 'zoom-in-up', 'zoom-in-down', 'zoom-out-right', 'zoom-out-left', 'zoom-out-up', 'zoom-out-down', 'flip-right', 'flip-left', 'flip-up', 'flip-down, "my-custom-animation"
    jos_default_timingFunction : "ease-in-out"; // JOS global timing function | Values :  'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end', 'steps()', 'cubic-bezier()', 'my-custom-timing-function'
    jos_default_threshold : 0; // Set gloabal the threshold for the element to be visible | Values :  0-1
    jos_default_debounce : 0; // Set global the debounce time/rate for listening to scroll events | Values :  0-1000
    jos_default_delay : 0; // Set global the delay for the animation to start | Values :  0,1,2,3,4,5
    jos_default_duration : 0.4; // Set global the duration for the animation playback | Values :  flota : 0-1 & int : 0,1,2,3,4,5
    jos_default_animate_out : false; // Set whether elements should animate out while scrolling past them | Values :  'true', 'false'
    jos_rootMargin_top : "-10%"; // Set by which percent the element should animate out (Recommended value between 10% to -30%)
    jos_rootMargin_bottom : "-40%"; // Set by which percent the element should animate out (Recommended value between -10% to -60%)

    jos_default_intersectionRatio : intersectionRatio_set(); // Set the intersection ratio between which the element should be visible | Values :  0-1 (automaticaly set)
    jos_default_rootMargin : jos_rootMargin_top + " 0% " + jos_rootMargin_bottom + " 0%"; // Set the root margin for the element to be visible | Values :  _% _% _% _%  (automaticaly set)
  }
  );
</script>
```

3. Set <code>JOS</code> class to the element you want to animate :

```html
<!-- JOS class is required to animate the element -->
<div class="jos"></div>
```

4. Set <code>data-jos</code> attributes to customize the element you want to animate :

```html
<!-- JOS attributes are optional and can be used to customize the animation of the element -->
<div
  class="jos"
  data-jos_animation="zoom"
  data-jos-once="true"
  data-jos_duration="0.3"
  data-jos_timing-function="ease-in-out"
  data-jos_invoke="myCustomFunction"
  data-jos_invoke_out="myCustomFunction_onExit"
></div>
```

See [JOS Props](#jos-attributes) for full information regarding the animation, attributes, and options.

## Custom Animation

1. Create a custom animation by adding the following code to your stylesheet :

```css
/* Custom animation class name starts with 'jos-' keyword*/
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

You can use <code>data-jos_invoke_out</code> attribute to trigger the function when the element is scrolled out of view.

Example : [Custom Function]()

## JOS Attributes

| Attribute                | Type    | Default | Description                                                                                                                                                                                                                                                                                                     |
| ------------------------ | ------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-jos_animation       | string  | fade    | Set the animation type for the element. <br> Values : <br> fade, slide, zoom, flip, fade-right, fade-left, fade-up, fade-down, zoom-in-right, zoom-in-left, zoom-in-up, zoom-in-down, zoom-out-right, zoom-out-left, zoom-out-up, zoom-out-down, flip-right, flip-left, flip-up, flip-down, my-custom-animation |
| data-jos_once            | boolean | false   | Set whether the element should animate only once. <br> Values : <br> true, false                                                                                                                                                                                                                                |
| data-jos_delay           | int     | 0       | Set the delay for the animation to start. <br> Values : <br> 0,1,2,3,4,5                                                                                                                                                                                                                                        |
| data-jos_duration        | float   | 0.4     | Set the duration for the animation playback. <br> Values : <br> float : 0-1 & int : 0,1,2,3,4,5                                                                                                                                                                                                                 |
| data-jos_timing-function | string  | ease    | Set the timing function for the animation playback. <br> Values : <br> ease, ease-in, ease-out, ease-in-out, linear, step-start, step-end, steps(1, start), steps(1, end), cubic-bezier(0.1, 0.7, 1.0, 0.1), my-custom-timingFunc                                                                               |
| data-jos_invoke          | string  | null    | Set the function to be invoked when the element is scrolled into view. <br> Values : <br> myCustomFunction                                                                                                                                                                                                      |
| data-jos_invoke_out      | string  | null    | Set the function to be invoked when the element is scrolled out of view. <br> Values : <br> myCustomFunction                                                                                                                                                                                                    |
| data-once                | boolean | false   | Set whether the element should animate only once. <br> Values : <br> true, false                                                                                                                                                                                                                                |

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

```
- JOS Methods do not work as of now.
- attribute names are not consistent.
- attribute <code>delay</code> is not working as of now.
- init method is not working as of now. (need to be set manually as var in html inline script)
- debounce is not working as of now.
- Requires both js & css cdn links for JOS v0.3 & below
- JOS disable attribute is not working as of now.
- should move from function workaround to class based approach
- **Bug** where the element is not animating when the page is loaded and the element is already in view.
```

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

- Fork it from main branch
- Add your useful feature
- Create a pull request

## License

- [JOS]() is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Credits

- ###### [Jesvi Jonathan](https://jesvi.pythonanywhere.com)
