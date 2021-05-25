const socketController = (socket) => {
  //console.log("cliente conectado", socket.id);

  //desconexión
  socket.on("disconnect", () => {
    //console.log('cliente desconectado');
  });

  //recibir mensaje de evento definido
  socket.on("enviar-mensaje", (payload, callback) => {
    //console.log(payload);

    const { date, mensaje } = payload;

    /** se ejecuta callback para enviar por la misma vía
     * al cliente en especifico que emite el evento */
    callback({ mensaje, date });

    //el servidor envía mensaje al mismo socket que envia
    //socket.emit("enviar-mensaje", payload);

    //el servidor envía mensaje a los demás clientes
    socket.broadcast.emit("enviar-mensaje", payload);
  });
};

module.exports = {
  socketController,
};
