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


socket.on('newLocationMessage', function(message) {
	let li = jQuery('<li></li>') //usando o texto desta forma evita que alguem injete código malicioso
	let a = jQuery('<a target="_blank">Minha posição atual</a>')  //o _blank serve pra abrir uma nova aba antes de direcionar para o link 


	li.text(`${message.from}: `)
	a.attr('href', message.url) //busca um elemento dentro do a
	li.append(a)
	jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault()
	socket.emit('createMessage', {
		from: 'User',
		text: jQuery('[name=message]').val() 
	}, function() {

	})
})

let locationButton = jQuery('#send-location')
locationButton.on('click', function() {
	if(!navigator.geolocation){
		return alert('Geolocation não é suportado pelo seu navegador!')
	}

	navigator.geolocation.getCurrentPosition(function(position){
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function() {
		alert('Não foi possível pegar a localização.')
	})
})