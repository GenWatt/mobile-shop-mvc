import { state } from "../state.js";
import { ITEMS, ORDER_ITEM, ORDER_CONTAINER, LIST } from "../DOMElements.js";
import Render from "./render.js";

class ArrayMethods {
  static filterByValue(value) {
    if (state.typeValue === value) return;
    state.copyProducts = state.products.filter(
      (product) => product[state.filterBy].toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    state.typeValue = value;

    const ids = state.copyProducts.map((product) => product._id);
    const { copyProducts, products, sort } = state;

    ArrayMethods.filterElements(document.querySelectorAll(ITEMS + "[data-id]"), ids);
    ArrayMethods.filterElements(document.querySelectorAll(ORDER_ITEM + "[data-id]"), ids);
    ArrayMethods.sortElements(sort, copyProducts || products, "price");
  }

  static filterElements(elements, filteredArr) {
    elements.forEach((element) => {
      const elementId = element.dataset.id;
      if (filteredArr.indexOf(elementId) !== -1) {
        element.classList.remove("hide-scale-down");
      } else {
        element.classList.add("hide-scale-down");
      }
    });
  }

  static sortElements(value, data, by) {
    let sorted = null;
    state.sort = value;
    switch (state.sort) {
      case "FROM_HIGHEST":
        sorted = data.sort((a, b) => b[by] - a[by]);
        break;
      case "FROM_LOWEST":
        sorted = data.sort((a, b) => a[by] - b[by]);
        break;
      default:
        sorted = state.copyProducts || state.products;
        break;
    }

    ArrayMethods.removeElements(sorted);
  }

  static removeElements(sorted) {
    Render.deleteElements(document.querySelector(ORDER_CONTAINER));
    Render.deleteElements(document.querySelector(LIST));
    Render.createProducts(sorted);
    Render.createList(sorted);
    Render.maintainItems();
  }
}

export default ArrayMethods;
