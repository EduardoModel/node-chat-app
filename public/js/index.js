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
})