const EMOJIS = {
  piedra: "✊",
  papel: "✋",
  tijera: "✌️",
};
const GANA_A = {
  piedra: "tijera",
  papel: "piedra",
  tijera: "papel",
};

const OPCIONES = Object.keys(EMOJIS);

let partidas = 0;
let ganadas = 0;
let empatadas = 0;
let perdidas = 0;

function eleccionMaquina() {
  const indice = Math.floor(Math.random() * OPCIONES.length);
  return OPCIONES[indice];
}

function decidir(jugador, maquina) {
  if (jugador === maquina) return "empate";
  return GANA_A[jugador] === maquina ? "victoria" : "derrota";
}

function nombre(opcion) {
  return opcion.charAt(0).toUpperCase() + opcion.slice(1);
}

function juego(jugador) {
  const maquina = eleccionMaquina();
  const resultado = decidir(jugador, maquina);

  partidas++;
  let mensaje;

  if (resultado === "victoria") {
    ganadas++;
    mensaje = "¡Has ganado! " + nombre(jugador) + " vence a " + maquina + ".";
  } else if (resultado === "derrota") {
    perdidas++;
    mensaje = "Has perdido. " + nombre(maquina) + " vence a " + jugador + ".";
  } else {
    empatadas++;
    mensaje = "Empate: los dos habéis elegido " + jugador + ".";
  }

  document.getElementById("marcador").textContent = "Partidas jugadas: " + partidas;
  document.getElementById("ganadas").textContent = "Ganadas: " + ganadas;
  document.getElementById("empatadas").textContent = "Empates: " + empatadas;
  document.getElementById("perdidas").textContent = "Derrotas: " + perdidas;

  document.getElementById("jugada-jugador").textContent =
    "Tú: " + EMOJIS[jugador] + " " + nombre(jugador);
  document.getElementById("jugada-maquina").textContent =
    "Máquina: " + EMOJIS[maquina] + " " + nombre(maquina);
  document.getElementById("mensaje").textContent = mensaje;

  const caja = document.getElementById("resultado");
  caja.classList.remove("victoria", "derrota", "empate");
  void caja.offsetWidth;
  caja.classList.add(resultado);
}