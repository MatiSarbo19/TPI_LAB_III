const htmlCarrusel = `
    <div class="slider-container">
        <div class="slide active">
            <img src="/img/slider/imagen1.png" alt="Imagen 1" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="slide">
            <img src="/img/slider/imagen2.png" alt="Imagen 2" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="slide">
            <img src="/img/slider/imagen3.png" alt="Imagen 3" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="slide">
            <img src="/img/slider/imagen4.png" alt="Imagen 4" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="slide">
            <img src="/img/slider/imagen5.png" alt="Imagen 5" style="width:100%; height:100%; object-fit:cover;">
        </div>

        <button class="prev">&#10094;</button>
        <button class="next">&#10095;</button>

        <div class="dots">
            <span class="dot active-dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    </div>
`;

let slideIndex = 1;
let autoSlideInterval; 

export async function Carrusel() {
    let d = document;
    let seccionCarrusel = d.querySelector(".carrusel");
    let seccionLogin = d.querySelector(".seccionLogin");

    seccionLogin.innerHTML = "";
    seccionCarrusel.innerHTML = htmlCarrusel;

    let buttonPrev = seccionCarrusel.querySelector(".prev");
    let buttonNext = seccionCarrusel.querySelector(".next");

    
    let dots = seccionCarrusel.querySelectorAll(".dot");

    buttonPrev.addEventListener('click', () => {
        clearInterval(autoSlideInterval); 
        prevSlide();
        startAutoSlide(); 
    });

    buttonNext.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlideInterval);
            currentSlide(index + 1);
            startAutoSlide();
        });
    });

    showSlides(slideIndex);

    
    startAutoSlide();
}

function nextSlide() {
    changeSlide(1);
}

function prevSlide() {
    changeSlide(-1);
}

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].classList.remove("active");
        dots[i].classList.remove("active-dot");
    }

    slides[slideIndex - 1].classList.add("active");
    dots[slideIndex - 1].classList.add("active-dot");
}


function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        prevSlide(); 
    }, 5000); 
}

