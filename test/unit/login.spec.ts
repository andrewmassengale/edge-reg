import { Login } from '../../src/components/login'

describe ('login component', () => {
	it ('inits login component', () => {
		// definitions
		const login = new Login()

		// assertions
		expect(login.message).toEqual(jasmine.any(String))
		expect(login.message).toBe('Hello world!!!')
	})
})
