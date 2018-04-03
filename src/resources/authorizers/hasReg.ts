import { inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { NavigationInstruction, Next, Redirect } from 'aurelia-router'
import { User } from '../models/user'
import * as firebase from 'firebase'

@inject(User, EventAggregator)
export class HasReg {
	private user: User
	private ea: EventAggregator

	constructor(user: User, ea: EventAggregator) {
		this.user = user
		this.ea = ea
	}
	public async run(navigationInstruction: NavigationInstruction, next: Next) {
		const currentUser = firebase.auth().currentUser
		const isLoggedIn = !!currentUser

		if (!isLoggedIn) {
			return next()
		}
		if (!this.user.initialLoad) {
			const subscribeListen = new Promise((resolve, reject) => {
				this.ea.subscribeOnce('user_initial_load', () => {
					resolve()
				})
			})
			await subscribeListen
		}

		const regExists = !!this.user.email

		if (!regExists && navigationInstruction.config.name !== 'register') {
			return next.cancel(new Redirect('register'))
		}

		return next()
	}
}