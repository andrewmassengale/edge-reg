import { RouterConfiguration, Router } from 'aurelia-router'

export class App {
	public router: Router

	public configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Edge Registration'
		config.options.pushState = true
		config.options.root = '/'
		config.map([
			{ route: '', title: 'Home', nav: true, name: 'home', moduleId: 'components/home' },
			{ route: 'login', title: 'Login', nav: true, name: 'login', moduleId: 'components/login' },
		])

		this.router = router
	}
}
