const expect = require('expect')

const {Users} = require('./users')

describe('Users', () => {

	let users

	beforeEach(() => {
		users = new Users()
		users.users = [{
			id: '1',
			name: 'Mike',
			room: 'Node Course'
		}, {
			id: '2',
			name: 'Jen',
			room: 'React Course'
		}, {
			id: '3',
			name: 'Julie',
			room: 'Node Course'
		}]
	})


	it('Deve adicionar um novo objeto user', () => {
		let users = new Users()
		let user = {
			id: '123',
			name: 'Joseph',
			room: 'Cold War'
		}
		let resUser = users.addUser(user.id, user.name, user.room)

		expect(users.users).toEqual([user])
	})

	it('Deve remover um user', () => {
		let userId = '1'
		let removedUser = users.removeUser(userId)

		expect(removedUser.id).toBe('1')
		expect(users.users.length).toBe(2)
	})

	it('Não deve remover nenhum user', () => {
		expect(users.removeUser('5')).toEqual(undefined)
	})

	it('Deve encontrar o user', () => {
		let userId = '1'
		let user = users.getUser('1')

		expect(user.id).toBe(userId)
	})

	it('Não deve encontrar o user', () => {
		expect(users.getUser('666')).toBe(undefined)
	})


	it('Deve retornar os nomes das pessoas que estão no curso de Nodejs', () => {
		let userList = users.getUserList('Node Course')

		expect(userList).toEqual(['Mike', 'Julie'])
	})

	it('Deve retornar os nomes das pessoas que estão no curso de React', () => {
		let userList = users.getUserList('React Course')

		expect(userList).toEqual(['Jen'])
	})
})