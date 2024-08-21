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

/* Ajout Js Angèle */

// Comportement des ronds dans la navbar et du lien GOT Connexion
document.addEventListener("DOMContentLoaded", function () {
  function updateSpanColors() {
    var links = document.querySelectorAll("#nav-main li a");

    links.forEach(function (link) {
      var svg = link.previousElementSibling;

      if (link.classList.contains("active")) {
        if (svg && svg.classList.contains("highlight-icon")) {
          // Change la couleur du contour du cercle
          svg.querySelector("circle").style.stroke = "#2ab8cd";
          // Remplit le cercle avec une couleur
          svg.querySelector("circle").style.fill = "#2ab8cd";
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
          svg.querySelector("circle").style.fill = "transparent";
          svg.querySelector("circle").style.stroke = "#f6a316";
          svg.style.filter = "none";
        }
      }
    });
  }

  updateSpanColors();

  window.addEventListener("scroll", updateSpanColors);

  // Attacher les événements mouseenter et mouseleave à chaque lien
  var links = document.querySelectorAll("#nav-main li a");
  links.forEach(function (link) {
    link.addEventListener("mouseenter", function () {
      var svg = link.previousElementSibling;
      if (svg && svg.classList.contains("highlight-icon")) {
        svg.querySelector("circle").style.stroke = "#f6a316";
        svg.querySelector("circle").style.fill = "#f6a316";
        // svg.style.filter = `
        // drop-shadow(0 0 5px #2AB8CD)
        // drop-shadow(0 0 10px #2AB8CD)
        // drop-shadow(0 0 20px #2AB8CD)
        // drop-shadow(0 0 40px #2AB8CD)
        // drop-shadow(0 0 80px #2AB8CD)
        // drop-shadow(0 0 120px #2AB8CD)
        // `;
      }
    });

    link.addEventListener("mouseleave", function () {
      updateSpanColors(); // Rétablit les couleurs d'origine ou actives
    });
  });
  const sectionAExclure = document.getElementById("about");
  const sectionAExclure2 = document.getElementById("testimonials");

  if (sectionAExclure) {
    sectionAExclure.removeAttribute("tabindex");
    sectionAExclure2.removeAttribute("tabindex");
  }
});

// Comportement des liens dnas la navbar au scrol sur la page
document.addEventListener("DOMContentLoaded", function () {
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
        window.location.href = target;
      }
    });
  });
});

// Compteur pour section GOT-Ame
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

/* Carousel */
// Fonction générique pour mettre à jour la visibilité des cartes dans une galerie spécifique
function updateGallery(galleryDivs, startIndex, visibleCards) {
  galleryDivs.forEach((div, index) => {
    if (index >= startIndex && index < startIndex + visibleCards) {
      div.style.display = "flex";
    } else {
      div.style.display = "none";
    }
  });
}

// Fonction générique pour gérer les événements de clic
function setupCarousel(gallerySelector, rightArrowSelector, leftArrowSelector, visibleCards) {
  const galleryDivs = document.querySelectorAll(gallerySelector);
  const slideToRight = document.getElementById(rightArrowSelector);
  const slideToLeft = document.getElementById(leftArrowSelector);
  let startIndex = 0;

  // Initialisation de la galerie
  updateGallery(galleryDivs, startIndex, visibleCards);

  // Événement pour la flèche de droite
  slideToRight.addEventListener("click", function () {
    if (startIndex + visibleCards < galleryDivs.length) {
      startIndex++;
      updateGallery(galleryDivs, startIndex, visibleCards);
    }

    // Afficher la flèche de gauche
    if (startIndex > 0) {
      slideToLeft.classList.remove("hidden");
      slideToLeft.classList.add("arrow-left");
    }

    // Masquer la flèche de droite si c'est la fin
    if (startIndex + visibleCards >= galleryDivs.length) {
      slideToRight.classList.add("hidden");
    }
  });

  // Événement pour la flèche de gauche
  slideToLeft.addEventListener("click", function () {
    console.log("click left");
    if (startIndex > 0) {
      startIndex--;
      updateGallery(galleryDivs, startIndex, visibleCards);
    }

    // Afficher la flèche de droite
    if (startIndex + visibleCards < galleryDivs.length) {
      slideToRight.classList.remove("hidden");
    }

    // Masquer la flèche de gauche si c'est le début
    if (startIndex === 0) {
      slideToLeft.classList.add("hidden");
    }
  });
}

// Initialisation du carousel pour la première section
setupCarousel(".card-gallery", "right-arrow-1", "left-arrow-1", 4);

// Initialisation du carousel pour la deuxième section
setupCarousel(".cards-testimonials .classic", "right-arrow-2", "left-arrow-2", 3);


// URL de l'App Script
// https://script.google.com/macros/s/AKfycby9dxiHuZowuSEEKPH_Jf3jk4cQUDxpIIVtdH5MRwJdI9ki4Wku_xntU63QDhV7S5IV9w/exec

document.getElementById('my-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const url = 'https://script.google.com/macros/s/AKfycby9dxiHuZowuSEEKPH_Jf3jk4cQUDxpIIVtdH5MRwJdI9ki4Wku_xntU63QDhV7S5IV9w/exec'; 
  const formData = new FormData(document.getElementById('my-form'));
  console.log("🚀 ~ document.getElementById ~ formData:", formData)

  fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      body: formData
  }).then(response => {
      alert('Données envoyées avec succès!');
  }).catch(error => {
      alert('Erreur lors de l\'envoi des données.');
  });
});