//reference HTML element
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessage = document.querySelector('#txtMessage');
const btnSend = document.querySelector('#btnSend');

//this is the client side 
const socket = io();

socket.on('connect', () => {
    //console.log('connection');
    lblOffline.style.display = 'none';
    lblOnline.style.display = ''
})

socket.on('disconnect', () => {
    // console.log('disconnection');
    lblOnline.style.display = 'none';
    lblOffline.style.display = ''
});

socket.on('send-message', (payload) => {
    console.log(payload);

});

btnSend.addEventListener('click', () => {
    const message = txtMessage.value;
    const payload = {
        message,
        id: 2
    }
    socket.emit('send-message', payload);
});