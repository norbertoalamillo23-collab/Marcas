// Calculadora: lógica

const SIMBOLOS = { "+": "+", "-": "−", "*": "×", "/": "÷" };
const MAX_DIGITOS = 12;

let actual = "0";       
let anterior = null;    
let operador = null;    
let nuevoNumero = false; 
let enError = false;
let textoExpresion = "";

// ---------- Utilidades ----------

function formatear(n) {
  return String(parseFloat(n.toPrecision(12)));
}

// Muestra el número con coma decimal
function aPantalla(texto) {
  return texto.replace(".", ",");
}

function actualizarPantalla() {
  document.getElementById("resultado").textContent = aPantalla(actual);
  document.getElementById("expresion").textContent = textoExpresion;
}

function mostrarError(mensaje) {
  actual = mensaje;
  anterior = null;
  operador = null;
  textoExpresion = "";
  enError = true;
  nuevoNumero = true;
}

function operar(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b;
  }
  return b;
}

// ---------- Acciones de los botones ----------

function pulsarNumero(digito) {
  if (enError) limpiar();
  if (nuevoNumero) {
    actual = digito;
    nuevoNumero = false;
  } else if (actual.replace(/[-.]/g, "").length < MAX_DIGITOS) {
    actual = actual === "0" ? digito : actual + digito;
  }
  actualizarPantalla();
}

function pulsarDecimal() {
  if (enError) limpiar();
  if (nuevoNumero) {
    actual = "0.";
    nuevoNumero = false;
  } else if (!actual.includes(".")) {
    actual += ".";
  }
  actualizarPantalla();
}

function pulsarOperador(op) {
  if (enError) return;

  if (operador !== null && nuevoNumero) {
    operador = op;
    textoExpresion = aPantalla(formatear(anterior)) + " " + SIMBOLOS[op];
    actualizarPantalla();
    return;
  }

  if (operador !== null) {
    const r = operar(anterior, parseFloat(actual), operador);
    if (r === null) {
      mostrarError("No se puede dividir entre 0");
      actualizarPantalla();
      return;
    }
    anterior = parseFloat(formatear(r));
    actual = formatear(r);
  } else {
    anterior = parseFloat(actual);
  }

  operador = op;
  nuevoNumero = true;
  textoExpresion = aPantalla(formatear(anterior)) + " " + SIMBOLOS[op];
  actualizarPantalla();
}

function igual() {
  if (enError || operador === null) return;

  const b = parseFloat(actual);
  const r = operar(anterior, b, operador);

  if (r === null) {
    mostrarError("No se puede dividir entre 0");
    actualizarPantalla();
    return;
  }

  textoExpresion =
    aPantalla(formatear(anterior)) + " " + SIMBOLOS[operador] + " " +
    aPantalla(formatear(b)) + " =";
  actual = formatear(r);
  anterior = null;
  operador = null;
  nuevoNumero = true;
  actualizarPantalla();
}

function porcentaje() {
  if (enError) return;
  actual = formatear(parseFloat(actual) / 100);
  nuevoNumero = true;
  actualizarPantalla();
}

function cambiarSigno() {
  if (enError || actual === "0") return;
  actual = actual.startsWith("-") ? actual.slice(1) : "-" + actual;
  actualizarPantalla();
}

function borrar() {
  if (enError) return limpiar();
  if (nuevoNumero) return; // no se borra un resultado ya calculado
  actual = actual.length > 1 && actual !== "-0" ? actual.slice(0, -1) : "0";
  if (actual === "-") actual = "0";
  actualizarPantalla();
}

function limpiar() {
  actual = "0";
  anterior = null;
  operador = null;
  nuevoNumero = false;
  enError = false;
  textoExpresion = "";
  actualizarPantalla();
}

// ---------- Teclado físico ----------

document.addEventListener("keydown", function (evento) {
  if (evento.target.closest("header, footer")) return;
  const tecla = evento.key;

  if (tecla >= "0" && tecla <= "9") {
    pulsarNumero(tecla);
  } else if (tecla === "," || tecla === ".") {
    pulsarDecimal();
  } else if (["+", "-", "*", "/"].includes(tecla)) {
    pulsarOperador(tecla);
  } else if (tecla === "Enter" || tecla === "=") {
    igual();
  } else if (tecla === "Backspace") {
    borrar();
  } else if (tecla === "Escape") {
    limpiar();
  } else if (tecla === "%") {
    porcentaje();
  } else {
    return;
  }

  evento.preventDefault();
});
