"use strict";

$(document).ready(function () {
  /* Video Lightbox */
  if (!!$.prototype.simpleLightboxVideo) {
    $(".video").simpleLightboxVideo();
  }

  /*ScrollUp*/
  if (!!$.prototype.scrollUp) {
    $.scrollUp();
  }

  /*Responsive Navigation*/
  $("#nav-mobile").html($("#nav-main").html());
  $("#nav-trigger span").on("click", function () {
    if ($("nav#nav-mobile ul").hasClass("expanded")) {
      $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
      $(this).removeClass("open");
    } else {
      $("nav#nav-mobile ul").addClass("expanded").slideDown(250);
      $(this).addClass("open");
    }
  });

  $("#nav-mobile").html($("#nav-main").html());
  $("#nav-mobile ul a").on("click", function () {
    if ($("nav#nav-mobile ul").hasClass("expanded")) {
      $("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
      $("#nav-trigger span").removeClass("open");
    }
  });

  /* Sticky Navigation */
  if (!!$.prototype.stickyNavbar) {
    $("#banner").stickyNavbar();
  }
});

/* Preloader and animations */
$(window).load(function () {
  // makes sure the whole site is loaded
  $("#status").fadeOut(); // will first fade out the loading animation
  $("#preloader").delay(350).fadeOut("slow"); // will fade out the white DIV that covers the website.
  $("body").delay(350).css({ "overflow-y": "visible" });

  /* WOW Elements */
  if (typeof WOW == "function") {
    new WOW().init();
  }

  /* Parallax Effects */
  if (!!$.prototype.enllax) {
    $(window).enllax();
  }
});

document.addEventListener("DOMContentLoaded", function () {
  function updateSpanColors() {
    var links = document.querySelectorAll("#nav-main li a");

    links.forEach(function (link) {
      var svg = link.previousElementSibling;

      if (link.classList.contains("active")) {
        if (svg && svg.classList.contains("highlight-icon")) {
          svg.style.color = "#2ab8cd";
          svg.style.filter = `
          drop-shadow(0 0 5px #2AB8CD)
          drop-shadow(0 0 10px #2AB8CD)
          drop-shadow(0 0 20px #2AB8CD)
          drop-shadow(0 0 40px #2AB8CD)
          drop-shadow(0 0 80px #2AB8CD)
          drop-shadow(0 0 120px #2AB8CD)
    `;
        }
      } else {
        if (svg && svg.classList.contains("highlight-icon")) {
          svg.style.color = "";
          svg.style.filter = "";
        }
      }
    });
  }

  updateSpanColors();

  window.addEventListener("scroll", updateSpanColors);

  const sectionAExclure = document.getElementById("about");

  if (sectionAExclure) {
    sectionAExclure.removeAttribute("tabindex");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionne tous les liens de la navbar
  const navLinks = document.querySelectorAll("#nav-main a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      const target = link.getAttribute("href");

      // Vérifie si le lien est un ID (scroll vers une section)
      if (target.startsWith("#")) {
        event.preventDefault();
        const section = document.querySelector(target);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // Sinon, c'est un lien vers une autre page, pas besoin d'empêcher le comportement par défaut
        window.location.href = target;
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const updateCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const current = +counter.innerText;
    const increment = target / 200;

    if (current < target) {
      counter.innerText = Math.ceil(current + increment);
      setTimeout(() => updateCounter(counter), 20);
    } else {
      counter.innerText = target;
    }
  };

  const onIntersect = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        updateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(onIntersect, {
    threshold: 0.5,
  });

  counters.forEach((counter) => {
    observer.observe(counter);
  });
});

// Sélectionner la section à exclure
const sectionAExclure = document.getElementById("about");

// Retirer l'attribut tabindex de cette section spécifique
if (sectionAExclure) {
  sectionAExclure.removeAttribute("tabindex");
}
