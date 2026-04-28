document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  const filterButtons = document.querySelectorAll(".filter-btn");
  const caseItems = document.querySelectorAll(".case-item");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => {
        b.classList.remove("bg-clinic-teal", "text-white", "shadow-md", "hover:shadow-lg");
        b.classList.add("border-2", "border-slate-200", "bg-white", "text-slate-600", "hover:border-clinic-teal", "hover:text-clinic-teal");
      });

      btn.classList.remove("border-2", "border-slate-200", "bg-white", "text-slate-600", "hover:border-clinic-teal", "hover:text-clinic-teal");
      btn.classList.add("bg-clinic-teal", "text-white", "shadow-md", "hover:shadow-lg");

      const filter = btn.dataset.filter;
      caseItems.forEach((item) => {
        const match = filter === "all" || item.classList.contains(filter);
        item.style.display = match ? "" : "none";
      });
    });
  });

  const previewTargets = document.querySelectorAll("[data-preview]");
  const lightboxOverlay = document.getElementById("lightboxOverlay");
  const lightboxClose = document.getElementById("lightboxClose");
  const modalImage = document.getElementById("lightboxImage");

  previewTargets.forEach((img) => {
    img.addEventListener("click", () => {
      if (modalImage) {
        modalImage.src = img.dataset.preview;
        modalImage.alt = img.alt || "Case preview";
      }

      if (lightboxOverlay) {
        lightboxOverlay.classList.remove("hidden");
        lightboxOverlay.classList.add("flex");
      }
    });
  });

  const hideLightbox = () => {
    if (!lightboxOverlay) return;
    lightboxOverlay.classList.add("hidden");
    lightboxOverlay.classList.remove("flex");
  };

  if (lightboxClose) {
    lightboxClose.addEventListener("click", hideLightbox);
  }

  if (lightboxOverlay) {
    lightboxOverlay.addEventListener("click", (event) => {
      if (event.target === lightboxOverlay) {
        hideLightbox();
      }
    });
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hideLightbox();
    }
  });
});
