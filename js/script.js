const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  const navLinks = navMenu.querySelectorAll("a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

const slides = document.querySelectorAll(".slide");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");
const sliderDots = document.getElementById("sliderDots");

let currentSlide = 0;
let slideInterval;

function createDots() {
  if (!sliderDots || slides.length === 0) return;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.setAttribute("aria-label", `Go to slide ${index + 1}`);

    if (index === 0) {
      dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
      showSlide(index);
      resetAutoSlide();
    });

    sliderDots.appendChild(dot);
  });
}

function updateDots() {
  if (!sliderDots) return;

  const dots = sliderDots.querySelectorAll("button");

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function showSlide(index) {
  if (slides.length === 0) return;

  slides[currentSlide].classList.remove("active");

  currentSlide = index;

  if (currentSlide < 0) {
    currentSlide = slides.length - 1;
  }

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }

  slides[currentSlide].classList.add("active");
  updateDots();
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide() {
  slideInterval = setInterval(nextSlide, 3500);
}

function resetAutoSlide() {
  clearInterval(slideInterval);
  startAutoSlide();
}

if (slides.length > 0) {
  createDots();
  startAutoSlide();

  if (nextSlideBtn) {
    nextSlideBtn.addEventListener("click", () => {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevSlideBtn) {
    prevSlideBtn.addEventListener("click", () => {
      prevSlide();
      resetAutoSlide();
    });
  }
}