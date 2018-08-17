// [{
// 	id: ,
// 	name: ,
// 	room: 
// }]

//Método de add -> addUser(id, name, room)
//Método de remove -> removeUser(id)
//Método de procurar um usuário -> getUser(id)
//Método de buscar uma lista de usuários -> getUserList(room)

//ES6 class

class Users {
	constructor () {
		this.users  = []
	}

	addUser (id, name, room) {
		let user = {id, name, room}
		this.users.push(user)
		return user
	}

	removeUser (id) {
		let user = this.getUser(id)
		if(user){
			this.users = this.users.filter((user) => user.id !== id)
		}

		return user
	}

	getUser (id) {
		return this.users.filter((user) => user.id === id)[0]
	}

	getUserList (room) {
		//O método filter faz uma operação sobre cada elemento do vetor, por isso tu passa
		//o user como parâmetro do filtro
		let users = this.users.filter((user) => user.room === room)
		//Retorna um array com os nomes dos usuários contidos na sala filtrada previamente
		let namesArray = users.map((user) => user.name)

		return namesArray
	}
}



module.exports = {Users}



//para classes usa a primeira letra como maíusculo
// class Person{
// 	//Construtor
// 	constructor (name, age) {
// 		//A palavra reservada this se refere a instância do objeto criado!
// 		this.name = name
// 		this.age = age
// 	}
// 	getUserDescription () {
// 		return `${this.name} is ${this.age} year(s) old.`
// 	}
// }

// //Para criar um novo objeto da classe Person
// let me = new Person('Wololo', 23)

// console.log(me.getUserDescription())