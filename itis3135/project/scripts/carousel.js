/* =========================================================
   carousel.js
   Simple read-only photo carousel for Preston Forest homepage
   ========================================================= */

   document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll("#carousel .carousel-container img");
    const prevBtn = document.querySelector("#carousel .prev");
    const nextBtn = document.querySelector("#carousel .next");
    let index = 0;
    let interval;
  
    function showSlide(i) {
      slides.forEach((img, idx) => {
        img.classList.toggle("active", idx === i);
      });
    }
  
    function nextSlide() {
      index = (index + 1) % slides.length;
      showSlide(index);
    }
  
    function prevSlide() {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    }
  
    // Auto rotation
    function startCarousel() {
      interval = setInterval(nextSlide, 5000); // 5 seconds per slide
    }
  
    function stopCarousel() {
      clearInterval(interval);
    }
  
    // Controls
    nextBtn.addEventListener("click", () => {
      stopCarousel();
      nextSlide();
      startCarousel();
    });
  
    prevBtn.addEventListener("click", () => {
      stopCarousel();
      prevSlide();
      startCarousel();
    });
  
    showSlide(index);
    startCarousel();
  });
  