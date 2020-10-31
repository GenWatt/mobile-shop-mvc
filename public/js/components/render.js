import {
  LIST,
  ITEMS_LIST_BOX,
  ITEMS,
  ORDER_CONTAINER,
  SEARCH_LABEL,
  ICON_SEARCH,
  SEARCH,
} from "../DOMElements.js";

class Render {
  static createList(data) {
    data.forEach((data) => {
      //items parameters
      const li = document.createElement("li");
      li.className = "item";
      li.setAttribute("data-id", data._id);
      li.innerHTML = `${data.phone}
          <span class="brand">
            ${data.brand}
          </span>`;
      //append items to ul
      document.querySelector(LIST).appendChild(li);
    });
  }

  static createProducts(data) {
    data.forEach((data) => {
      const li = document.createElement("li");
      li.className = "order-item";
      li.setAttribute("data-id", data._id);
      li.innerHTML = `
      <h4>${data.phone}</h4>
      <div class="product-image">
        <img alt="${data.phone}" src="${data.img}"/>
      </div>
      <p>${data.description}</p>
      <span class="brand-order">${data.brand}</span>
      <span class="price">${data.price}zł</span>
      <button class="primary-btn add-to-cart">Add To Cart</button>
      <a role="button" href="/products/<%=product._id%>" class="secondary-btn" data-id="<%=product._id%>">
        Details
      </a>
        `;

      document.querySelector(ORDER_CONTAINER).appendChild(li);
    });
  }

  static deleteElements = (container) => (container.innerHTML = "");
  static maintainItems() {
    document.querySelectorAll(ITEMS).forEach((item, index) => {
      if (document.querySelector(ITEMS_LIST_BOX).classList.contains("show"))
        setTimeout(() => {
          item.classList.remove("hide");
          item.classList.add("show");
        }, 100 * index);
      else
        document.querySelectorAll(ITEMS).forEach((item, index) =>
          setTimeout(() => {
            item.classList.remove("show");
            item.classList.add("hide");
          }, 100 * index)
        );
    });
  }

  static manageList() {
    document.querySelector(ITEMS_LIST_BOX).classList.toggle("show");
    document.querySelector(SEARCH_LABEL).classList.toggle("on-focus");
    document.querySelector(ICON_SEARCH).classList.toggle("on-focus");
    document.getElementById(SEARCH).classList.toggle("on-focus");
    Render.maintainItems();
  }
}

export default Render;
