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

  // Reviews Slider - manually curated reviews
  const reviews = [
    {
      name: "michael nabil",
      rating: 5,
      date: "2 months ago",
      text: "I’ve always been nervous about dental visits, but this team completely changed my perspective. From the moment I walked in, I was greeted with warmth and professionalism. The procedure was painless, efficient, and handled with such care. If you're looking for a dentist who truly listens and prioritizes your comfort, look no further"
    },
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
      name: "Ezzahmed Mansour",
      rating: 5,
      date: "4 months ago",
      text: "بالتوفيق ان شاء الله\nدكتوره ممتازه"
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
      name: "Nema Ramadan",
      rating: 5,
      date: "a year ago",
      text: "دكتورة ممتازة وشاطره جدا لديها علم ومهارة جيدة جدا. حاصلة على زمالة من جامعة رويال كولدج من انجلترا."
    },
    {
      name: "Amna Farag",
      rating: 5,
      date: "a year ago",
      text: "الدكتورة كووتي وشطورة جداً ربنا يحفظها ويبارك فيها والعيادة مريحة نفسياً لدرجة النوم والله😂♥️♥️ …"
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
      name: "Mostafa Saadeldin",
      rating: 5,
      date: "a year ago",
      text: "الدكتوره شاطره جدا و الشغل محترف"
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
      name: "Omama Ahmed",
      rating: 5,
      date: "Edited 3 months ago",
      text: "المكان اكثر من رائع"
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
      name: "Mostafa Mahmoud",
      rating: 5,
      date: "a year ago",
      text: "ممتازه"
    },
    {
      name: "Abdelbaset Draz",
      rating: 5,
      date: "a year ago",
      text: "Very good and accurate"
    },
    {
      name: "Mohaned Khaled",
      rating: 5,
      date: "a year ago",
      text: "مكان ممتز"
    },
    {
      name: "Om Amin",
      rating: 5,
      date: "a year ago",
      text: "ممتازة جدا"
    },
    {
      name: "usama sanad",
      rating: 5,
      date: "a year ago",
      text: "Perfec5"
    },
    {
      name: "Yomna Mohamed",
      rating: 5,
      date: "2 weeks ago",
      text: "A very clean and trust worthy practice, very professional doctor and lovely staff.\n10/10 👌🏻 …"
    },
    {
      name: "Asmaa Saleh",
      rating: 5,
      date: "3 months ago",
      text: "شكرا جدا على تقييمك الايجابي و يارب دايما في صحة و خير و سعادة"
    },
    {
      name: "Hossam abdelhady",
      rating: 5,
      date: "3 months ago",
      text: "شكرا جدا على تقييمك الايجابي و يارب دايما في صحة و خير و سعادة"
    },
    {
      name: "هاجر ياسر فرغلى",
      rating: 5,
      date: "a year ago",
      text: "شكرًا جزيلاً على التقييم الرائع\nنسعى دائمًا لتقديم أفضل رعاية صحية لضمان رضاكم التام\nنتطلع لاستقبالكم مرة أخرى قريبًا! 😊🦷✨‎\n …"
    },
    {
      name: "Amal Hassan",
      rating: 5,
      date: "a year ago",
      text: "شكرًا جزيلاً على التقييم الرائع\nنسعى دائمًا لتقديم أفضل رعاية صحية لضمان رضاكم التام\nنتطلع لاستقبالكم مرة أخرى قريبًا! 😊🦷✨ …"
    },
    {
      name: "ahmed samir",
      rating: 5,
      date: "a year ago",
      text: "🤩🦷🤩Thank you so much for your glowing recommendation  …"
    },
    {
      name: "Ahmed Ahmed",
      rating: 5,
      date: "a year ago",
      text: "Thank you so much for your glowing recommendation🤩🦷🤩 …"
    },
    {
      name: "Hanan Ahmed",
      rating: 5,
      date: "a year ago",
      text: "Thank you so much for your glowing recommendation🦷🤩🦷 …"
    },
    {
      name: "Eman Ahmed",
      rating: 5,
      date: "a year ago",
      text: "Thank you so much for your glowing recommendation🤩🦷🤩 …"
    },
    {
      name: "Menna Mohammed1193",
      rating: 5,
      date: "a year ago",
      text: "Thank you so much for your glowing recommendation🤩🦷🤩 …"
    }
  ];
  let currentReviewIndex = 0;
  const totalSlides = reviews.length;

  const renderReviews = () => {
    const slider = document.getElementById("reviewsSlider");
    const dotsContainer = document.getElementById("sliderDots");

    slider.innerHTML = "";
    dotsContainer.innerHTML = "";

    const buildCard = (review) => {
      const reviewDiv = document.createElement("div");
      reviewDiv.className = "w-full flex-shrink-0 px-4 md:px-0";

      const stars = Array.from({ length: review.rating }, () => "★").join("");

      reviewDiv.innerHTML = `
        <article class="testimonial-card rounded-2xl border border-clinic-mist/30 bg-white p-6 shadow-sm mx-auto max-w-3xl">
          <div class="flex justify-center text-clinic-gold text-lg mb-3">${stars}</div>
          <p class="testimonial-text text-sm text-slate-600 italic whitespace-pre-line">"${review.text}"</p>
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
});
