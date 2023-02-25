const TicketControl = require('../models/ticket-control');

const ticketControl = new TicketControl();

const socketController = (socket) => {
    //These display when create a new socket 
    socket.emit('last-ticket', ticketControl.last);
    socket.emit('queue-ticket', ticketControl.lastFour);
    socket.emit('ticket-pending', ticketControl.tickets.length);
    //
    socket.on('next-ticket', (payload, callback) => {
        const next = ticketControl.next();
        callback(next);
        socket.broadcast.emit('ticket-pending', ticketControl.tickets.length);
    })

    socket.on('get-ticket', ({ desk }, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                message: 'Desk must be specified'
            })
        }
        const ticket = ticketControl.OpenTicket(desk);

        socket.broadcast.emit('queue-ticket', ticketControl.lastFour);
        socket.emit('ticket-pending', ticketControl.tickets.length);
        socket.broadcast.emit('ticket-pending', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false,
                message: 'No more tickets available'
            });
        } else {
            return callback({
                ok: true,
                ticket
            })
        }
    })
}

module.exports = {
    socketController
}