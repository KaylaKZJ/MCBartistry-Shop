// GENERAL

// Navbar 

$(".nav-menu-toggle, .nav-menu-body-hide").click(() => {
    $(".nav-menu").toggleClass("open")
    $(".nav-menu-body-hide").toggleClass("open")
})


//------------------

// SHOP PAGE

// Filter Size Check Boxes
$(".card-filter-size li").click(function () {
    $(this).toggleClass("active");
    $(this).find("i").toggle();
    filterSizes();
});

$(".card-filter-categories li").click(function () {
    $(".card-filter-categories li p").removeClass("active");
    $(this).find("p").toggleClass("active");
    filterCategories();
});

// Sort Dropdown
$("#shop-settings-sort").click(() => {
    $("#shop-settings-sort-dropdown").toggleClass("open")
});


// SHOP FILTERS

// Category

const filterCategories = () => {
    let activeCategory = $(".card-filter-categories p.active").html();
    let shopSize = $(".shop-grid .shop-product").length;
    // $(".shop-product").removeClass("filter-hide-category");
    $(".shop-product").removeClass("filter-hide-category");

    for (let i = 1; i <= shopSize; i++) {
        let productCategory = $(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-category");
        if (!productCategory.includes(activeCategory)) {
            $(`.shop-grid .shop-product:nth-child(${i})`).addClass("filter-hide-category")
        }
    }
};

const filterSizes = () => {
    let shopSize = $(".shop-grid .shop-product").length;
    let filterCount = $(".card-filter-size li").length;
    let activeSizeFilters = [];
    $(".shop-product").removeClass("filter-hide-size");

    // Get all active filter sizes
    for (let i = 1; i <= filterCount; i++) {
        if ($(`.card-filter-size li:nth-child(${i})`).hasClass("active")) {
            activeSizeFilters.push($(`.card-filter-size li:nth-child(${i}) p`).html());
        }
    }
    console.log(activeSizeFilters);

    // hide product if at least one size doesn't match active size filter
    for (let i = 1; i <= shopSize; i++) {
        if (activeSizeFilters.length > 0) {
            let productSizes = $(`.shop-grid .shop-product:nth-child(${i})`).attr("data-product-sizes").split(",");
            activeSizeFilters.forEach(size => {
                if (!productSizes.includes(size)) {
                    $(`.shop-grid .shop-product:nth-child(${i})`).addClass("filter-hide-size");
                }
            })
        }
    }
}






// -------------------

// Footer Insert
$("footer").html(
    `
    <div class="container">
            <div class="row">
                <div class="col-md-6 footer-text">
                    <h4>NC Chemicals</h4>
                    <p>NC Chemicals is an industry leader in the production of high-quality industrial, household &
                        automotive chemical products.
                    </p>
                    <span>© Copryright 2020 - NC Chemicals (PTY) LTD.</span>
                    <span>Design & Developed by <a target="blank"
                            href="http://www.webdacity.co.za/">Webdacity</a></span>
                </div>
                <div class="col-md-3 footer-links">
                    <h6>About Us</h6>
                    <ul>
                        <li>
                            <a href="">Our Story</a>
                        </li>
                        <li>
                            <a href="">Our Guarantee</a>
                        </li>
                        <li>
                            <a href="">Contact Us</a>
                        </li>
                    </ul>
                </div>
                <div class="col-md-3 footer-contact">
                    <h6>Get in Touch</h6>
                    <div class="footer-social">
                        <a href="">
                            <i class="fab fa-facebook-f"></i>
                        </a>
                        <a href="">
                            <i class="fab fa-linkedin-in"></i>
                        </a>
                        <a href="">
                            <i class="fab fa-twitter"></i>
                        </a>
                    </div>
                    <div class="divider"></div>
                    <ul>
                        <li>
                            <a href="mailto:">info@ncchemicals.co.za</a>
                        </li>
                        <li>
                            <a href="tel:0829014983">082 901 4983</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer-copy">

            </div>
        </div>`
)

$(document).ready(() => {
    updateCartCount();
})