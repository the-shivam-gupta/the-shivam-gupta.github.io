// Splash screen: hide after the intro animation finishes
document.addEventListener("DOMContentLoaded", function () {
  var splashScreen = document.getElementById("splash-screen");
  if (!splashScreen) return;

  var delay = 4500;

  setTimeout(function () {
    splashScreen.classList.add("hidden");

    setTimeout(function () {
      splashScreen.style.display = "none";
    }, 1000);
  }, delay);
});

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

// bottom to top button with scroll progress ring
$(document).ready(function () {
  var btn = $("#button");
  var fill = document.querySelector(".progress-ring__fill");
  var circumference = 125.66;

  function updateProgress() {
    var scrollTop = $(window).scrollTop();
    var docHeight = $(document).height() - $(window).height();
    var progress = docHeight > 0 ? scrollTop / docHeight : 0;
    var offset = circumference * (1 - progress);
    if (fill) fill.style.strokeDashoffset = offset;

    if (scrollTop > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  }

  $(window).on("scroll", updateProgress);
  updateProgress();

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

// Nav pill: sliding active indicator, scroll elevation, active-section tracking
document.addEventListener("DOMContentLoaded", function () {
  var headerEl = document.querySelector(".header");
  var navPillItems = document.querySelectorAll(".nav-pill__item");
  var navIndicator = document.querySelector(".nav-pill__indicator");

  if (!headerEl || !navPillItems.length || !navIndicator) return;

  function moveNavIndicator(item) {
    navIndicator.style.width = item.offsetWidth + "px";
    navIndicator.style.transform = "translateX(" + item.offsetLeft + "px)";
  }

  function setActiveNavItem(targetId) {
    navPillItems.forEach(function (item) {
      var isActive = item.getAttribute("data-section") === targetId;
      item.classList.toggle("is-active", isActive);
      if (isActive) moveNavIndicator(item);
    });
  }

  navPillItems.forEach(function (item) {
    item.addEventListener("click", function () {
      setActiveNavItem(item.getAttribute("data-section"));
    });
  });

  var sections = ["home", "about", "experience", "project", "contact"]
    .map(function (id) {
      return document.getElementById(id);
    })
    .filter(Boolean);

  function updateOnScroll() {
    headerEl.classList.toggle("is-scrolled", window.scrollY > 12);

    var scrollPos = window.scrollY + window.innerHeight * 0.35;
    var current = "home";

    sections.forEach(function (section) {
      if (section.id !== "home" && section.offsetTop <= scrollPos) {
        current = section.id;
      }
    });

    setActiveNavItem(current);
  }

  var navTicking = false;
  window.addEventListener(
    "scroll",
    function () {
      if (navTicking) return;
      navTicking = true;
      requestAnimationFrame(function () {
        updateOnScroll();
        navTicking = false;
      });
    },
    { passive: true },
  );

  window.addEventListener("resize", function () {
    var active = document.querySelector(".nav-pill__item.is-active");
    if (active) moveNavIndicator(active);
  });

  updateOnScroll();
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

// About: tab switching
document.addEventListener("DOMContentLoaded", function () {
  var aboutTabs = document.querySelectorAll(".about-tab");
  var aboutPanels = document.querySelectorAll(".about-panel");
  var aboutIndicator = document.querySelector(".about-tab-indicator");

  if (!aboutTabs.length || !aboutIndicator) return;

  function moveAboutIndicator(tab) {
    aboutIndicator.style.width = tab.offsetWidth + "px";
    aboutIndicator.style.transform = "translateX(" + tab.offsetLeft + "px)";
  }

  aboutTabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      if (tab.classList.contains("is-active")) return;

      aboutTabs.forEach(function (t) {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      aboutPanels.forEach(function (panel) {
        panel.classList.toggle(
          "is-active",
          panel.id === tab.getAttribute("data-target"),
        );
      });

      moveAboutIndicator(tab);
    });
  });

  var initialAboutTab = document.querySelector(".about-tab.is-active");
  if (initialAboutTab) moveAboutIndicator(initialAboutTab);

  window.addEventListener("resize", function () {
    var activeTab = document.querySelector(".about-tab.is-active");
    if (activeTab) moveAboutIndicator(activeTab);
  });
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

  var folderToggle = document.querySelector(".projects-ide__folder");
  var fileList = document.getElementById("ide-filelist");
  if (folderToggle && fileList) {
    folderToggle.addEventListener("click", function () {
      var isOpen = folderToggle.getAttribute("aria-expanded") === "true";
      folderToggle.setAttribute("aria-expanded", String(!isOpen));
      fileList.classList.toggle("is-collapsed", isOpen);
    });
  }

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

/* ── Scroll Storytelling ── */

var storyTyped = false;

function runStory(entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var el = entry.target;
    var step = el.getAttribute("data-story");

    if (step === "3") {
      el.classList.add("story-visible");
    }

    if (step === "4" && !storyTyped) {
      storyTyped = true;
      var text = "visitor@shivam:~/projects$ ls";
      var i = 0;
      (function typeChar() {
        if (i < text.length) {
          el.insertBefore(
            document.createTextNode(text.charAt(i)),
            el.querySelector(".projects-ide__cursor")
          );
          i++;
          setTimeout(typeChar, 60);
        }
      })();
    }

    if (step === "5") {
      el.classList.add("story-visible");
    }
  });
}

var storyObserver = new IntersectionObserver(runStory, {
  threshold: 0.35,
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("[data-story]").forEach(function (el) {
    storyObserver.observe(el);
  });
});

