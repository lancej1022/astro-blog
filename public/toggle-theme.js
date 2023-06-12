const primaryColorScheme = ""; // "light" | "dark"

// Get theme data from local storage
const currentTheme = localStorage.getItem("theme");

// TODO: modify this to default to `dark` mode
function getTheme() {
  // return theme value in local storage if it is set
  if (currentTheme) return currentTheme;

  // return primary color scheme if it is set
  if (primaryColorScheme) return primaryColorScheme;
  // return user device's prefer color scheme
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

let themeValue = getTheme();

function setPreference() {
  localStorage.setItem("theme", themeValue);
  reflectPreference();
}

function reflectPreference() {
  document.documentElement.setAttribute("data-theme", themeValue);

  document
    .querySelector("#theme-btn")
    ?.setAttribute("aria-label", `Activate ${themeValue === "dark" ? "light" : "dark"} mode`);
}

reflectPreference();

window.onload = () => {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  document.querySelector("#theme-btn")?.addEventListener("click", () => {
    themeValue = themeValue === "light" ? "dark" : "light";
    setPreference();
  });
};

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", ({ matches: isDark }) => {
    themeValue = isDark ? "dark" : "light";
    setPreference();
  });
