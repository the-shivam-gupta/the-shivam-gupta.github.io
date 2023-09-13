function reveal() {
  var reveals = document.querySelectorAll(".reveal");

  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

/* arrow onclick scroll down */
document.addEventListener("DOMContentLoaded", function () {
  const arrow = document.querySelector(".arrow");

  arrow.addEventListener("click", () => {
    const scrollDistance = window.innerHeight;
    window.scrollBy(0, scrollDistance);
  });
});

// bottom to top button script

$(document).ready(function () {
  var btn = $("#button");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    window.scrollTo(0, 0);
  });
});

// links for directing to specific content to tag
document.addEventListener("DOMContentLoaded", function() {
  const navItems = document.querySelectorAll(".__container [data-section]");

  navItems.forEach(function(item) {
      item.addEventListener("click", function() {
          const targetId = this.getAttribute("data-section");
          const targetSection = document.getElementById(targetId);
          
          if (targetSection) {
              window.scrollTo({
                  top: targetSection.offsetTop,
                  behavior: "smooth"
              });
          }
      });
  });
});
