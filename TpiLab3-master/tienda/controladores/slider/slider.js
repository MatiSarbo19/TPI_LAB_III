export function Slider() {
    const sliderSection = document.querySelector(".slider");

    sliderSection.innerHTML = `
        <div class="custom-slider">
            <div class="custom-slide active">
                <p>Hasta 50% OFF en Seleccionados</p>
            </div>
            <div class="custom-slide">
                <p>Envío gratis a partir de $255.000</p>
            </div>
            <div class="custom-slide">
                <p>Descuentos exclusivos con tarjetas de crédito</p>
            </div>
            <button class="custom-prev">&lt;</button>
            <button class="custom-next">&gt;</button>
        </div>
    `;

    let slideIndex = 0;
    const slides = sliderSection.querySelectorAll(".custom-slide");
    const prevButton = sliderSection.querySelector(".custom-prev");
    const nextButton = sliderSection.querySelector(".custom-next");

    function showSlide(index) {
        
        slides.forEach((slide) => {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

   
    function nextSlide() {
        slideIndex = (slideIndex + 1) % slides.length; 
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex = (slideIndex - 1 + slides.length) % slides.length; 
        showSlide(slideIndex);
    }

    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);


    setInterval(nextSlide, 5000);
}
