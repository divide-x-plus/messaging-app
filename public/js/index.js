var socket = io();

// handling connection related events
socket.on('connect', () => {
  console.log('Connected to server');
})

socket.on('disconnect', () => {
  console.log('Disconnected from server');
})

// handling message events
socket.on('newMessage', (message) => {
  console.log('new message has been received', message);

  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})

// example of acknowledgements
// socket.emit('createMessage', {
//   from: 'Timea',
//   text: "Let's go to Ferris Wheel"
// }, (data) => {
//   console.log('An acknowledgement has been received: ', data);
// })

// jQuery event listeners
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  })
})
