"use strict";
//////// I. Variables globales
// 1.
const sections = document.querySelectorAll(".section"),
  scrollerContainer = document.querySelector(".scroller");

// 2.
const sectionContainer = document.querySelector(".sections");

// 3.
const navDots = document.querySelector(".nav-dots");

// 4.
const navLinks = document.querySelectorAll(".nav-link");

// 5.
const navWrapper = document.querySelector(".nav--wrapper"),
  btnDropdown = document.querySelector(".btn-dropdown button");

// 6.
const ventanaTabs = document.querySelector(".ventana-tabs"),
  ventanaContent = document.querySelector(".ventana-content");

// 7.
const sectionHeaders = [...document.querySelectorAll(".section-header")];

// 8.
const projects = [...document.querySelectorAll(".proyecto")];

// 10.
const projectsContainer = document.querySelector(".proyectos");
const btnCells = [...document.querySelectorAll(".cell")];
const btnCloseProject = [...document.querySelectorAll(".proyecto-btn-close")];
// 11.
const cubeContainer = document.querySelector(".cube");
const facesValores = [
  ...document.querySelectorAll(".face-front, .face-down, .face-back, .face-up"),
];

////////////////////////////////////////

//////// II. Funciones
// 2.
const esconder = (el) => el.classList.add("escondido"),
  mostrar = (el) => el.classList.remove("escondido");

// 6.
const añadirClase = (elemento, clase = "") => elemento.classList.add(clase);
const removerClase = (elemento, clase = "") => elemento.classList.remove(clase);
const activarElemento = function (padre, elemento, clase) {
  // Esta función añade una clase a un elemento en especifico mientras que las otras se quitan.
  [...padre.children].forEach((restante) => {
    removerClase(restante, clase);
    añadirClase(elemento, clase);
  });
};
// 11.
const asignarRotacion = () =>
    cubeContainer.style.setProperty("--andrew-tate", `${rotationDeg}deg`),
  girarDeg = () => (rotationDeg += 90),
  resetearDeg = () => (rotationDeg = 0);
////////////////////////////////////////////////////////////////////////////////////////
////////////////  Código

//////// 1. Add scroll length
// Este código crea tantos divs (con altura de 100vh) como secciones hay en el portfolio
//////// 3. Add dots
// Este código añade tantos puntos como secciones haya en el portfolio
sections.forEach((_, i) => {
  // scroll divs
  const createScroll = document.createElement("div");
  createScroll.classList.add("scroll");
  createScroll.classList.add(`scroll--${i}`);
  createScroll.setAttribute("id", `scroll--${i}`);
  scrollerContainer.append(createScroll);

  // dots
  const createDot = document.createElement("div");
  createDot.classList.add("nav-dot");
  createDot.classList.add(`nav-dot--${i}`);
  navDots.append(createDot);
});

//////// 2. Observador para mostrar secciones dependiendo de donde estés con el scroll
// Este código muestra cada sección dependiendo de la posicion del scroll
const scrolls = document.querySelectorAll(".scroll");
scrolls.forEach((scroll, i) => {
  const section = document.querySelector(`.section-${i}`);
  // seccion actual^^
  const sectionElements = document.querySelectorAll(`.section-${i}  *`);
  // elementos de la seccion actual^^
  const dot = document.querySelector(`.nav-dot--${i}`);
  // dots^^
  const link = [...navLinks][i];
  // link actual^^

  const esconderPartes = function (entries) {
    const [entry] = entries;

    // Si intersecciona, esconde el elemento
    if (entry.isIntersecting) {
      section.classList.remove("section-escondido");
      sectionContainer.style.setProperty("--g-wheel-pos", `${i * -100}vh`);
      dot.classList.add("nav-dot--active");
      link.classList.add("nav-link--active");
    } else {
      section.classList.add("section-escondido");
      dot.classList.remove("nav-dot--active");
      link.classList.remove("nav-link--active");
    }
    // lo mismo que antes, pero con los elementos de la seccion y con un retraso
    sectionElements.forEach((el, y) => {
      const timeout = setTimeout(() => {
        if (entry.isIntersecting) mostrar(el);
        else esconder(el);
        clearTimeout(timeout);
      }, 50 * y);
    });
  };
  const scrollObserver = new IntersectionObserver(esconderPartes, {
    root: null,
    threshold: 0.3,
  });
  scrollObserver.observe(scroll);
});

// Añade la propiedad (clase) .transicion a cada seccion para que no se buguee la transicion
window.addEventListener("load", () =>
  setTimeout(() => {
    sectionContainer.classList.add("transition");
    document.querySelector(".loader").classList.add("quitar-loader");
  }, 500)
);

// 4. links to
navLinks.forEach((link, i) => {
  link.setAttribute("href", `#scroll--${i}`);
  link.style.setProperty("--section-color", link.dataset.sectionColor);
});

// 5. botón dropdown
btnDropdown.addEventListener("click", () => {
  navWrapper.classList.toggle("nav--wrapper-hidden");
});

// 6. Botón para mostrar las penstañas
ventanaTabs.addEventListener("click", (event) => {
  const button = event.target;
  const tabActivado = button.closest(".ventana-tab");
  const ventanaCntItem = document.querySelector(`.${button.dataset.ventana}`);

  if (
    event.target.tagName === "BUTTON" &&
    !tabActivado.classList.contains("tab-activo")
  ) {
    activarElemento(ventanaTabs, tabActivado, "tab-activo");
    activarElemento(ventanaContent, ventanaCntItem, "ventana-activa");
  }
});

// 7. Marquesa para el titulo de cada sección (excepto para la portada)
sectionHeaders.forEach((header) => {
  const title = header.querySelector(".section-title"),
    marquee = header.querySelector(".section-title--marquee");

  for (let i = 0; i < 10; i++) {
    const createText = document.createElement("span");

    createText.textContent = `${title.textContent.replaceAll(" ", "")}`;
    marquee.append(createText);
  }
});

// 8. Transición para cada imagen del proyecto

projects.forEach((project) => {
  const imagenes = [...project.querySelector(".proyecto-media--img").children];
  const duration = 7500;

  if (imagenes.length > 1) {
    imagenes[0].classList.add("proyecto-media--activo");

    imagenes.forEach((img, i) => {
      const switchImg = () => {
        imagenes.forEach((img) => {
          img.classList.remove("proyecto-media--activo");
        });
        img.classList.add("proyecto-media--activo");
      };
      setTimeout(switchImg, duration * i);
      setInterval(() => {
        setTimeout(switchImg, duration * i);
      }, duration * imagenes.length);
    });
  } else {
    imagenes[0].classList.add("proyecto-media--activo");
  }
});

// 9. cambiar object fit
projects.forEach((project) => {
  const imagenes = [...project.querySelector(".proyecto-media--img").children];
  imagenes.forEach((img) => {
    img.addEventListener("click", () => {
      img.classList.toggle("proyecto-media-contain");
    });
  });
});

// 10. mostrar proyectos
// a.
btnCells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    projectsContainer.classList.add("proyectos-abierto");
    projects[i].classList.add("proyecto-activo");
  });
});

// b.
btnCloseProject.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    projectsContainer.classList.remove("proyectos-abierto");
    projects[i].classList.remove("proyecto-activo");
  });
});

// 11. girar el cubo para mostrar cada valor
let rotationDeg = 0;
const facesHTML = facesValores.map((face) => face.innerHTML).slice(0, -1);
console.log(facesHTML);
let n = 0;
let cambiar = 0;
facesValores.forEach((face, i) => {
  face.innerHTML = facesHTML[n];
  n === 2 ? (n = 0) : n++;
});

cubeContainer.addEventListener("click", (e) => {
  if (rotationDeg === 270) {
    girarDeg();
    asignarRotacion();
    resetearDeg();
    setTimeout(() => {
      facesValores.forEach((face, i) => {
        if (i === 3) {
          face.innerHTML = facesHTML[n];
          n === 2 ? (n = 0) : n++;
        }
      });
      cubeContainer.classList.remove("transicionar");
      asignarRotacion();
    }, 750);
  } else if (rotationDeg === 180) {
    setTimeout(() => {
      facesValores.forEach((face, i) => {
        if (i !== 3) {
          face.innerHTML = facesHTML[n];
          n === 2 ? (n = 0) : n++;
        }
      });
    }, 750);
    girarDeg();
    cubeContainer.classList.add("transicionar");
    asignarRotacion();
  } else {
    girarDeg();
    cubeContainer.classList.add("transicionar");
    asignarRotacion();
  }
  // console.log(e.target);
});
