import { NAV_CONTAINER, MOBILE_DROPDOWN_NAV } from "../DOMElements.js";

class ScrollBar {
  handleScrollBar(element, scrollElement) {
    const listHeight = element.scrollHeight;
    const currentScroll = element.scrollTop;
    const precentage = (currentScroll / (listHeight - element.clientHeight)) * 100;

    scrollElement.style.height = precentage + "%";
  }

  navFixed() {
    const navElement = document.querySelector(NAV_CONTAINER);
    const navHeight = navElement.clientHeight;
    const scrollValue = window.scrollY;

    if (scrollValue >= navHeight) navElement.classList.add("fixed-nav");
    else {
      navElement.classList.remove("fixed-nav");
      navElement.classList.remove("show");
      document.querySelector(MOBILE_DROPDOWN_NAV).classList.remove("change-arrow-direction");
    }
  }
}

export default ScrollBar;
