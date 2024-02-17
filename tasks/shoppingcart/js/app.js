let listProductHTML = document.querySelector('.listProduct');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('.icon-cart span');
let totalValueSpan = document.querySelector('#totalValue span');

let products = [];
let cart = [];
let movingProduct;

function addDataToHTML() {
    // add new products
    if (products.length > 0) // if has data
    {
        // create item card for every product
        for (let product of products) {
            let newProduct = document.createElement('div');
            newProduct.dataset.id = product.id;
            newProduct.classList.add('item');
            newProduct.setAttribute("draggable", "true")
            newProduct.addEventListener("dragstart", (event) => {movingProduct = event.target.dataset.id})
            newProduct.innerHTML = `
                <img src="${product.image}" alt="" draggable="false">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>
            `;
            listProductHTML.appendChild(newProduct);
        }
    }
}

function addToCart(product_id) {
    // find the product in the cart
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    if (cart.length == 0) // if the cart is empty
    {
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    }
    else if (positionThisProductInCart < 0) // if the product is not in the cart
    {
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }
    else // if the product is in the cart
    {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

function addToCartDragAndDrop() {
    // find the product in the cart
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == movingProduct);
    if (cart.length == 0) // if the cart is empty
    {
        cart = [{
            product_id: movingProduct,
            quantity: 1
        }];
    }
    else if (positionThisProductInCart < 0) // if the product is not in the cart
    {
        cart.push({
            product_id: movingProduct,
            quantity: 1
        });
    }
    else // if the product is in the cart
    {
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    addCartToHTML();
    addCartToMemory();
}

function addCartToMemory() {
    // save cart array in localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addCartToHTML() {
    // set variables to add HTML
    listCartHTML.innerHTML = '';
    let totalQuantity = 0;
    let totalValue = 0;
    if (cart.length > 0) // if the cart has products
    {
        // create item card in the cart for every product
        for (let item of cart){
            totalQuantity = totalQuantity + item.quantity;
            let newItem = document.createElement('div');
            newItem.classList.add('item');
            newItem.dataset.id = item.product_id;
            newItem.setAttribute("draggable", "true")
            newItem.addEventListener("dragstart", (event) => {movingProduct = event.target.dataset.id})

            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            totalValue = totalValue + info.price * item.quantity;
            listCartHTML.appendChild(newItem);
            newItem.innerHTML = `
                <div class="image">
                    <img src="${info.image}" draggable="false">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
                    <span class="plus">></span>
                </div>
            `;
        }
    }
    iconCartSpan.innerText = totalQuantity;
    totalValueSpan.innerText = totalValue
}

function changeQuantityCart(product_id, type) {
    // find the product in the cart
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if (positionItemInCart >= 0) // if the product is in the cart
    {
        switch (type) {
            case 'plus':
                // add quantity
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                // remove quantity
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) // if the product is still in the cart
                {
                    cart[positionItemInCart].quantity = changeQuantity;
                }
                else // if the product is no longer in the cart
                {
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    addCartToHTML();
    addCartToMemory();
}

function changeQuantityCartDragAndDrop() {
    // find the product in the cart
    let positionItemInCart = cart.findIndex((value) => value.product_id == movingProduct);
    // remove quantity
    let changeQuantity = cart[positionItemInCart].quantity - 1;
    if (changeQuantity > 0) // if the product is still in the cart
    {
        cart[positionItemInCart].quantity = changeQuantity;
    }
    else // if the product is no longer in the cart
    {
        cart.splice(positionItemInCart, 1);
    }
    addCartToHTML();
    addCartToMemory();
}

// add listeners to the product list
    //listener for the add to cart button
listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('addCart')) {
        let id_product = positionClick.parentElement.dataset.id;
        addToCart(id_product);
    }
})
    //listeners for the drag and drop
listProductHTML.addEventListener("dragover", event => {event.preventDefault()});
listProductHTML.addEventListener("drop", changeQuantityCartDragAndDrop);


// add listeners to the cart list
    // listener for the quantity button
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if (positionClick.classList.contains('minus') || positionClick.classList.contains('plus')) {
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if (positionClick.classList.contains('plus')) {
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})
    // listeners for the drag and drop
listCartHTML.addEventListener("dragover", event => {event.preventDefault()});
listCartHTML.addEventListener("drop", addToCartDragAndDrop);

function initApp() {
    // get products data
    fetch('json/products.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        // get cart data from memory
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}

initApp();