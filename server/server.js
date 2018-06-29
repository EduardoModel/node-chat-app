const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

//Esta forma de acessar o diretório public é ruim, pois tu acessa a pasta server, sai dela e entra na pasta public!
// console.log(__dirname + '/../public')
// console.log(publicPath)



//Desta forma, tu utiliza uma foo integrada ao node que elemina o fato de ter que descer até um diretório e voltar!
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express()
let server = http.createServer(app)
//cria o web socket
let io = socketIO(server)

app.use(express.static(publicPath))

//evento onde um usuário conecta ao servidor. Utiliza conexões persistentes entre os dois!
io.on('connection', (socket) => {
	console.log('Novo usuário conectado!')

	socket.emit('newMessage', {
		from: 'Admin',	//quando é o seridor que envia a mensagem!
		text: 'Bem-Vindo ao Chat!',
		createdAt: new Date().getTime()
	})

	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'Um novo usuário juntou-se a conversa.',
		createdAt: new Date().getTime()
	})


	socket.on('createMessage', (message) => {
		console.log('Nova mensagem!', message)
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})

		//envia a mensagem para todos, menos para quem gerou o evento
		// socket.broadcast.emit('newMessage',  {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})

	socket.on('disconnect', () => {
		console.log('Usuário desconectado!')
	})
})



server.listen(port, () => {
	console.log(`Server iniciado na porta ${port}`)
})