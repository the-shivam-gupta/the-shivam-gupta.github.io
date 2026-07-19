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

var revealTicking = false;
window.addEventListener(
  "scroll",
  function () {
    if (revealTicking) return;
    revealTicking = true;
    requestAnimationFrame(function () {
      reveal();
      revealTicking = false;
    });
  },
  { passive: true },
);

/* arrow onclick scroll down */
document.addEventListener("DOMContentLoaded", function () {
  const arrow = document.querySelector(".arrow");

  if (arrow) {
    arrow.addEventListener("click", () => {
      const scrollDistance = window.innerHeight;
      window.scrollBy(0, scrollDistance);
    });
  }
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
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".header [data-section]");

  navItems.forEach(function (item) {
    item.addEventListener("click", function () {
      const targetId = this.getAttribute("data-section");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});

// Reveal experience timeline dots/cards on scroll down; hide on scroll up
document.addEventListener("DOMContentLoaded", function () {
  const expItems = document.querySelectorAll("#experience .exp-item");

  if ("IntersectionObserver" in window) {
    const expObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("exp-in-view");
          } else {
            entry.target.classList.remove("exp-in-view");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    expItems.forEach(function (item) {
      expObserver.observe(item);
    });
  } else {
    expItems.forEach(function (item) {
      item.classList.add("exp-in-view");
    });
  }
});

/* Project cards — staggered text/icons on scroll */
document.addEventListener("DOMContentLoaded", function () {
  const projectCards = document.querySelectorAll(".project-card");

  if (!projectCards.length) return;

  if ("IntersectionObserver" in window) {
    const projectObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("project-in-view");
          } else {
            entry.target.classList.remove("project-in-view");
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -6% 0px" },
    );

    projectCards.forEach(function (card) {
      projectObserver.observe(card);
    });
  } else {
    projectCards.forEach(function (card) {
      card.classList.add("project-in-view");
    });
  }
});

/* Contact panel — one-shot reveal (no re-animate on scroll up) */
document.addEventListener("DOMContentLoaded", function () {
  const contactPanel = document.querySelector(".contact-panel");

  if (!contactPanel) return;

  if ("IntersectionObserver" in window) {
    const contactObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-in-view");
            contactObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );

    contactObserver.observe(contactPanel);
  } else {
    contactPanel.classList.add("contact-in-view");
  }
});

// Projects: tab switching
document.addEventListener("DOMContentLoaded", function () {
  var main = document.querySelector(".projects-ide__main");
  var sidebarItems = document.querySelectorAll(".projects-ide__file");
  var sidebarButtons = document.querySelectorAll(".projects-ide__file-btn");
  var panels = document.querySelectorAll(".projects-ide__panel");
  var tabbar = document.querySelector(".projects-ide__tabbar");
  var crumbFile = document.querySelector(".projects-ide__crumb-file");
  var ghLink = document.querySelector(".projects-ide__gh-link");

  if (!main || !sidebarButtons.length || !tabbar) return;

  function setActivePanel(targetId) {
    panels.forEach(function (p) {
      p.classList.toggle("is-active", p.id === targetId);
    });

    sidebarItems.forEach(function (item) {
      var btn = item.querySelector(".projects-ide__file-btn");
      item.classList.toggle(
        "is-active",
        btn && btn.getAttribute("data-target") === targetId,
      );
    });

    tabbar.querySelectorAll(".projects-ide__tab").forEach(function (tab) {
      tab.classList.toggle(
        "is-active",
        tab.getAttribute("data-target") === targetId,
      );
    });

    var panel = document.getElementById(targetId);
    var sourceBtn = document.querySelector(
      '.projects-ide__file-btn[data-target="' + targetId + '"]',
    );
    if (panel && sourceBtn) {
      crumbFile.textContent = sourceBtn.querySelector(
        ".projects-ide__file-name",
      ).textContent;
      if (ghLink) ghLink.setAttribute("href", panel.getAttribute("data-repo"));
    }
  }

  function openTab(btn) {
    var targetId = btn.getAttribute("data-target");
    var tab = tabbar.querySelector(
      '.projects-ide__tab[data-target="' + targetId + '"]',
    );

    if (!tab) {
      var fileName = btn.querySelector(".projects-ide__file-name").textContent;

      tab = document.createElement("div");
      tab.className = "projects-ide__tab";
      tab.setAttribute("data-target", targetId);

      var label = document.createElement("span");
      label.className = "projects-ide__tab-label";
      label.textContent = fileName;

      var close = document.createElement("button");
      close.type = "button";
      close.className = "projects-ide__tab-close";
      close.setAttribute("aria-label", "Close " + fileName);

      var closeIcon = document.createElement("img");
      closeIcon.src = "./public/close.png";
      closeIcon.alt = "";
      closeIcon.className = "projects-ide__tab-close-icon";
      close.appendChild(closeIcon);

      tab.appendChild(label);
      tab.appendChild(close);
      tabbar.appendChild(tab);
    }

    main.classList.remove("is-empty");
    setActivePanel(targetId);
    tab.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function closeTab(tab) {
    var wasActive = tab.classList.contains("is-active");
    tab.remove();

    if (!wasActive) return;

    var remaining = tabbar.querySelectorAll(".projects-ide__tab");
    if (remaining.length) {
      setActivePanel(
        remaining[remaining.length - 1].getAttribute("data-target"),
      );
    } else {
      panels.forEach(function (p) {
        p.classList.remove("is-active");
      });
      sidebarItems.forEach(function (item) {
        item.classList.remove("is-active");
      });
      main.classList.add("is-empty");
    }
  }

  sidebarButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      openTab(btn);
    });
  });

  tabbar.addEventListener("click", function (event) {
    var closeBtn = event.target.closest(".projects-ide__tab-close");
    if (closeBtn) {
      closeTab(closeBtn.closest(".projects-ide__tab"));
      return;
    }
    var tab = event.target.closest(".projects-ide__tab");
    if (tab) setActivePanel(tab.getAttribute("data-target"));
  });
});
