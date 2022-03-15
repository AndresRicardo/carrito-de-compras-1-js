const productos = document.querySelectorAll(".item");
const listaCarrito = document.querySelector("#listaCarrito");
const liCarritoTemplate = document.querySelector("#liCarritoTemplate");
let fragmento = document.createDocumentFragment();

const inventario = {
    banano: 0,
    manzana: 0,
    pera: 0,
    pina: 0,
};

productos.forEach((btn) => {
    let clone = liCarritoTemplate.content.firstElementChild.cloneNode(true);

    btn.addEventListener("click", () => {
        inventario[btn.id]++;

        clone.querySelector("b").textContent = btn.textContent + ": ";
        clone.querySelector("span").textContent = inventario[btn.id];

        fragmento.appendChild(clone);
        listaCarrito.appendChild(fragmento);
        console.log(listaCarrito);
    });
});
