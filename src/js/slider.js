const slideLeft = document.querySelector('.slider__arrow--left');
const slideRight = document.querySelector('.slider__arrow--right');
const dots = document.querySelector('.slider__dots');
const intervalTime = 5000;
let slideNumber = 0;
let direction = "right";
const allSlides = document.getElementsByClassName("slider__slide");
const allDots = document.getElementsByClassName("slider__dot");

const files = [
    'slide-01.jpg',
    'slide-02.jpg',
    'slide-03.jpg',
]

const addSlides = () => {
    const path = './slider/';
    files.forEach(slajd => {
        const elementDiv = document.createElement("div");
        const elementImg = document.createElement("img");

        elementDiv.classList.add("slider__slide");
        elementImg.setAttribute("src", path + slajd);
        document.querySelector('.slider').appendChild(elementDiv);
        document.querySelector('.slider__slide:last-of-type').appendChild(elementImg);
    })
}

const addDots = (dots) => {
    for (let i = 0; i < dots; i++) {
        let element = document.createElement("div");
        element.classList.add("slider__dot");
        document.querySelector('.slider__dots').appendChild(element);
    }
}

const setActiveElements = (elementNumber, direction) => {
    if (direction == "right") {
        allSlides[elementNumber].classList.add("slider__slide--active");
        allDots[elementNumber].classList.add("slider__slide--active");

        if (elementNumber > 0) {
            allSlides[elementNumber - 1].classList.remove("slider__slide--active");
            allDots[elementNumber - 1].classList.remove("slider__slide--active");
        }
        else {
            allSlides[files.length - 1].classList.remove("slider__slide--active");
            allDots[files.length - 1].classList.remove("slider__slide--active");
        }
    }

    if (direction == "left") {
        allSlides[elementNumber].classList.add("slider__slide--active");
        allDots[elementNumber].classList.add("slider__slide--active");
        if (elementNumber < files.length - 1) {
            allSlides[elementNumber + 1].classList.remove("slider__slide--active");
            allDots[elementNumber + 1].classList.remove("slider__slide--active");
        }
        if (elementNumber == files.length - 1) {
            allSlides[0].classList.remove("slider__slide--active");
            allDots[0].classList.remove("slider__slide--active");
        }
    }
}

const changeSlidePlus = () => {
    clearInterval(time);
    slideNumber++;
    if (slideNumber == files.length) {
        slideNumber = 0;
    }
    direction = "right";
    setActiveElements(slideNumber, direction);
    time = setInterval(changeSlidePlus, intervalTime);
}

const changeSlideMinus = () => {
    clearInterval(time);
    if (slideNumber == 0) {
        slideNumber = files.length - 1;
    }
    else if (slideNumber > 0) {
        slideNumber--;
    }
    direction = "left";
    setActiveElements(slideNumber, direction);
    time = setInterval(changeSlidePlus, intervalTime);
}

const changeDot = (e) => {
    clearInterval(time);
    const activeDot = document.querySelector(".slider__dot.slider__slide--active");
    const activeSlide = document.querySelector(".slider__slide.slider__slide--active");
    activeDot.classList.remove("slider__slide--active");
    activeSlide.classList.remove("slider__slide--active");
    let thisDot = e.target;
    console.log(e.target)
    thisDot.classList.add("slider__slide--active");
    let sliderLength = document.getElementsByClassName("slider__dot");
    sliderLength = [...sliderLength];
    let index = document.getElementsByClassName('slider__slide--active')[0];
    index = sliderLength.indexOf(index);
    allSlides[index].classList.add("slider__slide--active");
    slideNumber = index;
    time = setInterval(changeSlidePlus, intervalTime);
}

addSlides();
addDots(files.length);
allDots[0].classList.add("slider__slide--active");
allSlides[0].classList.add("slider__slide--active");

let time = setInterval(changeSlidePlus, intervalTime);

slideRight.addEventListener('click', changeSlidePlus);
slideLeft.addEventListener('click', changeSlideMinus);
dots.addEventListener('click', changeDot)