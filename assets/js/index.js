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
  if (form) {
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

      const t = window.i18n && typeof window.i18n.t === "function" ? window.i18n.t : (key) => key;
      if (feedback) {
        feedback.textContent = valid
          ? t("form.feedback.success")
          : t("form.feedback.error");
        feedback.className = valid
          ? "mt-2 text-sm font-semibold text-emerald-600"
          : "mt-2 text-sm font-semibold text-red-600";
      }

      if (valid) form.reset();
    });
  }

  // Reviews Slider - manually curated reviews
  const reviews = [
    {
      name: "Salma Ahmed",
      rating: 5,
      date: "3 months ago",
      text: "اكتر مكان في السويس بالنسبالي لعياده أسنان ثقه وخدمه والتعامل فوق الوصف حقيقي شكرا يا دكتور ولتيم حضرتك\nاكتر مكان ثقه في السويس"
    },
    {
      name: "Eman Galal",
      rating: 5,
      date: "3 months ago",
      text: "احسن عياده اسنان واشطر دكتوره فدنياا والله"
    },
    {
      name: "abdullah shah",
      rating: 5,
      date: "a year ago",
      text: "I recently visited Dental Delight in Suez, and I couldn't be more impressed with the experience. Dr. Menna  Abdullah, the dentist, is truly exceptional. As a specialist in oral and dental surgery and a member of the Royal College of …"
    },
    {
      name: "Walaa Mostafa",
      rating: 5,
      date: "2 months ago",
      text: "دكتوره جميله و مريحه جدا"
    },
    {
      name: "Hafsa",
      rating: 5,
      date: "a year ago",
      text: "Coming from the UK, i was pleasantly surprised by Dental delight\nDr. Menna Abdullah exceeded my expectations. Professional, gentle, and caring. Highly recommend!"
    },
    {
      name: "Rawda Ibrahim",
      rating: 5,
      date: "a year ago",
      text: "The best dental clinic in Suez.\nDr. Menna Abdullah, especially, is very professional and patient.\nHighly recommended."
    },
    {
      name: "Mariam Elkayal",
      rating: 5,
      date: "a year ago",
      text: "دكتوره منه ذوق واحسن ما يمكن في ف التعامل و شاطره جدا اللهم بارك وعندها صبر ربنا يبارك ❤️😘 …"
    },
    {
      name: "Amna Farag",
      rating: 5,
      date: "a year ago",
      text: "الدكتورة كووتي وشطورة جداً ربنا يحفظها ويبارك فيها والعيادة مريحة نفسياً لدرجة النوم والله😂♥️♥️ …"
    },
    {
      name: "michael nabil",
      rating: 5,
      date: "2 months ago",
      text: "I’ve always been nervous about dental visits, but this team completely changed my perspective. From the moment I walked in, I was greeted with warmth and professionalism. The procedure was painless, efficient, and handled with such care. If you're looking for a dentist who truly listens and prioritizes your comfort, look no further"
    },
    {
      name: "Omar Hussien",
      rating: 5,
      date: "a year ago",
      text: "عيادة ممتازة\nأطباء لديهم خبرة في العمل تبارك الله"
    },
    {
      name: "Azza Ramadan",
      rating: 5,
      date: "a year ago",
      text: "بصراحه دكتوره منه ممتازه جدا ومن ناحية التعقيم فيه اهتمام شديد"
    },
    {
      name: "Abdulrahman Zaky",
      rating: 5,
      date: "a year ago",
      text: "من افضل العيادات تعامل رائع و اتقان في العمل"
    },
    {
      name: "زمزم سعيد",
      rating: 5,
      date: "a year ago",
      text: "المكان في منتهى النظافه والرعايه الطبيه على اعلى مستوى"
    },
    {
      name: "karem nabil",
      rating: 5,
      date: "a year ago",
      text: "من أفضل دكاترة الاسنان في السويس"
    },
    {
      name: "sohaila khaled",
      rating: 5,
      date: "a year ago",
      text: "Very professional and efficient clinic"
    },
    {
      name: "Abdelbaset Draz",
      rating: 5,
      date: "a year ago",
      text: "Very good and accurate"
    },
    {
      name: "Yomna Mohamed",
      rating: 5,
      date: "2 weeks ago",
      text: "A very clean and trust worthy practice, very professional doctor and lovely staff.\n10/10 👌🏻 …"
    }
  ];
  let currentReviewIndex = 0;
  const totalSlides = reviews.length;

  const renderReviews = () => {
    const slider = document.getElementById("reviewsSlider");
    const dotsContainer = document.getElementById("sliderDots");
    if (!slider || !dotsContainer) return;

    slider.innerHTML = "";
    dotsContainer.innerHTML = "";

    const buildCard = (review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "w-full flex-shrink-0 px-4 md:px-0";

      const stars = Array.from({ length: review.rating }, () => "★").join("");

      reviewDiv.innerHTML = `
        <article class="testimonial-card rounded-2xl border border-clinic-mist/30 bg-white p-6 shadow-sm mx-auto max-w-3xl">
          <div class="flex justify-center text-clinic-gold text-lg mb-3">${stars}</div>
          <p class="testimonial-text text-center text-sm text-slate-600 italic whitespace-pre-line">"${review.text}"</p>
          <div class="testimonial-meta mt-4 text-center">
            <p class="text-sm font-bold text-clinic-teal">- ${review.name}</p>
            <p class="mt-1 text-xs text-slate-500">${review.date}</p>
          </div>
        </article>
      `;

      return reviewDiv;
    };

    reviews.forEach((review) => {
      const reviewDiv = buildCard(review);
      slider.appendChild(reviewDiv);
    });

    currentReviewIndex = 0;
    updateSliderPosition(false);

    reviews.forEach((review, index) => {
      const dot = document.createElement("button");
      dot.className = `h-2 rounded-full transition ${index === 0 ? 'bg-clinic-teal w-6' : 'bg-clinic-mist w-2'}`;
      dot.addEventListener("click", () => goToReview(index));
      dotsContainer.appendChild(dot);
    });
  };

  const goToReview = (index) => {
    if (totalSlides === 0) return;
    currentReviewIndex = index;
    updateSliderPosition();
  };

  const updateSliderPosition = (withTransition = true) => {
    const slider = document.getElementById("reviewsSlider");
    if (!slider) return;
    slider.style.transition = withTransition ? "transform 500ms ease-out" : "none";
    const offset = -currentReviewIndex * 100;
    slider.style.transform = `translateX(${offset}%)`;

    // Update dots
    document.querySelectorAll("#sliderDots button").forEach((dot, index) => {
      if (index === currentReviewIndex) {
        dot.className = "h-2 rounded-full transition bg-clinic-teal w-6";
      } else {
        dot.className = "h-2 rounded-full transition bg-clinic-mist w-2";
      }
    });

    updateNavButtons();
  };

  const updateNavButtons = () => {
    const prevButton = document.getElementById("prevReview");
    const nextButton = document.getElementById("nextReview");
    if (!prevButton || !nextButton) return;

    const atStart = currentReviewIndex <= 0;
    const atEnd = currentReviewIndex >= totalSlides - 1;

    prevButton.disabled = atStart;
    nextButton.disabled = atEnd;
    prevButton.classList.toggle("is-disabled", atStart);
    nextButton.classList.toggle("is-disabled", atEnd);
  };
  const nextReview = () => {
    if (totalSlides === 0) return;
    if (currentReviewIndex >= totalSlides - 1) return;
    currentReviewIndex += 1;
    console.log(totalSlides, reviews.length);

    updateSliderPosition();
  };

  const prevReview = () => {
    if (totalSlides === 0) return;
    if (currentReviewIndex <= 0) return;
    currentReviewIndex -= 1;
    updateSliderPosition();
  };

  let autoSlideInterval;

  const startAutoSlide = () => {
    // Clear previous interval if any
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    // Auto-slide every 8 seconds
    autoSlideInterval = setInterval(nextReview, 8000);
  };

  document.getElementById("nextReview")?.addEventListener("click", nextReview);
  document.getElementById("prevReview")?.addEventListener("click", prevReview);

  renderReviews();
  startAutoSlide();

  // ─── CASES SLIDER ────────────────────────
  const casesData = [
    {
      img: "./assets/images/Cases/Case1.jpeg",
      alt: "Whitening case 1",
      categoryKey: "cases.labels.whitening",
      titleKey: "cases.items.whitening1"
    },
    {
      img: "./assets/images/Cases/Case2.webp",
      alt: "Implant case 1",
      categoryKey: "cases.labels.implants",
      titleKey: "cases.items.implants1"
    },
    {
      img: "./assets/images/Cases/Case3.webp",
      alt: "Ortho case 1",
      categoryKey: "cases.labels.orthodontics",
      titleKey: "cases.items.orthodontics1"
    },
    {
      img: "./assets/images/Cases/Case4.webp",
      alt: "Whitening case 2",
      categoryKey: "cases.labels.whitening",
      titleKey: "cases.items.whitening2"
    },
    {
      img: "./assets/images/Cases/Case5.webp",
      alt: "Implant case 2",
      categoryKey: "cases.labels.implants",
      titleKey: "cases.items.implants2"
    },
    {
      img: "./assets/images/Cases/Case6.webp",
      alt: "Ortho case 2",
      categoryKey: "cases.labels.orthodontics",
      titleKey: "cases.items.orthodontics2"
    }
  ];

  let currentCaseIndex = 0;
  const totalCases = casesData.length;

  const getVisibleCasesCount = () => {
    if (window.innerWidth >= 1024) return 3; // lg
    if (window.innerWidth >= 768) return 2;  // md
    return 1; // sm
  };

  const renderCases = () => {
    const slider = document.getElementById("casesSlider");
    if (!slider) return;

    slider.innerHTML = "";

    const buildCaseCard = (item) => {
      const cardDiv = document.createElement("div");
      cardDiv.className = "case-slide";

      cardDiv.innerHTML = `
        <article class="case-card group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:shadow-xl mx-auto h-full flex flex-col">
          <div class="relative aspect-[4/3] overflow-hidden rounded-2xl">
            <img src="${item.img}" alt="${item.alt}" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110">
          </div>
          <div class="mt-4 text-center flex-grow flex flex-col justify-between">
            <div>
              <div class="mb-1.5 inline-block rounded-md bg-clinic-mist/20 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wider text-clinic-teal">
                <span data-i18n="${item.categoryKey}"></span>
              </div>
              <h3 class="font-['Cormorant_Garamond',serif] text-lg font-bold text-slate-900 leading-snug" data-i18n="${item.titleKey}"></h3>
            </div>
          </div>
        </article>
      `;
      return cardDiv;
    };

    casesData.forEach((item) => {
      slider.appendChild(buildCaseCard(item));
    });

    currentCaseIndex = 0;
    updateCaseSliderPosition(false);

    // Request the translation script to apply translations to newly added data-i18n nodes
    if (window.i18n && typeof window.i18n.setLanguage === "function") {
      const activeLang = window.i18n.getLocale();
      window.i18n.setLanguage(activeLang);
    }
  };

  const goToCase = (index) => {
    if (totalCases === 0) return;
    currentCaseIndex = index;
    updateCaseSliderPosition();
  };

  const renderCaseDots = () => {
    const dotsContainer = document.getElementById("casesSliderDots");
    if (!dotsContainer) return;

    dotsContainer.innerHTML = "";
    const visibleCount = getVisibleCasesCount();
    const dotsCount = Math.max(1, totalCases - visibleCount + 1);

    for (let i = 0; i < dotsCount; i++) {
      const dot = document.createElement("button");
      dot.className = `h-2 rounded-full transition ${i === currentCaseIndex ? 'bg-clinic-teal w-6' : 'bg-clinic-mist w-2'}`;
      dot.addEventListener("click", () => goToCase(i));
      dotsContainer.appendChild(dot);
    }
  };

  const updateCaseSliderPosition = (withTransition = true) => {
    const slider = document.getElementById("casesSlider");
    if (!slider) return;

    const visibleCount = getVisibleCasesCount();
    const maxIndex = Math.max(0, totalCases - visibleCount);

    if (currentCaseIndex > maxIndex) {
      currentCaseIndex = maxIndex;
    }
    if (currentCaseIndex < 0) currentCaseIndex = 0;

    slider.style.transition = withTransition ? "transform 500ms ease-out" : "none";
    const offset = -currentCaseIndex * (100 / visibleCount);
    slider.style.transform = `translateX(${offset}%)`;

    renderCaseDots();
    updateCaseNavButtons();
  };

  const updateCaseNavButtons = () => {
    const prevButton = document.getElementById("prevCase");
    const nextButton = document.getElementById("nextCase");
    if (!prevButton || !nextButton) return;

    const visibleCount = getVisibleCasesCount();
    const maxIndex = Math.max(0, totalCases - visibleCount);

    const atStart = currentCaseIndex <= 0;
    const atEnd = currentCaseIndex >= maxIndex;

    prevButton.disabled = atStart;
    nextButton.disabled = atEnd;
    prevButton.classList.toggle("is-disabled", atStart);
    nextButton.classList.toggle("is-disabled", atEnd);
  };

  const nextCase = () => {
    if (totalCases === 0) return;
    const visibleCount = getVisibleCasesCount();
    const maxIndex = Math.max(0, totalCases - visibleCount);

    if (currentCaseIndex >= maxIndex) {
      currentCaseIndex = 0;
    } else {
      currentCaseIndex += 1;
    }
    updateCaseSliderPosition();
  };

  const prevCase = () => {
    if (totalCases === 0) return;
    const visibleCount = getVisibleCasesCount();
    const maxIndex = Math.max(0, totalCases - visibleCount);

    if (currentCaseIndex <= 0) {
      currentCaseIndex = maxIndex;
    } else {
      currentCaseIndex -= 1;
    }
    updateCaseSliderPosition();
  };

  document.getElementById("nextCase")?.addEventListener("click", nextCase);
  document.getElementById("prevCase")?.addEventListener("click", prevCase);

  window.addEventListener("resize", () => {
    updateCaseSliderPosition(false);
  });

  renderCases();
});
