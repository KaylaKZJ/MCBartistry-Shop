// GENERAL

// const api_url = "http://localhost:3000";
const api_url = "https://mcb-shop-backend.herokuapp.com";


// Navbar 

$(".nav-menu-toggle, .nav-menu-body-hide").click(() => {
    $(".nav-menu").toggleClass("open")
    $(".nav-menu-body-hide").toggleClass("open")
    $("html").toggleClass("disabled")
})


// Loader

const hideLoader = () => {
    $(".loader").fadeOut();
}
// -------------------

// Footer Insert
$("footer").html(
    `
    <div class="container">
    <div class="row">
        <div class="col-md-6 footer-text">
            <h4>MCBartistry</h4>
            <p>MCBartistry - Permanent Makeup Artisan . Makeup Artist . Skin Expert. <br>
                The MCBartistry shop provides quality products to keep your skin looking amazing.
            </p>
            <span>© Copryright 2020 - MCBartistry.</span>
            <span>Design & Developed by <a target="blank"
                    href="http://www.webdacity.co.za/">Webdacity</a></span>
        </div>
        <div class="col-md-3 mt-3 mt-lg-0  footer-links">
            <h6>About</h6>
            <ul>
                <li>
                    <a target="blank" href="https://www.mcbartistry.com/about.html">My Story</a>
                </li>
                <li>
                    <a target="blank" href="https://www.mcbartistry.com/services.html">Services</a>
                </li>
                <li>
                    <a target="blank" href="https://www.mcbartistry.com/contact.html">Contact</a>
                </li>
                <li>
                    <a target="blank" href="https://www.mcbartistry.com/">Learn More</a>
                </li>
            </ul>
        </div>
        <div class="col-md-3 footer-contact">
            <h6>Get in Touch</h6>
            <div class="footer-social">
                <a target="blank"
                    href="https://api.whatsapp.com/send?phone=27606362710&text=Hi%20MCBartistry!%20I%27d%20like%20to%20ask%20you%20a%20question?">
                    <i class="fab fa-whatsapp"></i>
                </a>
                <a target="blank" href="https://web.facebook.com/MCBartistry/">
                    <i class="fab fa-facebook-f"></i>
                </a>
                <a target="blank" href="https://www.instagram.com/mcbartistry/">
                    <i class="fab fa-instagram"></i>
                </a>
                <a target="blank" href="https://twitter.com/MCBartistry">
                    <i class="fab fa-twitter"></i>
                </a>
            </div>
            <div class="divider"></div>
            <ul>
                <li>
                    <a href="mailto:info@mcbartistry.com">info@mcbartistry.com</a>
                </li>
                <li>
                    <a href="tel:0606362710">060 636 2710</a>
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