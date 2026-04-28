document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.getElementById("mobileMenu");
  const counterSection = document.getElementById("counters");
  const counterElements = document.querySelectorAll("[data-target]");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  const animateCounter = (element, target) => {
    const duration = 1600;
    const startTime = performance.now();

    const step = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const currentValue = Math.floor(progress * target);
      element.textContent = currentValue.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    requestAnimationFrame(step);
  };

  if (counterSection && counterElements.length) {
    const resetCounters = () => {
      counterElements.forEach((element) => {
        element.textContent = "0";
      });
    };

    const startCounters = () => {
      counterElements.forEach((element) => {
        const target = Number(element.dataset.target || 0);
        animateCounter(element, target);
      });
    };

    let sectionWasVisible = false;

    const checkCounters = () => {
      const rect = counterSection.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.7 && rect.bottom > window.innerHeight * 0.25;

      if (isVisible && !sectionWasVisible) {
        sectionWasVisible = true;
        startCounters();
        return;
      }

      if (!isVisible && sectionWasVisible) {
        sectionWasVisible = false;
        resetCounters();
      }
    };

    let ticking = false;
    const requestCheck = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        checkCounters();
        ticking = false;
      });
    };

    window.addEventListener("scroll", requestCheck, { passive: true });
    window.addEventListener("resize", requestCheck);
    requestCheck();

    if (!sectionWasVisible) {
      resetCounters();
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const target = document.querySelector(anchor.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const age = document.getElementById("age");
    const feedback = document.getElementById("formFeedback");
    const phoneRegex = /^[0-9+\-\s]{8,15}$/;
    let valid = true;

    [name, phone, age].forEach((el) => {
      el.classList.remove("border-red-500");
      const errorText = el.nextElementSibling;
      if (errorText) {
        errorText.classList.add("hidden");
      }
    });

    if (!name.value.trim()) {
      name.classList.add("border-red-500");
      if (name.nextElementSibling) name.nextElementSibling.classList.remove("hidden");
      valid = false;
    }

    if (!phoneRegex.test(phone.value.trim())) {
      phone.classList.add("border-red-500");
      if (phone.nextElementSibling) phone.nextElementSibling.classList.remove("hidden");
      valid = false;
    }

    const ageNumber = Number(age.value);
    if (!age.value || ageNumber < 1 || ageNumber > 120) {
      age.classList.add("border-red-500");
      if (age.nextElementSibling) age.nextElementSibling.classList.remove("hidden");
      valid = false;
    }

    feedback.textContent = valid
      ? "Your request has been sent successfully."
      : "Please complete all fields correctly.";
    feedback.className = valid
      ? "mt-2 text-sm font-semibold text-emerald-600"
      : "mt-2 text-sm font-semibold text-red-600";

    if (valid) form.reset();
  });
});
