lblDesk = document.querySelector('h1');
btnGetTicket = document.querySelector('button');
lblTicket = document.querySelector('small');
divAlert = document.querySelector('div.alert');
lblPending = document.querySelector('#lblPending');

const searchParams = new URLSearchParams(window.location.search);
if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error('Desk must be specified');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;
divAlert.style.display = 'none';


const socket = io();

socket.on('connect', () => {
    btnGetTicket.disabled = false;
});

socket.on('disconnect', () => {
    btnGetTicket.disabled = true;
});

socket.on('ticket-pending', (payload) => {
    lblPending.innerText = payload;
});
btnGetTicket.addEventListener('click', () => {

    socket.emit('get-ticket', { desk }, ({ ok, ticket, message }) => {
        if (!ok) {
            lblTicket.innerText = 'Nobody';
            return divAlert.style.display = '';
        }
        lblTicket.innerText = 'Ticket ' + ticket.number;
    });
    socket.on('ticket-pending', (payload) => {
        lblPending.innerText = payload;
    });

});