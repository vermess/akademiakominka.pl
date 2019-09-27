const nav = document.querySelector('.nav');
const tel = document.querySelector(".nev__tel");
const logo = document.querySelector(".nav__logo");
const logoImg = document.querySelector(".nav__logo-img");
const burger = document.querySelector(".burger");
const ul = document.querySelector(".nav__list");
const submenu = document.querySelector(".nav__listitem");
const arrow = document.querySelector(".burger__angle-down");
const display = document.querySelector(".nav__list");
const result = getComputedStyle(display).display;
const popup = document.querySelector('.popup');
const popupClose = document.querySelector('.popup__close');


let getScroll = () => {

    if (window.pageYOffset > 10) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        nav.addEventListener("mouseleave", function () {
            nav.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        })
        nav.style.height = "70px";
        tel.style.lineHeight = "70px";
        burger.style.lineHeight = "70px";
        logoImg.style.height = "65px";
        logoImg.style.width = "50px";
        logo.style.marginTop = "15px";
        ul.style.lineHeight = "70px";
        ul.style.top = "70px";
        if (result == "block") {
            arrow.style.lineHeight = "70px";
        }
        if (document.querySelector(".active")) {
            document.querySelector(".active").style.top = "70px";

        }
        if (popup) popup.classList.remove("popup--active");

    } else if (window.pageYOffset <= 0) {
        nav.style.backgroundColor = "rgba(0, 0, 0, 0.5)";

        nav.addEventListener("mouseover", function () {
            nav.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
        })
        nav.addEventListener("mouseleave", function () {
            nav.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        })
        nav.style.height = "100px";
        tel.style.lineHeight = "100px";
        burger.style.lineHeight = "100px";
        logoImg.style.height = "93px";
        logoImg.style.width = "71px";
        logo.style.marginTop = "0";
        ul.style.lineHeight = "100px";
        ul.style.top = "100px";


        if (result == "block") {
            arrow.style.lineHeight = "100px";
        }
        if (document.querySelector(".active")) {
            document.querySelector(".active").style.top = "100px";
        }
    }
}

window.addEventListener("scroll", getScroll);

submenu.addEventListener("click", function () {
    if (window.pageYOffset <= 0) {
        document.querySelector(".nav__submenu").style.top = "100px";
    } else if (window.pageYOffset > 10) {
        document.querySelector(".nav__submenu").style.top = "70px";
    }
    document.querySelector(".nav__submenu").classList.toggle("active");
    if (document.querySelector(".nav__submenu").classList.contains("active")) {
        document.querySelector(".burger__angle-down").style.transform = "rotate(180deg)";
    } else {
        document.querySelector(".burger__angle-down").style.transform = "rotate(0deg)";
    }

})

if (popupClose) {
    popupClose.addEventListener("click", function () {
        popup.classList.remove("popup--active");
    })
}



burger.addEventListener("click", function () {
    burger.classList.toggle("burger--active");
})

$('.back').on('click', function () {
    $('body, html').animate({
        scrollTop: $('body, html').offset().top
    })
})

$(document).on("scroll", function () {
    if ($(document).scrollTop() >= 200) {
        $('.back').addClass('visible');
    } else {
        $('.back').removeClass('visible');
    }
})
