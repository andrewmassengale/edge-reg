import { inject } from 'aurelia-framework'
import { RouterConfiguration, Router } from 'aurelia-router'
import * as firebase from 'firebase'

import { User } from './user'
import { Auth } from './auth'

@inject(User, Auth)
export class App {
	public router: Router

	private readonly componentsFolder = 'components'
	private readonly firebaseConfig = {
		apiKey: 'AIzaSyDXV3cHbXKkC4A41NApOQl4kWMuj1V_rX0',
		authDomain: 'edge-reg.firebaseapp.com',
		databaseURL: 'https://edge-reg.firebaseio.com',
		projectId: 'edge-reg',
		storageBucket: 'edge-reg.appspot.com',
		messagingSenderId: '554738011723',
	}
	private user: User
	private auth: Auth

	public constructor(user: User, auth: Auth) {
		this.user = user
		this.auth = auth
		firebase.initializeApp(this.firebaseConfig)
	}

	public configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Edge Registration'
		config.addAuthorizeStep(this.auth)
		config.options.pushState = true
		config.options.root = '/'
		config.map([
			{ route: 'login', title: 'Login', name: 'login', moduleId: `${this.componentsFolder}/login` },

			{ route: '', title: 'Home', nav: true, name: 'home', moduleId: `${this.componentsFolder}/home`, settings: { auth: true } },
			{ route: 'register', title: 'Registration', nav: true, name: 'register', moduleId: `${this.componentsFolder}/register`, settings: { auth: true }  },
		])

		this.router = router
	}
}
