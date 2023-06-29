if (entry.boundingClientRect.top < 0) {
  console.log(
    "scroll up",

    entry.boundingClientRect.top,
    entry.isIntersecting,
    target.dataset.jos_scrolldir
  );
  scroll_dir = 0;
} else {
  console.log(
    "scroll down",
    entry.boundingClientRect.top,
    entry.isIntersecting,
    target.dataset.jos_scrolldir
  );
  scroll_dir = 1;
}
//entry.intersectionRatio > this.default_intersectionRatio
if (entry.isIntersecting) {
  state = "Enter";

  // add to element counter

  if (target.dataset.jos_counter != undefined) {
    let counter_value = parseInt(target.dataset.jos_counter);
    counter_value++;
    target.dataset.jos_counter = counter_value;
    text_iterationCount = "\n    | Counter : " + counter_value;
  }
  // start animation
  if (target_jos_animation) {
    target.classList.remove("jos-" + target_jos_animation);

    // check for element invoke function
    if (target.dataset.jos_invoke != undefined) {
      window[target.dataset.jos_invoke](target);
      text_invoke = "\n    | Invoked : " + target.dataset.jos_invoke;
    }

    // once or n times on viewport logic
    if (
      target.dataset.jos_once != undefined ||
      target.dataset.jos_once != "false"
    ) {
      // target.classList.remove("jos");
      // console.log("Removed-Observer");
      if (target.dataset.jos_once == "true") {
        observer.unobserve(target);
        text_once = "\n    | Once :  Removed Observer (1)";
      } else if (target.dataset.jos_counter >= target.dataset.jos_once) {
        observer.unobserve(target);
        text_once =
          "\n    | Once :  Removed Observer (" + target.dataset.jos_once + ")";
      }
    }
  }

  // iiterate the counter for the element
} else {
  // revert animation
  if (scroll_dir == 1 && target.dataset.jos_scrolldir != "down") {
    state = "Exit";
    target.classList.add("jos-" + target_jos_animation);

    // check for element invoke function
    if (target.dataset.jos_invoke_out != undefined) {
      window[target.dataset.jos_invoke_out](target);
      text_invoke = "\n    | Invoked : " + target.dataset.jos_invoke_out;
    }
  }
}
