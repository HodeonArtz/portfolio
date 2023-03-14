"use strict";
//////// Scroll navbar fix

//////// Marti diciano Text effect
// const martiTitle = document.querySelector(".giant-title");
// const splitMartiTitleArr = martiTitle.textContent.split("");

// const martiSubtitle = document.querySelector("#martiD-subtitle");
// const splitSubtitle = martiSubtitle.textContent.split("");

// martiTitle.textContent = "M";
// martiSubtitle.textContent = "";
// for (let letter = 1; letter < splitMartiTitleArr.length; letter++) {
//   setTimeout(function () {
//     martiTitle.textContent += splitMartiTitleArr[letter];
//   }, letter * 65);
// }
// for (let letter = 0; letter < splitSubtitle.length; letter++) {
//   setTimeout(function () {
//     martiSubtitle.textContent += splitSubtitle[letter];
//   }, letter * 35);
// }
const martiTitle = document.querySelector(".giant-title");
const splitMartiTitleArr = martiTitle.textContent.split("");

const martiSubtitle = document.querySelector("#martiD-subtitle");
const splitSubtitle = martiSubtitle.textContent.split("");

martiTitle.textContent = "M";
martiSubtitle.textContent = "";

function addLetterTitle(i) {
  if (i < splitMartiTitleArr.length) {
    martiTitle.textContent += splitMartiTitleArr[i];
    requestAnimationFrame(() => addLetterTitle(i + 1));
  }
}

function addLetterSubtitle(i) {
  if (i < splitSubtitle.length) {
    martiSubtitle.textContent += splitSubtitle[i];
    requestAnimationFrame(() => addLetterSubtitle(i + 1));
  }
}

requestAnimationFrame(() => addLetterTitle(1));
requestAnimationFrame(() => addLetterSubtitle(0));

// console.log(splitMartiTitleArr);

////////////////////////////////
const navigationHeight = document.querySelector(".nav").offsetHeight;
// console.log(navigationHeight);
document.documentElement.style.setProperty(
  "--scroll-padding",
  `${navigationHeight}px`
);
////////////////////////////////
//////// Change navbar color when scrolling down
const sobreMiContainer = document.querySelector(".sobreMi");
const navbarTop = document.querySelector("#nav");
const posicionScrollSobreMi = sobreMiContainer.offsetTop;
const navbar = document.querySelector(".nav");
navbarTop.style.setProperty("--change-bg-color", "#fdfdfd");
navbarTop.style.setProperty("--change-color", "#0c0c0c");
if (
  document.documentElement.scrollTop >
  posicionScrollSobreMi - navigationHeight - 10
) {
  navbarTop.style.setProperty("--change-bg-color", "#0c0c0c");
  navbarTop.style.setProperty("--change-color", "#fdfdfd");
  navbar.style.setProperty("--change-shadow-color", "0px 0px 10px #0c0c0c");
} else {
  navbarTop.style.setProperty("--change-bg-color", "#fdfdfd");
  navbarTop.style.setProperty("--change-color", "#0c0c0c");
  navbar.style.setProperty("--change-shadow-color", "0px 10px 10px #fdfdfd");
}
const changeNavbar = function () {
  if (
    document.documentElement.scrollTop >
    posicionScrollSobreMi - navigationHeight - 10
  ) {
    navbarTop.style.setProperty("--change-bg-color", "#0c0c0c");
    navbarTop.style.setProperty("--change-color", "#fdfdfd");
    document.documentElement.setAttribute("data-bs-theme", "dark");
    navbar.style.setProperty("--change-shadow-color", "0px 0px 10px #0c0c0c");
  } else {
    navbarTop.style.setProperty("--change-bg-color", "#fdfdfd");
    navbarTop.style.setProperty("--change-color", "#0c0c0c");
    document.documentElement.setAttribute("data-bs-theme", "light");
    navbar.style.setProperty("--change-shadow-color", "0px 10px 10px #fdfdfd");
  }
};

window.onscroll = function () {
  changeNavbar();
};
// console.log(posicionScrollSobreMi);

////////////////////////////////
//////// Sobre mi textos
const textoParrafos = document.querySelectorAll(".text");
const radios = document.querySelectorAll('[name="sobreMi"]');
const caja = document.querySelector(".caja1");
const label1 = document.querySelector('[for="1"]');
const label2 = document.querySelector('[for="2"]');
const label3 = document.querySelector('[for="3"]');

const cambiarOpacidad = function (parrafo, opacidad) {
  textoParrafos[parrafo].style.setProperty(
    `--change-opacity-${parrafo + 1}`,
    opacidad
  );
};

cambiarOpacidad(0, 1);
for (let i = 1; i < textoParrafos.length; i++) {
  cambiarOpacidad(i, 0);
}
radios.forEach((radio) => {
  radio.addEventListener("click", () => {
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        cambiarOpacidad(i, 1);
        switch (i) {
          case 0:
            caja.style.setProperty("--change-position", `${0}px`);
            break;
          case 1:
            caja.style.setProperty(
              "--change-position",
              `${label2.offsetTop - label1.offsetTop}px`
            );
            break;
          case 2:
            caja.style.setProperty(
              "--change-position",
              `${label3.offsetTop - label1.offsetTop}px`
            );
            break;
        }
      } else {
        cambiarOpacidad(i, 0);
      }
    }
  });
});
console.log(radios);
////////////////////////////////
//////// Mi valor textos
const textoValores = document.querySelectorAll(".text2");
const radios2 = document.querySelectorAll('[name="valor"]');
const caja2 = document.querySelector(".caja2");
const label4 = document.querySelector('[for="creatividad"]');
const label5 = document.querySelector('[for="adaptabilidad"]');
const label6 = document.querySelector('[for="compromiso"]');
const texto2 = document.querySelector(".caja2Texto");

console.log(textoValores);
console.log(radios2);

const cambiarOpacidad2 = function (parrafo, opacidad) {
  textoValores[parrafo].style.setProperty(
    `--change-opacity2-${parrafo + 1}`,
    opacidad
  );
};
cambiarOpacidad2(0, 1);
for (let i = 1; i < textoValores.length; i++) {
  cambiarOpacidad2(i, 0);
}
radios2.forEach((radio) => {
  radio.addEventListener("click", () => {
    for (let i = 0; i < radios2.length; i++) {
      if (radios2[i].checked) {
        cambiarOpacidad2(i, 1);
        switch (i) {
          case 0:
            caja2.style.setProperty("--change-position", `${0}px`);
            //texto2.textContent = "Creatividad y pensamiento crítico";
            break;
          case 1:
            caja2.style.setProperty(
              "--change-position",
              `${label2.offsetTop - label1.offsetTop}px`
            );
            //texto2.textContent = "Adaptabilidad";
            break;
          case 2:
            caja2.style.setProperty(
              "--change-position",
              `${label3.offsetTop - label1.offsetTop}px`
            );
            //texto2.textContent = "Compromiso";
            break;
        }
      } else {
        cambiarOpacidad2(i, 0);
      }
    }
  });
});
//////////////////////////////////
//////////// scroll animator
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    //console.log(entry);
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));
//////////////////////////////////
//////////// leer más
const textoOculto = document.querySelectorAll(".leerMas-oculto");
const btnLeerMas = document.querySelectorAll(".leerMas-btn");

for (let i = 0; i < btnLeerMas.length; i++) {
  btnLeerMas[i].addEventListener("click", function () {
    if (btnLeerMas[i].textContent == "Leer más...") {
      textoOculto[i].classList.add("leerMas-mostrar");
      btnLeerMas[i].textContent = "Leer menos...";
    } else {
      textoOculto[i].classList.remove("leerMas-mostrar");
      btnLeerMas[i].textContent = "Leer más...";
    }
  });
}
