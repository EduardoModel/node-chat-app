let expect = require('expect')

let {isRealString} = require('./validation.js')

describe('isRealString', () => {
	it('Deve rejeitar objetos que não são strings', () => {
		let nonStr = 42
		expect(isRealString(nonStr)).toBe(false)
	})

	it('Deve rejeitar uma string contendo somente espaços', () => {
		expect(isRealString('          ')).toBe(false)
	})

	it('Deve permitir uma strig que não contenha espaços passar no teste', () => {
		expect(isRealString('Teste 123')).toBe(true)
	})
})