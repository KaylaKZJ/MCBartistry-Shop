// GENERAL

// Navbar 

$(".nav-menu-toggle, .nav-menu-body-hide").click(() => {
    $(".nav-menu").toggleClass("open")
    $(".nav-menu-body-hide").toggleClass("open")
    $("html").toggleClass("disabled")
})

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