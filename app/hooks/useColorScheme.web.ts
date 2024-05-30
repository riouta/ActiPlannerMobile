export function useColorScheme() {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkScheme.matches ? "dark" : "light";
  }
  