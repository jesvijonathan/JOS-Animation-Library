onload = () => {
  const jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  //   jos_css = document.getElementsByClassName("jos");
  let transition_temp = jos_default_duration + "s " + jos_default_type;
  //   console.log(transition_temp);
  jos_stylesheet.insertRule(
    ".jos { transition: " + transition_temp + " !important; }"
  );
};

let centerWindow = window.innerHeight / 2;

let jos_default_once = false; // true or false
let jos_default_animation = "fade"; // fade, slide, zoom, rotate
let jos_default_timingFunction = "ease-in-out"; // ease-in-out, ease-in, ease-out, linear
let jos_default_threshold = 0; // 0-1  | higher value for mobile and lower for desktop
let jos_default_duration = 0.4;
let jos_rootMargin_top = "-10%";
let jos_rootMargin_bottom = "-50%";
let jos_default_type = "linear";

let jos_default_intersectionRatio = intersectionRatio_set(); //0-0.99
let jos_default_rootMargin =
  jos_rootMargin_top + " 0% " + jos_rootMargin_bottom + " 0%";

function intersectionRatio_set() {
  if (jos_default_threshold == 1) return 0.99;

  return jos_default_threshold;
}

function fly_in(target, state) {
  if (state) {
    target.classList.add("fly_in");
  } else {
    target.classList.remove("fly_in");
  }
}

function example() {
  //  alert("You have invoked custom Scroll-In function !");
  console.log("You have invoked custom Scroll-In function");
}
function example2() {
  //  alert("You have invoked custom scroll-Out function !");
  console.log("You have invoked custom scroll-Out function !");
}
function animation_invoker(target, state) {
  let target_jos_animation = target.dataset.jos_animation;

  if (state) {
    target.classList.remove("jos-" + target_jos_animation);
    // console.log("jos-" + target_jos_animation);

    if (target.dataset.jos_invoke != undefined) {
      window[target.dataset.jos_invoke](target);
    }
  } else {
    target.classList.add("jos-" + target_jos_animation);
    if (target.dataset.jos_invoke_out != undefined) {
      window[target.dataset.jos_invoke_out](target);
    }
  }
}

function callbackRouter(entries, observer) {
  let entry = entries[0];
  let target = entry.target;

  //   console.log(target.dataset.jos_animation, entry.intersectionRatio);

  if (entry.intersectionRatio > jos_default_intersectionRatio) {
    if (target.dataset.jos_animation) {
      // console.log("Animation-Triggered");
      animation_invoker(target, true);
      if (target.dataset.jos_once == "true") {
        // target.classList.remove("jos");
        // console.log("Removed-Observer");
        observer.unobserve(target);
      }
    }
  } else {
    if (target.dataset.jos_animation) {
      // console.log("Animation-Reverting");
      animation_invoker(target, false);
    }
  }
}

var options = {
  root: null,
  rootMargin: jos_default_rootMargin,
  threshold: jos_default_threshold,
  passive: true,
};

// There is another way to implement this,
// by creating an instance of the IntersectionObserver class and create a unique object for every element.
// but this fucks your cpu and performace at the same time, but offers customizability

const observer = new IntersectionObserver(callbackRouter, options);
const boxes = document.querySelectorAll(".jos");

boxes.forEach((box) => {
  // observer.observe(box);

  object_class = box.classList;

  object_default_once = box.dataset.jos_once;
  object_default_animation = box.dataset.jos_animation;

  if (object_default_once == undefined) {
    // alert("JOS: No once specified for this object");
    object_default_once = jos_default_once;
    box.setAttribute("data-jos_once", object_default_once);
  }
  if (object_default_animation == undefined) {
    // alert("JOS: No animation specified for this object");
    object_default_animation = jos_default_animation;
    box.setAttribute("data-jos_animation", object_default_animation);
  }

  // console.log(object_class + "\n" + object_default_animation);

  box.classList.add("jos-" + object_default_animation);

  observer.observe(box);
});
// alert("JOS Loaded !");

console.log(
  "JOS: Javascript Object Scroll Animation Library\n" +
    "Version: 1.0.0\n" +
    "Author: Jesvi Jonathan\n" +
    "Github: https://github.com/jesvijonathan/JOS-Animation-Library\n\n"
);
console.log(
  "JOS Params:\n" +
    "Default Animation: " +
    jos_default_animation +
    "\n" +
    "Default Once: " +
    jos_default_once +
    "\n" +
    "Default Intersection Ratio: " +
    jos_default_intersectionRatio +
    "\n" +
    "Default Threshold: " +
    jos_default_threshold +
    "\n" +
    "Default Duration: " +
    jos_default_duration +
    "\n" +
    "Default Type: " +
    jos_default_type +
    "\n" +
    "Default Root Margin: " +
    jos_default_rootMargin
);

console.log("\nDebug :\n");
