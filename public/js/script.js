// Testimonials Carousel Script

// ** Variables **
const carouselContainer = document.querySelector(".testimonialList");
const testimonials = Array.from(carouselContainer.children);
const carouselButtons = document.querySelector("#carouselButtons");
const dots = Array.from(carouselButtons.children);

// Define the width of the carousel container (the ul) so that even if the screen is responsive we know the exact width
const containerWidth = carouselContainer.getBoundingClientRect().width;

// Arrange the testimonials next to each other
const setTestimonialPosition = (testimonial, index) => {
  testimonial.style.left = containerWidth * index + "px";
};

testimonials.forEach(setTestimonialPosition);
console.log(carouselContainer.children[0]);
// Move testimonials back and forth over given time

carouselContainer.children[0].classList.add("current-slide");

const moveTestimonials = () => {
  let currentSlide = carouselContainer.querySelector(".current-slide");
  let nextSlide = currentSlide.nextElementSibling;

  // move the transition container
  if (nextSlide !== null) {
    let amountToMove = nextSlide.style.left;
    carouselContainer.style.transform = `translateX(-${amountToMove})`;
    currentSlide.classList.remove("current-slide");
    nextSlide.classList.add("current-slide");
  } else {
    currentSlide.classList.remove("current-slide");
    carouselContainer.children[0].classList.add("current-slide");
    carouselContainer.style.transform = "translateX(0)";
  }
};

setInterval(moveTestimonials, 5000);
