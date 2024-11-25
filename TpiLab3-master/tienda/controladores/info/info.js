export function Info() {
    const sliderSection = document.querySelector(".info");

    sliderSection.innerHTML = `
        <h2>VESTITE COMO QUIERAS</h2>
        <p>Enamorate de los Windrunner Tracksuits, un nuevo enfoque de Nike.</p>
        <p>Cancheros, onderos y cómodos.</p>
        <p>Usalos cómo quieras y dónde quieras, dentro o fuera de la cancha, pista o la calle.</p>
    `;
}

export function Footer(){
    const footerSection = document.querySelector('.footer');
    footerSection.innerHTML=`
    <div class="footer">
        <div class="footer-container">
            <!-- Column 1 -->
            <div class="footer-column">
            <h4>Explora</h4>
            <ul>
                <li><a href="#" class="footer-link">Promociones</a></li>
                <li><a href="#" class="footer-link">Novedades</a></li>
                <li><a href="#" class="footer-link">Preguntas Frecuentes</a></li>
                <li><a href="#" class="footer-link">Términos y Condiciones</a></li>
            </ul>
            </div>


            
            <!-- Column 2 -->
            <div class="footer-column">
            <h4>Ayuda</h4>
            <ul>
                <li><a href="#">Envíos y entregas</a></li>
                <li><a href="#">Devoluciones</a></li>
                <li><a href="#">Cambios</a></li>
                <li><a href="#">Opciones de pago</a></li>
            </ul>
            </div>

            <!-- Column 3 -->
            <div class="footer-column">
            <h4>Acerca de UrbanChill</h4>
            <ul>
                <li><a href="#">Propósito</a></li>
                <li><a href="#">Noticias</a></li>
            </ul>
            </div>

            <!-- Column 4 -->
            <div class="footer-column">
                <h4>Síguenos</h4>
                <div class="social-icons">
                    <a href="#" class="social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social-icon" aria-label="YouTube"><i class="fab fa-youtube"></i></a>
                    <a href="#" class="social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 UrbanChill. Todos los derechos reservados.</p>
        </div>
    </div>
`
}