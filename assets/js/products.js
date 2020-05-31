// PRODUCT UTILS


// Insert Products in Shop
let grid;
const loadShopProducts = () => {
    let brandsList = [];
    let typesList = [];
    axios.get(`${api_url}/products`)
        .then(response => {
            products = response.data;

            products.forEach(product => {
                if (!brandsList.includes(product.brand)) {
                    brandsList.push(product.brand)
                }
                if (!typesList.includes(product.type)) {
                    typesList.push(product.type)
                }

                let productThumbnail = product.productThumbnailUrl;
                productThumbnail = productThumbnail.replace("upload/", "upload/f_auto/");

                // Insert Products
                $(".shop-grid .row").append(
                    `
                <a class="shop-product col-sm-6 col-md-4 col-lg-4" href="./product.html#${product.code}" data-product-brand="${product.brand}"  data-product-price="${product.price}" data-product-type="${product.type}"
                >
                <div class="shop-product-image">
                    <img class="img-fluid" src="${productThumbnail}" alt="">
                    </div>
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

            hideLoader()
        })
        .catch(err => console.log(err));
}



// Insert Product in Product Page

const loadProduct = () => {

    // Get Recipe ID
    let productCode = window.location.hash; //Get Recipe ID
    if (productCode == "") {
        window.location.pathname = "/index.html"
    }
    productCode = productCode.substr(1); //Remove #

    axios.get(`${api_url}/products/productCode/${productCode}`)
        .then(response => {
            const product = response.data;

            // Insert Product Details
            document.title = product.name;
            $('head').append(`<meta name="description" content="${product.brief}"/>`);
            $('head').append(`<meta property="og:url" content="https://shop.mcbartistry.com/product.html#${ product.code}"/>`);
            $('head').append(`<meta property="og:title" content="${product.name}" />`);
            $('head').append(`<meta property="og:description" content="${product.brief}"/>`);


            $(".product-container").attr("data-product-code", product.code)
            $(".product-brand").html(product.brand)
            $(".product-name").html(`${product.name} <span>|</span> <span>${product.size}</span> `)
            $(".product-price span").html(product.price)
            $(".product-type").html(product.type)
            $(".product-brief").html(product.brief)
            $(".product-description").html(product.description);
            $(".product-use").html(product.use);
            $(".product-info").attr("data-product-price", product.price);

            let image = product.productImageUrls[0];
            image = image.replace("upload/", "upload/f_auto/");
            $(".product-image img").attr("src", image);

            $('meta[name=description]').remove();
            $('head').append(`<meta name="description" content="${product.brief}">`);
            hideLoader();


        });
}

// Filter products
const filterProducts = (filterType) => {
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
                let productBrand = $(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-brand").toLowerCase()
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
                let productType = $(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-type").toLowerCase();
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


// Product Page Quantity Change
$(document).on("click", ".product-info .product-quant .quant-minus", function () {
    let quantity = parseInt($(this).next().html());
    if (quantity !== 1) {
        quantity--;
    }
    $(this).next().html(quantity);

    // Adjust Price for Quantity
    let price = parseInt($(".product-info").attr("data-product-price"));
    $(".product-info .product-price span").html(price * quantity);
});

$(document).on("click", ".product-info .product-quant .quant-plus", function () {
    let quantity = parseInt($(this).prev().html());
    quantity++;
    $(this).prev().html(quantity);

    // Adjust Price for Quantity
    let price = parseInt($(".product-info").attr("data-product-price"));
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