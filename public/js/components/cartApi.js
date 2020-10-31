import Loader from "./loader.js";

class CartAction {
  constructor() {
    document
      .querySelectorAll(".increment")
      .forEach((btn) => btn.addEventListener("click", (e) => this.incrementQuantity(e)));
    document
      .querySelectorAll(".decrement")
      .forEach((btn) => btn.addEventListener("click", (e) => this.decrementQuantity(e)));
    document
      .querySelectorAll(".delete-btn")
      .forEach((btn) => btn.addEventListener("click", (e) => this.deleteCartProduct(e)));
  }

  async incrementQuantity(e) {
    const updatedItem = e.target.closest(".cart-item");
    const id = updatedItem.dataset.id;

    Loader.createLoader(updatedItem);
    const res = await fetch("/cart", {
      method: "PUT",
      body: JSON.stringify({
        action: e.target.value.toUpperCase(),
        productId: id,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const { products, totalPrice } = await res.json();

    this.updateCart(products, totalPrice);
    Loader.removeLoader(updatedItem);
  }

  async decrementQuantity(e) {
    const updatedItem = e.target.closest(".cart-item");
    const id = updatedItem.dataset.id;

    Loader.createLoader(updatedItem);
    const res = await fetch("/cart", {
      method: "PUT",
      body: JSON.stringify({ action: e.target.value.toUpperCase(), productId: id }),
      headers: { "Content-Type": "application/json" },
    });
    const { products, totalPrice } = await res.json();

    this.updateCart(products, totalPrice);
    Loader.removeLoader(updatedItem);
  }

  async deleteCartProduct(e) {
    const updatedItem = e.target.closest(".cart-item");
    const id = updatedItem.dataset.id;

    Loader.createLoader(updatedItem);
    await fetch("/cart/" + id, { method: "DELETE" });
    Loader.removeLoader(updatedItem);
    location.reload();
  }

  updateCart(products, totalCart) {
    if (!products) return;
    let productsCount = 0;

    products.forEach((product) => {
      const { quantity, price, _id } = product;
      const cartItem = document.querySelector(`.cart-item[data-id="${_id}"]`);

      productsCount += product.quantity;
      cartItem.querySelector(".decrement").disabled = quantity === 1 ? true : false;
      cartItem.querySelector(".quantity").innerText = quantity;
      cartItem.querySelector(".cart-price").innerText = price * quantity + "zł";
      document.querySelector(".total-price").innerText = totalCart;
    });
    document.querySelector(".item-count").innerText = `In cart is ${productsCount} item(s)`;
  }
}

new CartAction();
