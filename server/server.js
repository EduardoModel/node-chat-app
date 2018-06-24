const path = require('path')
const express = require('express')


//Desta forma, tu utiliza uma foo integrada ao node que elemina o fato de ter que descer até um diretório e voltar!
const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
let app = express()

app.use(express.static(publicPath))


//Esta forma de acessar o diretório public é ruim, pois tu acessa a pasta server, sai dela e entra na pasta public!
// console.log(__dirname + '/../public')
// console.log(publicPath)

app.listen(port, () => {
	console.log(`Server iniciado na porta ${port}`)
})