let socket = io()
//arrow functions só funcionam no chrome!

function scrollToBottom() {
	//Selectors
	let messages = jQuery('#messages')
	let newMessage = messages.children('li:last-child')
	//Heights
	let clientHeight = messages.prop('clientHeight')
	let scrollTop = messages.prop('scrollTop')
	let scrollHeight = messages.prop('scrollHeight')
	let newMessageHeight = newMessage.innerHeight()
	let lastMessageHeight = newMessage.prev().innerHeight()

	if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight)
	}

}

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
	let formatedTime = moment(message.createdAt).format('h:mm a')
	let template = jQuery('#message-template').html()
	//usa a biblioteca mustache pra injetar os valores de forma dinâmica
	let html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formatedTime
	})
	jQuery('#messages').append(html)
	scrollToBottom()

	// let formatedTime = moment(message.createdAt).format('h:mm a')
	// console.log('Nova Mensagem!', message)
	// let li = jQuery('<li></li>')
	// li.text(`${message.from} ${formatedTime}: ${message.text}`)

	// jQuery('#messages').append(li)
})

// socket.emit('createMessage', {
// 	from: 'Frank',
// 	text: 'Hi!'
// }, function(data){
// 	console.log('Belê', data)
// })


socket.on('newLocationMessage', function(message) {
	let formatedTime = moment(message.createdAt).format('h:mm a')
	let template = jQuery('#location-message-template').html()
	let html = Mustache.render(template, {
		from: message.from,
		createdAt: formatedTime,
		url: message.url
	})
	jQuery('#messages').append(html)
	scrollToBottom()

	// let li = jQuery('<li></li>') //usando o texto desta forma evita que alguem injete código malicioso
	// let a = jQuery('<a target="_blank">Minha posição atual</a>')  //o _blank serve pra abrir uma nova aba antes de direcionar para o link 


	// li.text(`${message.from} ${formatedTime}: `)
	// a.attr('href', message.url) //busca um elemento dentro do a
	// li.append(a)
	// jQuery('#messages').append(li)
})

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault()

	let messageTextbox = jQuery('[name=message]')

	socket.emit('createMessage', {
		from: 'User',
		text: messageTextbox.val() 
	}, function() {
		messageTextbox.val('') //seta o valor, limpando o campo de texto
	})
})

let locationButton = jQuery('#send-location')
locationButton.on('click', function() {
	if(!navigator.geolocation){
		return alert('Geolocation não é suportado pelo seu navegador!')
	}

	locationButton.attr('disabled', 'disabled').text('Enviando posição...') //attr seta atributos e o text altera o nome do botão

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr('disabled').text('Enviar posição') //reativa o botão e atualiza o texto
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		})
	}, function() {
		locationButton.removeAttr('disabled').text('Enviar posição') //reativa o botão
		alert('Não foi possível pegar a localização.')
	})
})