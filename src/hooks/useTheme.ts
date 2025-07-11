import { useLocalStorage } from "./useLocalStorage";
import { Theme } from "../types/css";
import { useEffect } from "react";

// Google Analytics の型定義
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export function useTheme() {
  const [theme, setTheme] = useLocalStorage<Theme>(
    "css-dictionary-theme",
    "light"
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light";

      // Analytics: テーマ変更
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "theme_change", {
          theme_name: newTheme,
        });
      }

      return newTheme;
    });
  };

  return { theme, setTheme, toggleTheme };
}
