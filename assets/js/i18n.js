(() => {
  const SUPPORTED = ["en", "ar"];
  const STORAGE_KEY = "dd:lang";
  let translations = {};
  let currentLang = "en";

  const getBrowserLang = () => {
    const lang = (navigator.language || "en").toLowerCase();
    return lang.startsWith("ar") ? "ar" : "en";
  };

  const getStoredLang = () => {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch {
      return null;
    }
  };

  const setStoredLang = (lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage errors.
    }
  };

  const loadTranslations = async (lang) => {
    const response = await fetch(`assets/i18n/${lang}.json`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    return response.json();
  };

  const t = (key) => {
    if (!key) return "";
    return translations[key] || key;
  };

  const applyTranslations = () => {
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      if (!key) return;
      el.textContent = t(key);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      const key = el.dataset.i18nHtml;
      if (!key) return;
      el.innerHTML = t(key);
    });

    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      const attr = el.dataset.i18nAttr;
      const key = el.dataset.i18nAttrKey || el.dataset.i18n || el.dataset.i18nHtml;
      if (!attr || !key) return;
      el.setAttribute(attr, t(key));
    });

    document.querySelectorAll("[data-i18n-toggle]").forEach((btn) => {
      const nextLabel = currentLang === "ar" ? "EN" : "AR";
      const nextAria = currentLang === "ar" ? "Switch to English" : "التبديل إلى العربية";
      btn.textContent = nextLabel;
      btn.setAttribute("aria-label", nextAria);
    });
  };

  const setLanguage = async (lang) => {
    if (!SUPPORTED.includes(lang)) return;
    currentLang = lang;
    translations = await loadTranslations(lang);
    setStoredLang(lang);
    applyTranslations();
  };

  const init = async () => {
    const preferred = getStoredLang() || getBrowserLang();
    await setLanguage(preferred);

    document.querySelectorAll("[data-i18n-toggle]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const next = currentLang === "ar" ? "en" : "ar";
        await setLanguage(next);
      });
    });
  };

  window.i18n = {
    t,
    getLocale: () => currentLang,
    setLanguage
  };

  document.addEventListener("DOMContentLoaded", () => {
    init().catch(() => {
      // No-op if translations fail to load.
    });
  });
})();
