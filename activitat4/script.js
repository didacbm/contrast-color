document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main section");

    // Permetre la navegació amb la tecla Enter en els enllaços del menú
    links.forEach(link => {
        link.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                this.click();
            }
        });
    });

    // Funció per detectar la secció visible i canviar `aria-current`
    function updateAriaCurrent() {
        let currentSection = null;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                currentSection = section;
            }
        });

        if (currentSection) {
            const id = currentSection.getAttribute("id");
            links.forEach(link => {
                if (link.getAttribute("href") === `#${id}`) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }
    }

    // Detectar scroll i actualitzar `aria-current`
    window.addEventListener("scroll", updateAriaCurrent);
    updateAriaCurrent(); // Inicialització al carregar la pàgina
});
