import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext({ dark: false, toggle: () => {} });
const STORAGE_KEY = "theme";

export const useTheme = () => useContext(ThemeContext);

const readStored = () => {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
};

export const ThemeProvider = ({ defaultMode = "light", children }) => {
  const [dark, setDark] = useState(() => {
    const stored = readStored();
    return stored ? stored === "dark" : defaultMode === "dark";
  });

  useEffect(() => {
    document.documentElement.style.colorScheme = dark ? "dark" : "light";
  }, [dark]);

  const toggle = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
      } catch {
        // storage unavailable (private mode) - theme still works for this visit
      }
      return next;
    });
  }, []);

  const value = useMemo(() => ({ dark, toggle }), [dark, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};