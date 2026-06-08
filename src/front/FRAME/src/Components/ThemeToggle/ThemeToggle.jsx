import React, {
  useEffect,
  useState
} from "react";

import {
  Moon,
  Sun
} from "lucide-react";

import styles from "./ThemeToggle.module.css";

import {
  applyTheme,
  getNextTheme,
  getPreferredTheme,
  saveTheme,
  THEME_STORAGE_KEY,
  THEMES
} from "../../utils/theme";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    () => getPreferredTheme()
  );

  useEffect(() => {
    applyTheme(getPreferredTheme());

    const syncTheme = (event) => {
      if (
        event.key === THEME_STORAGE_KEY
      ) {
        setTheme(
          applyTheme(getPreferredTheme())
        );
      }
    };

    window.addEventListener(
      "storage",
      syncTheme
    );

    return () =>
      window.removeEventListener(
        "storage",
        syncTheme
      );
  }, []);

  const isDark =
    theme === THEMES.dark;

  const handleToggle = () => {
    const nextTheme =
      getNextTheme(theme);

    setTheme(
      saveTheme(nextTheme)
    );
  };

  return (
    <button
      type="button"
      className={styles.themeToggle}
      onClick={handleToggle}
      aria-label={
        isDark
          ? "Ativar tema claro"
          : "Ativar tema escuro"
      }
      title={
        isDark
          ? "Tema claro"
          : "Tema escuro"
      }
    >
      {isDark ? (
        <Sun size={18} />
      ) : (
        <Moon size={18} />
      )}
    </button>
  );
};

export default ThemeToggle;
