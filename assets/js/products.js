// PRODUCT UTILS


// Insert Products in Shop
let grid;
const loadShopProducts = () => {
    let brandsList = [];
    let typesList = [];
    axios.get("./assets/js/products.json")
        .then(response => {
            products = response.data;

            products.forEach(product => {
                if (!brandsList.includes(product.brand)) {
                    brandsList.push(product.brand)
                }
                if (!typesList.includes(product.type)) {
                    typesList.push(product.type)
                }

                // Insert Products
                $(".shop-grid .row").append(
                    `
                <a class="shop-product col-sm-6 col-md-4 col-lg-4" href="./product.html#${product.code}" data-product-brand="${product.brand.toLowerCase()}"  data-product-price="${product.price}" data-product-type="${product.type.toLowerCase()}"
                >
                    <img class="shop-product-image" src="./assets/images/products/t1.png " alt="">
                    <p class="shop-product-brand">
                        ${product.brand}
                    </p>
                    <h5 class="shop-product-name">
                        ${product.name} | <span>${product.size}</span>
                    </h5>
                    <p class="shop-product-price">
                        R ${product.price}
                    </p>
                </a>
                `
                )
            });

            // Insert Brands
            brandsList.forEach(brand => {
                $("#filter-brand ul").append(
                    `<li>
                        <div class="custom-check">
                            <i class="fas fa-check"></i>
                        </div>
                        <p class="">${brand}</p>
                    </li> `
                )
            })

            // Insert Brands
            typesList.forEach(type => {
                $("#filter-type ul").append(
                    `<li>
                        <div class="custom-check">
                            <i class="fas fa-check"></i>
                        </div>
                        <p class="">${type}</p>
                    </li> `
                )
            })

            $grid = $('.shop-grid .row').isotope({
                itemSelector: '.shop-product',
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
            $(".product-brand").html(product.brand)
            $(".product-name").html(`${product.name} <span>|</span> <span>${product.size}</span> `)
            $(".product-price span").html(product.price)
            $(".product-type").html(product.type)
            $(".product-brief").html(product.brief)
            $(".product-description").html(product.description);
            $(".product-use").html(product.use);
        } else {
            location.replace("./index.html")
        }


    });
}

// Isotype Init

// Filter products
const filterProducts = (filterType) => {
    console.log(filterType);

    let shopSize = $(".shop-grid .shop-product").length;

    if (filterType === "brand") {
        let filterBrandCount = $("#filter-brand li").length
        let activeBrandFilters = [];
        $(`.shop-grid .shop-product`).removeClass("filter-hide-brand");

        // Get all active filter sizes
        for (let i = 1; i <= filterBrandCount; i++) {
            if ($(`#filter-brand li:nth-child(${i})`).hasClass("active")) {
                activeBrandFilters.push($(`#filter-brand li:nth-child(${i}) p`).html().toLowerCase());
            }
        }

        // hide product if at least one size doesn't match active size filter
        for (let i = 1; i <= shopSize; i++) {
            if (activeBrandFilters.length > 0) {
                let productBrand = $(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-brand")
                if (!activeBrandFilters.includes(productBrand)) {
                    $(`.shop-grid .shop-product:nth-child(${i})`).addClass("filter-hide-brand");
                }
            }
        }
    }


    if (filterType === "type") {
        let filterTypeCount = $("#filter-type li").length
        let activeTypeFilters = [];
        $(`.shop-grid .shop-product`).removeClass("filter-hide-type");

        // Get all active filter sizes
        for (let i = 1; i <= filterTypeCount; i++) {
            if ($(`#filter-type li:nth-child(${i})`).hasClass("active")) {
                activeTypeFilters.push($(`#filter-type li:nth-child(${i}) p`).html().toLowerCase());
            }
        }

        // hide product if at least one size doesn't match active size filter
        for (let i = 1; i <= shopSize; i++) {
            if (activeTypeFilters.length > 0) {
                let productType = $(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-type");
                if (!activeTypeFilters.includes(productType)) {
                    $(`.shop-grid .shop-product:nth-child(${i})`).addClass("filter-hide-type");
                }
            }
        }

    }


    if (filterType === "price") {
        if ($("#filter-price-min").val() === "" || $("#filter-price-max").val() === "") {
            alert("Please enter a valid price to filter")
        } else {
            const priceMin = $("#filter-price-min").val();
            const priceMax = $("#filter-price-max").val();


            // hide product if at least one size doesn't match active size filter
            for (let i = 1; i <= shopSize; i++) {
                let productPrice = parseInt($(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-price"));
                if (productPrice < priceMin || productPrice > priceMax) {
                    $(`.shop-grid .shop-product:nth-child(${i})`).addClass("filter-hide-price");
                }
            }
        }
    }

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

// Filter Size Check Boxes
$(document).on("click", ".card-filter-checks li", function () {
    $(this).toggleClass("active");
    $(this).find("i").toggle();
    let filterType = $(this).closest(".card-filter-checks").attr("data-filter-type");
    filterProducts(filterType);
});

// Sort Dropdown
$("#shop-settings-sort").click(() => {
    $("#shop-settings-sort-dropdown").toggleClass("open")
});