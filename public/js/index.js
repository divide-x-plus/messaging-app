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
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);
  jQuery('#messages').append(li);
})

//TODO append location type message
socket.on('newLocMessage', (message) => {
  let formattedTime = moment(message.createdAt).format('h:mm a');
  let li = jQuery('<li></li>');
  // adding target _blank defaults to opening url in new tab
  li.append(`${message.from} ${formattedTime}: <a target='_blank' href=${message.url}>Click to Access Loc</a>`)
  jQuery('#messages').append(li);
})

// jQuery event listeners
jQuery('#message-form').on('submit', (e) => {
  e.preventDefault();
  let messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, () => {
    messageTextbox.val('');
  })
})

// get send location button
let locationButton = jQuery('#send-location');

locationButton.on('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled')
    .text('Sending Location...');

  navigator.geolocation.getCurrentPosition((pos) => {
    locationButton.removeAttr('disabled')
      .text('Send Location');
    socket.emit('createLocationMessage', {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    })
  }, () => {
    locationButton.removeAttr('disabled')
      .text('Send Location');
    console.log('unable to fetch geolocation')
  })
})
