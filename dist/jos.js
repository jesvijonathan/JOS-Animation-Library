onload = () => {
  const jos_stylesheet = document.getElementById("jos-stylesheet").sheet;
  //   jos_css = document.getElementsByClassName("jos");
  let transition_temp = jos_default_duration + "s " + jos_default_type;
  //   console.log(transition_temp);
  jos_stylesheet.insertRule(
    ".jos { transition: " + transition_temp + " !important; }"
  );
};

function fly_in(target, state) {
  if (state) {
    target.classList.add("fly_in");
  } else {
    target.classList.remove("fly_in");
  }
}

function example() {
  console.log("You Have Invoked Custom Scroll Function !");
}

function animation_invoker(target, state) {
  let target_jos_animation = target.dataset.jos_animation;

  if (state) {
    target.classList.remove("jos-" + target_jos_animation);
    console.log("jos-" + target_jos_animation);

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
      console.log("Animation-Triggered");
      animation_invoker(target, true);
      if (target.dataset.jos_once == "true") {
        // target.classList.remove("jos");
        console.log("Removed-Observer");
        observer.unobserve(target);
      }
    }
  } else {
    if (target.dataset.jos_animation) {
      console.log("Animation-Reverting");
      animation_invoker(target, false);
    }
  }
}

var options = {
  root: null,
  rootMargin: "100px",
  threshold: jos_default_threshold,
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
