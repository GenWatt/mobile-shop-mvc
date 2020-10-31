class Loader {
  static createLoader(element) {
    const div = document.createElement("div");
    div.classList.add("loader");
    div.innerHTML = `        
        <span></span>
        <span></span>
        <span></span>`;

    element.appendChild(div);
  }

  static removeLoader(element) {
    element.querySelector(".loader").remove();
  }
}
export default Loader;
