import { Home } from '../../src/components/home'

describe ('home component', () => {
	it ('inits home component', () => {
		// definitions
		const home = new Home()

		// assertions
		expect(home.message).toEqual(jasmine.any(String))
		expect(home.message).toBe('Hello World!')
	})
})
