const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");

const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

const socket = io();

socket.on("connect", () => {
  //console.log("Conectado");
  lblOnline.style.display = "";
  lblOffline.style.display = "none";
});

socket.on("disconnect", () => {
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
  console.log("Desconectado");
});

socket.on("enviar-mensaje", (payload) => {
  console.log("Has recibido > ", payload);
});

btnEnviar.addEventListener("click", () => {
  const mensaje = txtMensaje.value;

  const payload = {
    mensaje,
    date: new Date().getTime(),
  };

  socket.emit("enviar-mensaje", payload, (serverReturn) => {
    console.log("Has enviado > ", serverReturn);
  });
});
