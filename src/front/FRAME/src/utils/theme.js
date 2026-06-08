const THEME_STORAGE_KEY = "frametech-theme";

const THEMES = {
  light: "light",
  dark: "dark",
};

const hasBrowser = () =>
  typeof window !== "undefined" &&
  typeof document !== "undefined";

export function getPreferredTheme() {
  if (!hasBrowser()) {
    return THEMES.light;
  }

  const savedTheme =
    window.localStorage.getItem(
      THEME_STORAGE_KEY
    );

  if (
    savedTheme === THEMES.light ||
    savedTheme === THEMES.dark
  ) {
    return savedTheme;
  }

  return window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? THEMES.dark
    : THEMES.light;
}

export function applyTheme(theme) {
  if (!hasBrowser()) {
    return theme;
  }

  const normalizedTheme =
    theme === THEMES.dark
      ? THEMES.dark
      : THEMES.light;

  document.documentElement.dataset.theme =
    normalizedTheme;

  document.documentElement.style.colorScheme =
    normalizedTheme;

  return normalizedTheme;
}

export function initializeTheme() {
  return applyTheme(getPreferredTheme());
}

export function saveTheme(theme) {
  if (hasBrowser()) {
    window.localStorage.setItem(
      THEME_STORAGE_KEY,
      theme
    );
  }

  return applyTheme(theme);
}

export function getNextTheme(theme) {
  return theme === THEMES.dark
    ? THEMES.light
    : THEMES.dark;
}

export {
  THEME_STORAGE_KEY,
  THEMES
};
