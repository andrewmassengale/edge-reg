import { inject, bindable } from 'aurelia-framework'
import { RouterConfiguration, Router } from 'aurelia-router'
import * as firebase from 'firebase'

import { User } from './resources/models/user'
import { LoggedIn } from './resources/authorizers/loggedIn'
import { IsAdmin } from './resources/authorizers/isAdmin'
import { HasReg } from './resources/authorizers/hasReg'

@inject(User, LoggedIn, IsAdmin, HasReg)
export class App {
	public router: Router

	@bindable public user: User
	public loggedIn: LoggedIn
	public isAdmin: IsAdmin
	public hasReg: HasReg

	public constructor(user: User, loggedIn: LoggedIn, isAdmin: IsAdmin, hasReg: HasReg) {
		this.user = user
		this.loggedIn = loggedIn
		this.isAdmin = isAdmin
		this.hasReg = hasReg

		firebase.auth().onAuthStateChanged(async (state) => {
			this.user.syncUser()
		})
	}

	public logout() {
		firebase.auth().signOut()
		this.user.stopSync()
		this.router.navigateToRoute('login')
	}

	public configureRouter(config: RouterConfiguration, router: Router) {
		config.title = 'Edge Registration'
		config.options.pushState = true
		config.options.root = '/'

		config.addAuthorizeStep(this.hasReg)
		config.addAuthorizeStep(this.loggedIn)
		config.addAuthorizeStep(this.isAdmin)

		config.map([
			{
				route: 'login',
				title: 'Login',
				name: 'login',
				moduleId: 'components/login/login',
			},
			{
				route: 'create-account',
				title: 'Create Account',
				name: 'createaccount',
				moduleId: 'components/create-account/create-account',
			},
			{
				route: 'account',
				title: 'Manage Account',
				name: 'account',
				moduleId: 'components/account/account',
				settings: { loggedIn: true },
			},
			{
				route: 'admin',
				title: 'Edge Reg Admin',
				name: 'admin',
				moduleId: 'components/admin/admin',
				settings: { isAdmin: true },
			},
			{
				route: '',
				title: 'Home',
				nav: true,
				name: 'home',
				moduleId: 'components/home/home',
				settings: { loggedIn: true },
			},
			{
				route: 'register',
				title: 'Registration',
				nav: true,
				name: 'register',
				moduleId: 'components/register/register',
				settings: { loggedIn: true },
			},
		])

		this.router = router
	}
}
