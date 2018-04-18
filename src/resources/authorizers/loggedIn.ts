// node_modules
import { NavigationInstruction, Next, Redirect } from 'aurelia-router'
import * as firebase from 'firebase'

export class LoggedIn {
	public run(navigationInstruction: NavigationInstruction, next: Next) {
		if (navigationInstruction.getAllInstructions().some(i => i.config.settings.loggedIn)) {
			let isLoggedIn = !!firebase.auth().currentUser
			if (!isLoggedIn) {
				return next.cancel(new Redirect('login'))
			}
		}

		return next()
	}
}
