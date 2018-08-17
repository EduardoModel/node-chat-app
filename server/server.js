const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const {generateMessage, generateLocationMessage} = require('./utils/message.js')
const {isRealString} = require('./utils/validation.js')
const {Users} = require('./utils/users.js')

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
let users = new Users()

app.use(express.static(publicPath))

//evento onde um usuário conecta ao servidor. Utiliza conexões persistentes entre os dois!
io.on('connection', (socket) => {
	console.log('Novo usuário conectado!')

	socket.on('join', (params, callback) => {
		if(!isRealString(params.name) || !isRealString(params.room)){
			return callback('Nome e nome de sala são obrigatórios!')
		}
		//cria uma sala particular
		socket.join(params.room)
		users.removeUser(socket.id)
		users.addUser(socket.id, params.name, params.room)

		//socket.leave(room) <-  sai da sala com o nome room

		//io.emit -> io.to(room).emit
		//socket.broadcast.emit -> socket.broadcast.to(room).emit
		//socket.emit 

		io.to(params.room).emit('updateUserList', users.getUserList(params.room))

		socket.emit('newMessage', generateMessage('Admin', 'Bem-Vindo ao Chat!'))
	
		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} entrou na sala.`))


		callback()
	})

	socket.on('createMessage', (message, callback) => {
		let user = users.getUser(socket.id)

		if(user && isRealString(message.text)){
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text))
		}
		
		callback();  //'Isso é do server'
		//envia a mensagem para todos, menos para quem gerou o evento
		// socket.broadcast.emit('newMessage',  {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime()
		// })
	})

	socket.on('createLocationMessage', (coords) => {
		let user = users.getUser(socket.id)
		if(user){
			io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude))
		}
	})



	socket.on('disconnect', () => {
	let user = users.removeUser(socket.id)

	if(user){
		io.to(user.room).emit('updateUserList', users.getUserList(user.room))
		io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} saiu.`))
	}
		console.log('Usuário desconectado!')
	})
})



server.listen(port, () => {
	console.log(`Server iniciado na porta ${port}`)
})