import { inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import { NavigationInstruction, Next, Redirect } from 'aurelia-router'
import * as firebase from 'firebase'
import { User } from '../models/user'

@inject(User, EventAggregator)
export class IsAdmin {
	private user: User
	private ea: EventAggregator

	constructor(user: User, ea: EventAggregator) {
		this.user = user
		this.ea = ea
	}

	public async run(navigationInstruction: NavigationInstruction, next: Next) {
		if (navigationInstruction.getAllInstructions().some(i => i.config.settings.isAdmin)) {
			const currentUser = firebase.auth().currentUser
			const isLoggedIn = !!currentUser

			if (!isLoggedIn) {
				return next.cancel(new Redirect('login'))
			}

			if (!this.user.initialLoad) {
				const subscribeListen = new Promise((resolve, reject) => {
					this.ea.subscribeOnce('user_initial_load', () => {
						resolve()
					})
				})
				await subscribeListen
			}

			const isAdmin = !!this.user.admin

			if (!isAdmin) {
				return next.cancel(new Redirect(''))
			}
		}

		return next()
	}
}
