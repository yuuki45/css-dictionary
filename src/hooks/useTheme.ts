import { useLocalStorage } from "./useLocalStorage";
import { Theme } from "../types/css";
import { useEffect } from "react";

export function useTheme() {
  // 保存値がない場合はOSのテーマ設定に従う
  const systemDefault: Theme =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";

  const [theme, setTheme, isLoaded] = useLocalStorage<Theme>(
    "css-dictionary-theme",
    systemDefault
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

  return { theme, setTheme, toggleTheme, isLoaded };
}
