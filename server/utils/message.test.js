const expect = require('expect')
let {generateMessage} = require('./message.js')

describe('generateMessage', () => {
	it('Deve gerar o objeto da mensagem de forma correta', () => {
		let from = 'Mike'
		let text = 'Algo a ser testado'
		let resp = generateMessage(from, text)

		expect(typeof resp.createdAt).toBe('number')
		expect(resp).toMatchObject({
			from,
			text
		})
	})
})