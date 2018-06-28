var socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  // socket.emit('createMessage', {
  //   from: 'zl238@cornell.edu',
  //   text: 'responding my previous email to Z'
  // })
})

socket.on('disconnect', () => {
  console.log('Disconnected from server');
})

socket.on('newMessage', (message) => {
  console.log('new message has been received', message);
})
