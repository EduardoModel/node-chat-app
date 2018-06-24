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
	socket.on('disconnect', () => {
		console.log('Usuário desconectado!')
	})
})



server.listen(port, () => {
	console.log(`Server iniciado na porta ${port}`)
})