import { inject } from 'aurelia-framework'
import { RouterConfiguration, Router } from 'aurelia-router'
import * as firebase from 'firebase'

import { UserModel } from './resources/models/UserModel'
import { ScheduleModel } from './resources/models/ScheduleModel'
import { LoggedIn } from './resources/authorizers/loggedIn'
import { IsAdmin } from './resources/authorizers/isAdmin'
import { HasReg } from './resources/authorizers/hasReg'

@inject(UserModel, ScheduleModel, LoggedIn, IsAdmin, HasReg)
export class App {
	public router: Router

	public user: UserModel
	public schedule: ScheduleModel
	public loggedIn: LoggedIn
	public isAdmin: IsAdmin
	public hasReg: HasReg

	public constructor(user: UserModel, schedule: ScheduleModel, loggedIn: LoggedIn, isAdmin: IsAdmin, hasReg: HasReg) {
		this.user = user
		this.schedule = schedule
		this.loggedIn = loggedIn
		this.isAdmin = isAdmin
		this.hasReg = hasReg

		firebase.auth().onAuthStateChanged(async (state) => {
			this.user.syncUser()
			this.schedule.syncSchedule()
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
			{
				route: 'schedule',
				title: 'Schedule',
				nav: true,
				name: 'schedule',
				moduleId: 'components/schedule/schedule',
				settings: { loggedIn: true },
			},
		])

		this.router = router
	}
}
