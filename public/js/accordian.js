// Accordian Script for Admin Page

const accordians = document.querySelectorAll(".accordian");

accordians.forEach(accordian => {
  accordian.addEventListener("click", function() {
    console.log("clicked");
    this.classList.toggle("active");

    let panel = this.nextElementSibling;

    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});
