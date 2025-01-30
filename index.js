// Card rendering is setup to work if JS events doesn't fire

$(document).ready(function () {
    $(window).on("scroll", function () {
        $(".card__reveal, .card__conceal").each(function () {
            let scrollTop = $(window).scrollTop();
            let cardOffset = $(this).offset().top;
            let windowHeight = $(window).height();
            
            // Calculate shadow intensity based on card position
            let intensity = Math.max(0, Math.min(10, (windowHeight - (cardOffset - scrollTop)) / 50));
            
            // Apply dynamic box-shadow
            $(this).css("box-shadow", `0 ${intensity}vh ${intensity * 0.8}vh -${intensity * 0.5}vh rgba(0, 0, 0, 0.5)`);
        });
    });
});

const observerOptions = {
  root: null, // Null = based on viewport
  rootMargin: "0px", // Margin for root
  threshold: 0.1 // Visibility percentage needed to execute function
};

function observerCallback(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Fadeing in reveal overlay when observed elements are in of view
      entry.target.classList.replace("overlay__reveal", "overlay__reveal--visible");
      entry.target.classList.replace("overlay__conceal", "overlay__conceal--visible");
    } else {
      // Fadeing out reveal overlay when observed elements are out of view
      entry.target.classList.replace("overlay__reveal--visible", "overlay__reveal");
      entry.target.classList.replace("overlay__conceal--visible", "overlay__conceal");
    }
  });
}

// Fetches card elements from DOM
const fadeOutElms = document.querySelectorAll(".card__reveal");
const fadeInElms = document.querySelectorAll(".card__conceal");

// Calls the function for each card element
const observer = new IntersectionObserver(observerCallback, observerOptions);
fadeOutElms.forEach((el) => observer.observe(el));
fadeInElms.forEach((el) => observer.observe(el));
