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
  let li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
})

//TODO append location type message
socket.on('newLocMessage', (message) => {
  let li = jQuery('<li></li>');
  // adding target _blank defaults to opening url in new tab
  li.append(`${message.from}: <a target='_blank' href=${message.url}>Click to Access Loc</a>`)
  jQuery('#messages').append(li);
})

// jQuery event listeners
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  })
})

// get send location button
let locationButton = jQuery('#send-location');

locationButton.on('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition((pos) => {
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    })
  }, () => {
    console.log('unable to fetch geolocation')
  })
})
