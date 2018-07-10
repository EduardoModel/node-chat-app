const expect = require('expect')
let {generateMessage, generateLocationMessage} = require('./message.js')

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

describe('generateLocationMessage', () => {
	it('Deve gerar o objeto de localização de forma correta', () => {
		let from = 'John'
		let latitude = -31.7774134
		let longitude = -52.3320814
		let url = `https://www.google.com/maps?q=${latitude},${longitude}`


		let resp = generateLocationMessage(from, latitude, longitude)

		expect(typeof resp.createdAt).toBe('number')
		expect(resp).toMatchObject({
			from,
			url
		})

	})	
})