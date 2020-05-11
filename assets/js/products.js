// Handling any product related logic


// Insert Products in Shop
const loadShopProducts = () => {
    axios.get("./assets/js/products.json")
        .then(response => {
            products = response.data;

            products.forEach(product => {
                $(".shop-grid .row").append(
                    `
                <a class="shop-product col-sm-6 col-md-4 col-lg-4" href="./product.html#${product.code}" data-product-brand="${product.brand}" data-product-price="${product.price}"
                ">
                    <img class="shop-product-image" src="./assets/images/products/t1.png " alt="">
                    <p class="shop-product-brand">
                        ${product.brand}
                    </p>
                    <h5 class="shop-product-name">
                        ${product.name} - <span>${product.size}</span>
                    </h5>
                    <p class="shop-product-price">
                        R ${product.price}
                    </p>
                </a>
            `
                )
            });
        })
        .catch(err => console.log(err));
}


// Find product by Code
async function findProduct(productCode) {

    let promise = new Promise((resolve, reject) => {
        axios.get("./assets/js/products.json")
            .then(response => {
                products = response.data;
                let productFound = products.find(product => product.code === productCode);
                if (productFound !== undefined) {
                    resolve(products[products.indexOf(productFound)]);
                } else {
                    resolve(undefined)
                }
            })
            .catch(err => console.log(err));
    })

    let product = await promise;
    return product
}

// Insert Product in Product Page

const loadProduct = () => {

    // Get Recipe ID
    let productCode = window.location.hash; //Get Recipe ID
    if (productCode == "") {
        window.location.pathname = "/index.html"
    }
    productCode = productCode.substr(1); //Remove #

    let product = {};
    findProduct(productCode).then(result => {
        product = result;

        if (product !== undefined) {
            // Insert Product Details
            document.title = product.name;
            $(".product-container").attr("data-product-code", product.code)
            $(".product-info .product-category").html(product.category)
            $(".product-info .product-name").html(product.name)
            $(".product-info .product-description").html(product.description);

            // Prices
            priceKeys = Object.keys(product.prices)
            $(".product-info .product-price span").html(product.prices[priceKeys[0]]);

            // Sizes
            priceKeys.forEach(key => {
                $(".product-sizes").append(
                    `<span data-size-price="${product.prices[key]}">${key}</span>`
                );
            })
            $(".product-sizes span:nth-child(1)").addClass("active")
        } else {
            location.replace("./shop.html")
        }


    });
}











// PRODUCTS UI


// Toggle Product Size & Price
$(document).on("click", ".product-sizes span", function () {

    // Toggle Product Size CLass
    $(".product-sizes span").removeClass("active");
    $(this).addClass("active");

    // Product Size Price Adjust
    let price = parseInt($(this).attr("data-size-price"));
    $(".product-price span").html(price);
    $(".product-quant span").html(1);
});


// Product Page Quantity Change
$(document).on("click", ".product-info .product-quant .quant-minus", function () {
    let quantity = parseInt($(this).next().html());
    if (quantity !== 1) {
        quantity--;
    }
    $(this).next().html(quantity);

    // Adjust Price for Quantity
    let price = parseInt($(".product-info .product-sizes span.active").attr("data-size-price"));
    $(".product-info .product-price span").html(price * quantity);
});

$(document).on("click", ".product-info .product-quant .quant-plus", function () {
    let quantity = parseInt($(this).prev().html());
    quantity++;
    $(this).prev().html(quantity);

    // Adjust Price for Quantity
    let price = parseInt($(".product-info .product-sizes span.active").attr("data-size-price"));
    $(".product-info .product-price span").html(price * quantity);
});

$(".notify-cart .my-button-alt").click(() => {
    $(".notify-cart").removeClass("open")
})