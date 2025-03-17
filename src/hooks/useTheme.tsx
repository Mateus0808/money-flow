import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setThemeState] = useState(
    typeof window !== "undefined" ? localStorage.getItem("theme") || "light" : "light"
  );

  const setTheme = (newTheme: "light" | "dark") => {
    setThemeState(newTheme);
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
