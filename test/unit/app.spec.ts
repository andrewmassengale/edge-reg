import { App } from '../../src/app'

describe('app router', () => {
	it('inits router', () => {
		// definitions
		const app = new App()

		// assertions
		expect(app.configureRouter).toEqual(jasmine.any(Function))
	})
})
