import { inject } from 'aurelia-framework'
import { RouterConfiguration, Router } from 'aurelia-router'
import * as firebase from 'firebase'

import { User } from './user'
import { Auth } from './auth'

@inject(User, Auth)
export class App {
	public router: Router

	private user: User
	private auth: Auth

	public constructor(user: User, auth: Auth) {
		this.user = user
		this.auth = auth
	}

	public logout() {
		firebase.auth().signOut()
		this.router.navigateToRoute('login')
	}

	public configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Edge Registration'
		config.options.pushState = true
		config.options.root = '/'

		config.addAuthorizeStep(this.auth)

		config.map([
			{ route: 'login', title: 'Login', name: 'login', moduleId: 'components/login' },
			{ route: 'create-account', title: 'Create Account', name: 'createaccount', moduleId: 'components/create-account' },

			{ route: '', title: 'Home', nav: true, name: 'home', moduleId: 'components/home', settings: { auth: true } },
			{ route: 'register', title: 'Registration', nav: true, name: 'register', moduleId: 'components/register', settings: { auth: true }  },
		])

		this.router = router
	}
}
