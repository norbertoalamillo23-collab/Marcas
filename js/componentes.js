function cargar(id, ruta, despues) {
  fetch(ruta)
    .then((respuesta) => respuesta.text())
    .then((html) => {
      document.getElementById(id).innerHTML = html;
      if (despues) despues();
    });
}

function marcarPaginaActiva() {
  const actual = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach((enlace) => {
    if (enlace.getAttribute("href") === actual) {
      enlace.classList.add("activo");
      const grupo = enlace.closest(".grupo");
      if (grupo) grupo.querySelector(".grupo-titulo").classList.add("activo");
    }
  });
}

cargar("header", "componentes/header.html", marcarPaginaActiva);
cargar("footer", "componentes/footer.html");