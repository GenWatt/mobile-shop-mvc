class Theme {
  themeSwitcher(theme) {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      sessionStorage.setItem("theme", theme);
    } else {
      const savedTheme = sessionStorage.getItem("theme");
      document.documentElement.setAttribute("data-theme", savedTheme || "red");
    }
  }
}

export default Theme;
