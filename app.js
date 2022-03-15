const carList = document.querySelector("#carList");
let carItems = carList.querySelectorAll(".carItem");
const carItemTemplate = document.querySelector("#carItemTemplate");
const carTotal = document.querySelector("#carTotal");
// const carItem = carItemTemplate.content.firstElementChild.cloneNode(true);
// const fragment = document.createDocumentFragment();

const stock = {
    pFresa: {
        id: "pFresa",
        name: "fresa",
        quantity: 1000,
        price: 300,
    },

    pBanano: {
        id: "pBanano",
        name: "banano",
        quantity: 1000,
        price: 100,
    },

    pManzana: {
        id: "pManzana",
        name: "manzana",
        quantity: 1000,
        price: 200,
    },
};

const car = {}; //objeto con todos los productos agregados en el carrito

updateValues = (car, itemInteres, pId) => {
    console.log(`updateValues()`);
    itemInteres.dataset.pid = pId;
    itemInteres.querySelector(".itemHead .amount").textContent =
        car[pId].quantity;
    itemInteres.querySelector(".itemHead .itemName").textContent =
        car[pId].name.toUpperCase();
    itemInteres.querySelector(".itemBody .cost").textContent =
        car[pId].quantity * car[pId].price;
};

showCar = (car, carList, pId) => {
    console.log(`showCar(): dentro de showCar`);
    const carItemClone =
        carItemTemplate.content.firstElementChild.cloneNode(true);

    ////////////////////////////////////////////////////////////si cantidad de producto en carrito es > 0
    if (car[pId].quantity > 0) {
        console.log(
            `showCar(): hay ${car[pId].quantity} ${car[pId].name}s en carrito`
        );

        const carListItems = carList.querySelectorAll(".carItem");
        let itemInteres;
        let flag = false;

        carListItems.forEach((element) => {
            if (element.dataset.pid === pId) {
                itemInteres = element;
                flag = true;
            }
        });

        ////////////////////////////////////////////////////////si no existe vista de producto en el listado del carrito
        if (!flag) {
            console.log(
                `showCar(): no está la vista de ${car[pId].name} en el listado del carrito`
            );
            console.log(
                `showCar(): se crea y se agrega el item ${car[pId].name} al listado del carrito`
            );

            carItemClone.dataset.pid = pId;
            carItemClone.querySelector(".itemHead .amount").textContent =
                car[pId].quantity;
            carItemClone.querySelector(".itemHead .itemName").textContent =
                car[pId].name.toUpperCase();
            carItemClone.querySelector(".itemBody .cost").textContent =
                car[pId].quantity * car[pId].price;
            carItemClone.querySelector(".itemBody #btnAgregar").dataset.pid =
                pId;
            carItemClone.querySelector(".itemBody #btnQuitar").dataset.pid =
                pId;

            console.log(carItemClone);

            carList.appendChild(carItemClone);
        } else {
            ///////////////////////////////////////////////////////si existe vista de producto en el listado del carrito
            console.log(
                `showCar(): si está la vista de ${car[pId].name} en el listado del carrito`
            );
            console.log(`showCar(): se actualiza item del listado del carrito`);

            itemInteres.dataset.pid = pId;
            itemInteres.querySelector(".itemHead .amount").textContent =
                car[pId].quantity;
            itemInteres.querySelector(".itemHead .itemName").textContent =
                car[pId].name.toUpperCase();
            itemInteres.querySelector(".itemBody .cost").textContent =
                car[pId].quantity * car[pId].price;

            console.log(itemInteres);
        }
    } else {
        //cantidad de producto en carrito es = 0
    }
};

addToCar = (stock, car, targetId) => {
    if (stock[targetId] != undefined && stock[targetId].quantity >= 1) {
        //si hay en stock
        console.log(
            `${stock[targetId].name} en stock: ${stock[targetId].quantity}`
        );
        stock[targetId].quantity--;

        if (car[targetId] != undefined) {
            //si producto ya existe en carrito
            console.log(`${car[targetId].name} ya existe en carrito`);
            car[targetId].quantity++;

            showCar(car, carList, targetId);
        } else {
            //si producto no existe en carrito
            console.log(`${targetId} no existe en carrito`);
            car[targetId] = Object.assign({}, stock[targetId]); //clonar objeto
            car[targetId].quantity = 1;
            console.log(`se adiciona ${car[targetId].name} a carrito`);

            showCar(car, carList, targetId);
        }
        console.log(
            `cantidad de ${car[targetId].name} en stock: ${stock[targetId].quantity}`
        );
        console.log(
            `cantidad de ${car[targetId].name} en carrito: ${car[targetId].quantity}`
        );
    } else {
        //si no hay en stock
    }
};

quitFromCar = (stock, car, targetPid) => {
    console.log(`quitFromCar()`);

    const carList = document.querySelector("#carList");
    let carItems = document.querySelectorAll("#carList .carItem");

    if (car[targetPid].quantity > 0) {
        //si hay al menos 1 produccto en carrito
        car[targetPid].quantity--;
        stock[targetPid].quantity++;

        carItems.forEach((carItem) => {
            if (carItem.dataset.pid === targetPid) {
                console.log(`click en quitar ${car[targetPid].name}`);
                updateValues(car, carItem, targetPid);
            }
        });
        if (car[targetPid].quantity === 0) {
            //ya no hay producto en el carrito
            carItems.forEach((carItem) => {
                if (carItem.dataset.pid === targetPid) {
                    console.log(`click en quitar ${car[targetPid].name}`);
                    carList.removeChild(carItem);
                }
            });
        }
    } else {
        //ya no hay producto en el carrito
        carItems.forEach((carItem) => {
            if (carItem.dataset.pid === targetPid) {
                console.log(`click en quitar ${car[targetPid].name}`);
                carList.removeChild(carItem);
            }
        });
    }
};

updateTotal = (car) => {
    console.log("en updateTotal()");
    console.log(car);
    let valorTotal = 0;

    for (const item in car) {
        if (item !== "totales")
            valorTotal += car[item].price * car[item].quantity;
    }

    console.log(valorTotal);

    car["totales"] = Object.assign(
        {},
        { subTotal: 0, iva: 0, total: valorTotal }
    );

    // console.log(car["totales"]);

    carTotal.querySelector("#carTotalValue").textContent = car["totales"].total;

    // console.log(carTotal);

    if (car["totales"].total !== 0) {
        carTotal.style.display = "flex";
    } else {
        carTotal.style.display = "none";
    }

    console.log(carTotal.style.display);
};

document.addEventListener("click", (event) => {
    if (stock[event.target.dataset.pid] != undefined) {
        //click en elemento en stock
        console.log(`--- click en boton ${event.target.id} ---`);

        if (event.target.dataset.action === "add") {
            //click en btnAgregar
            addToCar(stock, car, event.target.dataset.pid);
            updateTotal(car);
        } else if (event.target.dataset.action === "quit") {
            //click en btnQuitar
            quitFromCar(stock, car, event.target.dataset.pid);
            updateTotal(car);
        }
    } else {
        console.log(`--- click en elemento no boton ---`);
    }
});
