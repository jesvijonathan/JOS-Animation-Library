<!--
JOS : Animation Library
By Jesvi Jonathan
 -->
<br />
<p align="center">
  <a href="https://github.com/jesvijonathan/JOS-Animation-Library">
    <img src="./res/logo.jpg" alt="JOS Logo" height="200">
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

JOS is a simple & easy to use animation library package to instantly add professional animation to your website. It was built to make my life easier while developing websites & comes with tons of features and is fully customizable. It is lightweight & has a very small footprint. The best part of all is that it has no (\*minimum) toll on performance.

- Open source, no download or tiring setup, just add a script tag (Embed).
- Includes Preset and expert custom animation options.
- Works with all major browsers & Platforms.
- Fast, light and small with no/min toll on performance.
- Simple & easy to setup for both beginners & experts.
- Customize animation settings and build your own scroll invoked functions
- And lots more stuff... explore it yourself.

This project is currently being developed by me & the dev community, So you can expect more features and updates quite often..

Was inpired by GSAP, AOS libraries. I wanted something easier to use, with great performance and wanted to make the implementation better. So I worked on this project from scratch.

Feel free to report an issue or request a feature in this repository :)
& for more information, Check out the [JOS Webpage](https://jesvijonathan.github.io/JOS-Animation-Library).
<br>
<br>

<code> <i>JOS</i> </code> <code> <i>v0.8.8</i> </code> <code><i> 18 July 2023</i></code> <code> <i>Jesvi Jonathan</i> </code>

<br>

### Built With

- [JavaScript](https://www.w3schools.com/js/)
- [CSS](https://www.w3schools.com/css/)

### Installation

1. Add the <code>[\<link>](https://github.com/jesvijonathan/Jesvi-Bot/releases)</code> inside the <code>\<head></code> tag :

<!-- https://unpkg.com/jos-animation@latest/dist/jos.js -->
<!-- "https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/v0.8.8/jos.css" -->

```html
<link
  id="jos-stylesheet"
  rel="stylesheet"
  href="https://unpkg.com/jos-animation/dist/jos.css"
  crossorigin="anonymous"
/>
```

2. Add the <code>[\<script>](https://github.com/jesvijonathan/Jesvi-Bot/releases)</code> right after the <code>\<body></code> tag :
   <!-- For easier navigation use jsdelivr -->
   <!-- https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/v0.8.8/jos.min.js -->
   <!-- For Stablility use unpkg  -->
   <!-- https://unpkg.com/jos-animation@latest/dist/jos.js -->

```html
<script src="https://unpkg.com/jos-animation/dist/jos.min.js"></script>
```

You can add minified version of the script by replacing <code>jos.js</code> with <code>jos.min.js</code> in the above script tag.

<!-- Use <code>defer</code> attribute in script tag to make sure the script is loaded after the DOM is loaded. -->

- <code>jos.js</code> for basic.
- <code>jos.min.js</code> for production use.
- <b><code>jos.debug.js</code></b> for <b>debugging</b> along with some other function
  <!-- - make sure to enable <u>verbose</u> in debug level settings under the console tab in your browser's developer tools. -->

<!-- 3. Initialize JOS with default settings :

```html
<script>
  JOS.init();
</script>
```

By the end of this step, you should have something like this :

```html
<!DOCTYPE html>
<html>
  <head>
    <link
      id="jos-stylesheet"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/jos.css"
      crossorigin="anonymous"
    />
  </head>
  <body>
    <script src="https://cdn.jsdelivr.net/gh/jesvijonathan/JOS-Animation-Library/dist/jos.min.js"></script>
    <script>
      JOS.init();
    </script>
  </body>
</html>
``` -->

<!-- using npm -->

<!-- ### Installation using npm

1. You can also Install JOS using npm :

```bash
npm install jos-animation
```

2. Import JOS in your project :

```js
import "jos-animation/dist/jos.css";
import JOS from "jos-animation";

JOS.init();
``` -->

## Setup :

1. Use <code>JOS.init();</code> to initialize the library with default settings.

```html
<!-- Initialize JOS with default settings -->
<script>
  JOS.init();
</script>
```

2. (<b>Or</b>) Use <code>JOS.init(options);</code> to overide the default settings with your custom settings.

```html
<!-- Global Parameters -->
<script>
  JOS.init({
    // disable: false, // Disable JOS gloabaly | Values :  'true', 'false'
    debugMode: true, // Enable JOS debug mode | Values :  'true', 'false'
    passive: false, // Set the passive option for the scroll event listener | Values :  'true', 'false'

    once: false, // Disable JOS after first animation | Values :  'true', 'false' || Int : 0-1000
    animation: "fade", // JOS global animation type | Values :  'fade', 'slide', 'zoom', 'flip', 'fade-right', 'fade-left', 'fade-up', 'fade-down', 'zoom-in-right', 'zoom-in-left', 'zoom-in-up', 'zoom-in-down', 'zoom-out-right', 'zoom-out-left', 'zoom-out-up', 'zoom-out-down', 'flip-right', 'flip-left', 'flip-up', 'flip-down, spin, revolve, stretch, "my-custom-animation"
    // animationInverse: "static", // Set the animation type for the element when it is scrolled out of view | Values :  'fade', 'slide', 'zoom', 'flip', 'fade-right', 'fade-left', 'fade-up', 'fade-down', 'zoom-in-right', 'zoom-in-left', 'zoom-in-up', 'zoom-in-down', 'zoom-out-right', 'zoom-out-left', 'zoom-out-up', 'zoom-out-down', 'flip-right', 'flip-left', 'flip-up', 'flip-down, spin, revolve, stretch, "my-custom-animation"
    timingFunction: "ease-in-out", // JOS global timing function | Values :  'ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'step-start', 'step-end', 'steps()', 'cubic-bezier()', 'my-custom-timing-function'
    //mirror : false, // Set whether the element should animate back when scrolled out of view | Values :  'true', 'false'
    threshold: 0, // Set gloabal the threshold for the element to be visible | Values :  0-1
    delay: 0, // Set global the delay for the animation to start | Values :  0,1,2,3,4,5
    duration: 0.7, // Set global the duration for the animation playback | Values :  flota : 0-1 & int : 0,1,2,3,4,5

    // startVisible: "true", // Set whether the element should animate when the page is loaded | Values :  'true', 'false' || MS : 0-10000
    // scrollDirection: "down", // Set the scroll direction for the element to be visible | Values :  'up', 'down', 'none'
    // intersectionRatio: 0.4, // Set the intersection ratio between which the element should be visible | Values :  0-1 (automaticaly set)
    // rootMargin_top: "0%", // Set by which percent the element should animate out (Recommended value between 10% to -30%)
    // rootMargin_bottom: "-50%", // Set by which percent the element should animate out (Recommended value between -10% to -60%)
    // rootMargin: "0% 0% -50% 0%", // Set the root margin for the element to be visible | Values :  _% _% _% _%  (automaticaly set)
  });
</script>
```

3. Set <code>class="jos"</code> to the element you want to animate :

```html
<!-- JOS class is required to animate the element -->
<div class="jos"></div>
```

4. Set <code>data-jos</code> \*attributes to customize the element you want to animate,<br>(although these attributes are optional and will work without them) :

```html
<!-- JOS attributes are optional and will work without them (class="jos" is mandatory). these attributes can be used to customize the animation of the element -->
<div
  class="jos"
  data-jos_animation="zoom"
  data-jos_once="true"
  data-jos_duration="0.5"
  data-jos_delay="0.2"
  data-jos_timing-function="ease-in-out"
  data-jos_rootMargin="0% 0% -50% 0%"
  data-jos_rootMargin_top="-10%"
  data-jos_rootMargin_bottom="-50%"
  data-jos_scrollDirection="down"
  data-jos_startVisible="true"
  data-jos_invoke="myCustomFunction"
  data-jos_invoke_out="myCustomFunction_onExit"
  data-jos_anchor="#elementID"
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

## Custom Inverse Animation

1. Create a custom inverse animation by adding the following code to your stylesheet :

```css
/* Custom inverse animation class name starts with 'jos-' keyword followed by the animation name*/
.jos-my-custom-animation-inverse {
  /* Set the initial state of the element */
}
```

2. Use your cutom inverse animation by setting the <code>data-jos_animationInverse</code> attribute to <code>my-custom-animation-inverse</code> :

```html
<div class="jos" data-jos_animationInverse="my-custom-animation-inverse"></div>
```

This is especially useful when you want to animate an element when it is **scrolled out of its rootMargin**, this gives more customizability for beautiful animations.

Example : [Custom Inverse Animation]()

## Playable Animation

1. Create a playable animation by adding the following code to your stylesheet :

```css
/* Custom playable animation class name starts with 'jos-' keyword followed by the animation name*/

/* My Custom Playable Animation */
.jos-my-custom-animation {
  transition: 1s;
  animation: jos-my-custom-animation 1s ease-in-out infinite;
  transform: translateX(100px);
}
/* Add Keyframes */
@keyframes jos-my-custom-animation {
  0% {
    opacity: 1;
  }

  50% {
    transform: translateX(-100px);
  }
}
```

1. Use the playable animation by setting the <code>data-jos_animation</code> attribute to <code>my-custom-animation</code> & <code>data-jos_animationInverse</code> attribute to <code>my-custom-animation-play</code> :

```html
<div
  class="jos"
  data-jos_animation="my-custom-animation"
  data-jos_animationinverse="static"
></div>
```

Here the <code>data-jos_animationinverse</code> attribute is set to <code>static</code> to prevent the element from animating out of view & to keep it in the final state. The Playable animation is triggered and starts playing when the element is scrolled into view.

Example : [Playable Animation]()

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

## Anchors to trigger animation

1. Create an element that you want to use as an anchor & add an <code>id</code> to it :

```html
<!-- My reference anchor element -->
<div id="myElement"></div>
```

1. Create an element that you want to animate & add the <code>data-jos_anchor</code> attribute to it, with the id starting with suffix <code>#</code> :

```html
<!-- My animated element -->
<div class="jos" data-jos_anchor="#myElement"></div>
```

This triggers the animation when the <code>myElement</code> element is scrolled into view.<br>
This feature is useful especially when you want to animate an element which is in a <b>fixed position</b>.

Example : [Anchor](https://github.com/jesvijonathan/JOS-Animation-Library/blob/master/dev/index.html?plain=1#L35)

## Direction Based Animation

1. Create an element that you want to animate & add the <code>data-jos_scrollDirection</code> attribute to it :

```html
<!-- My animated element -->
<div class="jos" data-jos_scrollDirection="down"></div>
```

This triggers the animation when the element is scrolled into view from the up to <code>down</code> direction.<br> & you can do the same for down to <code>up</code> direction.

This is partciluarly useful when you want to animate an element when it is **scrolled into view from a particular direction.**

Example : [Direction Based Animation]()

## Start Visible

1. Create an element that you want to have a visible state when the page is loaded & add the <code>data-jos_startVisible</code> attribute to it :

```html
<!-- My animated element -->
<div class="jos" data-jos_startVisible="true"></div>
```

This sets the element to be visivle when the page is loaded. you can add a delay to it by setting the value in <code>ms</code> :

```html
<!-- My animated element that is visivle with a given timer/delay in ms-->
<div class="jos" data-jos_startVisible="3000"></div>
```

This sets the element to be visivle when the page is loaded after <code>3000</code>ms or instantly if the value is <code>0</code> (or) <code>true</code>.

This feature is useful especially when you want an element which is in a <b>fixed position, or is present in the landing page</b> to be at initially in a visible state with no animation .

Example : [Start Visible]()

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

| Attribute                  | Type          | Default         | Description                                                                                              | Values                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------- | ------------- | --------------- | -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data-jos_animation         | string        | fade            | Set the animation type for the element.                                                                  | `fade`, `slide`, `zoom`, `flip`, `fade-right`, `fade-left`, `fade-up`, `fade-down`, `zoom-in-right`, `zoom-in-left`, `zoom-in-up`, `zoom-in-down`, `zoom-out-right`, `zoom-out-left`, `zoom-out-up`, `zoom-out-down`, `flip-right`, `flip-left`, `flip-up`, `flip-down`, `rotate`, `rotate-right`, `spin`, `spin-right`, `revolve`, `revolve-right`, `stretch`, `stretch-vertical`, `my-custom-animation` |
| data-jos_animationInverse  | string        | static          | Set the Inverse animation type for the element.                                                          | `fade`, `slide`, `zoom`, `flip`, `fade-right`, `fade-left`, `fade-up`, `fade-down`, `zoom-in-right`, `zoom-in-left`, `zoom-in-up`, `zoom-in-down`, `zoom-out-right`, `zoom-out-left`, `zoom-out-up`, `zoom-out-down`, `flip-right`, `flip-left`, `flip-up`, `flip-down`, `rotate`, `rotate-right`, `spin`, `spin-right`, `revolve`, `revolve-right`, `stretch`, `stretch-vertical`, `my-custom-animation` |
| data-jos_once              | boolean       | false           | Set whether the element should animate only once.                                                        | `true`, `false`                                                                                                                                                                                                                                                                                                                                                                                           |
| data-jos_delay             | int           | 0               | Set the delay for the animation to start.                                                                | `(float: 0-1)` & `(int: 0, 1, 2, 3, 4, 5)`                                                                                                                                                                                                                                                                                                                                                                |
| data-jos_duration          | float         | 0.4             | Set the duration for the animation playback.                                                             | `(float: 0-1)` & `(int: 0, 1, 2, 3, 4, 5)`                                                                                                                                                                                                                                                                                                                                                                |
| data-jos_timing-function   | string        | ease            | Set the timing function for the animation playback.                                                      | `ease`, `ease-in`, `ease-out`, `ease-in-out`, `linear`, `step-start`, `step-end`, `steps(1, start)`, `steps(1, end)`, `cubic-bezier(0.1, 0.7, 1.0, 0.1)`, `my-custom-timingFunc`                                                                                                                                                                                                                          |
| data-jos_invoke            | string        | null            | Set the function to be invoked when the element is scrolled into view.                                   | `function`, `myCustomFunction`                                                                                                                                                                                                                                                                                                                                                                            |
| data-jos_invoke_out        | string        | null            | Set the function to be invoked when the element is scrolled out of view.                                 | `function`, `myCustomFunction`                                                                                                                                                                                                                                                                                                                                                                            |
| data-once                  | boolean & int | false           | Set whether the element should animate only                                                              | `(boolean: true, false)` & `(int: 0-infinity)`                                                                                                                                                                                                                                                                                                                                                            |
| data-jos_rootMargin        | string        | 0% -10% 0% -50% | Sets the margin for an element to animate on in a viewport when scrolled.                                | `(string: "right% top% left% bottom%")`                                                                                                                                                                                                                                                                                                                                                                   |
| data-jos_rootMargin_top    | string        | 0%              | Sets the margin for an element to animate on the top of a viewport when scrolled.                        | `(string: "top%")`                                                                                                                                                                                                                                                                                                                                                                                        |
| data-jos_rootMargin_bottom | string        | 0%              | Sets the margin for an element to animate on the bottom of a viewport when scrolled.                     | `(string: "bottom%")`                                                                                                                                                                                                                                                                                                                                                                                     |
| data-jos_scrollDirection   | string        | down            | Sets the direction for an element to animate on ina viewport when scrolled.                              | `(string: "up", "down", "none")`                                                                                                                                                                                                                                                                                                                                                                          |
| data-jos_startVisible      | boolean & int | false           | Set whether the element should start at the final state when the page is loaded (also works with delay). | `(boolean: true, false)` & `(int: 0-10000 ms)`                                                                                                                                                                                                                                                                                                                                                            |
| data-jos_anchor            | string        | null            | Sets the anchor element for an element to animate on in a viewport when scrolled.                        | `(string: "#elementID")`                                                                                                                                                                                                                                                                                                                                                                                  |
|                            |

<!--create a table for init, refresh, start, stop, destroy -->

## JOS Methods

| Method    | Description              | Parameters                                                                                              |
| --------- | ------------------------ | ------------------------------------------------------------------------------------------------------- |
| init()    | Initialize/Reset JOS     | options = `{}` (refer [JOS.Init(options)]() )                                                           |
| refresh() | Refresh JOS              | none                                                                                                    |
| stop()    | Stop/Pause JOS           | state = (`0` - Stop at final state, `1` - Stop at initial state, `-1` - Pause at current state)         |
| start()   | Start/Resume JOS Service | state = (`0` - Normal/Full start, `-1` - Resume from current state)                                     |
| destroy() | Destroy JOS Instance     | state = (`0` - Destroy JOS instance excluding stylesheet, `1` - Full Destroy along with JOS-stylesheet) |

## Bugs and Issues

Moved to [issues](https://github.com/jesvijonathan/JOS-Animation-Library/issues)

## Contributing

- Fork it from [main branch](https://github.com/jesvijonathan/JOS-Animation-Library)
- Add your useful feature or fix a bug
- Create a pull request

## License

- [JOS](https://github.com/jesvijonathan/JOS-Animation-Library/blob/master/LICENSE.md) is licensed under the [MIT License](https://github.com/jesvijonathan/JOS-Animation-Library/blob/master/LICENSE.md).

## Used In

- [CIT Takshashila 23](https://www.cittakshashila.in/)
- [JOS Demo](https://jesvijonathan.github.io/JOS-Animation-Library/)
- [JSheet](https://https://jesvijonathan.github.io/JSheet/)
- [CSC](https://jesvijonathan.github.io/christhava-sangam-church-website/)

(<i>Ping Me If you have a demo</i>)

### Why use JOS ?

- <b>Performance</b>, JOS has a implementation, different from others.
- <b>Easy to use</b>, you can use it in your projects with very minimal effort.
- JOS is lightweight
- Customizable with own attributes and animation.
- Open sourced and free to use

## Credits

<div align="center">

#### <i><u>This project was solely developed by</i> [Jesvi Jonathan](https://jesvi.pythonanywhere.com)</u>

</div>
