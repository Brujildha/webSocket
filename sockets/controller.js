const socketController = (socket) => {
    console.log('Client connection', socket.id);

    socket.on('disconnect', () => {
        console.log('Disconnect', socket.id);
    })

    socket.on('send-message', (payload, callback) => {
        const id = 122
        //callback(id);
        socket.broadcast.emit('send-message', payload);
    })
}

module.exports = {
    socketController
}