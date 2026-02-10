console.log("JS file loaded");

document.documentElement.dataset.theme =
  document.documentElement.dataset.theme === "dark"
    ? "dark"
    : "light";