document.addEventListener("DOMContentLoaded", () => {
    const allDetails = document.querySelectorAll("details");
  
    allDetails.forEach((detail) => {
      const summary = detail.querySelector("summary");
      const content = summary.nextElementSibling;
  
      if (!content) return;
  
      // Prepare content for animation
      content.style.overflow = "hidden";
      content.style.transition = "height 0.3s ease";
  
      let isAnimating = false;
  
      summary.addEventListener("click", (event) => {
        event.preventDefault();
  
        if (isAnimating) return;
        isAnimating = true;
  
        if (!detail.open) {
          // Opening animation
          detail.open = true;
          const startHeight = 0;
          const endHeight = content.scrollHeight;
  
          content.style.height = startHeight + "px";
          requestAnimationFrame(() => {
            content.style.height = endHeight + "px";
          });
  
          content.addEventListener(
            "transitionend",
            () => {
              content.style.height = "auto";
              isAnimating = false;
            },
            { once: true }
          );
        } else {
          // Closing animation
          const startHeight = content.scrollHeight;
          content.style.height = startHeight + "px";
  
          requestAnimationFrame(() => {
            content.style.height = "0px";
          });
  
          content.addEventListener(
            "transitionend",
            () => {
              detail.open = false;
              isAnimating = false;
            },
            { once: true }
          );
        }
      });
    });
  });
  