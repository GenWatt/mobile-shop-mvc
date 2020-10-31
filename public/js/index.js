import {
  SEARCH,
  FILTER,
  DROPDOWN_MENU,
  CHOOSE,
  LIST,
  SCROLL,
  FA_CHEVRON_LEFT,
  SORT_ASIDE,
  SORT_INPUT,
  MOBILE_DROPDOWN_NAV,
  NAV_CONTAINER,
  ITEMS_LIST_BOX,
} from "./DOMElements.js";
import { state } from "./state.js";
import Render from "./components/render.js";
import Theme from "./components/theme.js";
import ScrollBar from "./components/scrollBar.js";
import ArrayMethods from "./components/arrayMethods.js";

function init() {
  const theme = new Theme();
  const scrollBar = new ScrollBar();

  theme.themeSwitcher();
  scrollBar.navFixed();
  //listeners
  document
    .querySelector(LIST)
    .addEventListener("scroll", (e) => scrollBar.handleScrollBar(e.target, document.getElementById(SCROLL)));
  window.addEventListener("scroll", () => scrollBar.navFixed());
  //show/hide search list
  document.getElementById(SEARCH).addEventListener("click", () => Render.manageList());
  window.onclick = (e) => {
    if (!e.target.matches("#search")) {
      if (document.querySelector(ITEMS_LIST_BOX).classList.contains("show")) Render.manageList();
    }
  };
  //filter list while typing
  document
    .getElementById(SEARCH)
    .addEventListener("keyup", (e) => ArrayMethods.filterByValue(e.target.value));
  //select filter category
  document
    .querySelectorAll(FILTER)
    .forEach((input) => input.addEventListener("change", (e) => (state.filterBy = e.target.value)));
  //show/hide theme list
  document
    .querySelector(DROPDOWN_MENU)
    .addEventListener("click", () => document.querySelector(DROPDOWN_MENU).classList.toggle("show"));
  //select theme
  document
    .querySelectorAll(CHOOSE)
    .forEach((choose) => choose.addEventListener("click", () => theme.themeSwitcher(choose.dataset.theme)));
  //hide/show nav (for mobile devices)
  document.querySelector(MOBILE_DROPDOWN_NAV).addEventListener("click", (e) => {
    document.querySelector(NAV_CONTAINER).classList.toggle("show");
    document.querySelector(MOBILE_DROPDOWN_NAV).classList.toggle("change-arrow-direction");
  });
  // select sort category
  document.querySelectorAll(SORT_INPUT).forEach((input) =>
    input.addEventListener("change", (e) => {
      const copyState = [...(state.copyProducts || state.products)];
      copyState ? ArrayMethods.sortElements(e.target.value, copyState, "price") : null;
    })
  );
  //show/hide sort functions
  document.querySelector(FA_CHEVRON_LEFT).addEventListener("click", (e) => {
    document.getElementById(SORT_ASIDE).classList.toggle("active");
    e.target.classList.toggle("active");
  });
}

init();
