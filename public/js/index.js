let socket = io()
//arrow functions só funcionam no chrome!
socket.on('connect', function() {
	console.log('Conectado com o servidor!')

	//o createdAt vai ser gerado no servidor!
	// socket.emit('createMessage', {
	// 	to: 'Adolf',
	// 	text: 'Yeahhhhh!',
	// })

})

socket.on('disconnect', function() {
	console.log('Desconectado do servidor!')
})

socket.on('newMessage', function(message) {
	console.log('Nova Mensagem!', message)
	let li = jQuery('<li></li>')
	li.text(`${message.from}: ${message.text}`)

	jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi!'
// }, function(data){
// 	console.log('Belê', data)
// })

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault()
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val() 
	}, function() {

	})
})