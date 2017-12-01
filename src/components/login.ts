import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import * as firebase from 'firebase'

import { User } from '../user'

@inject(Router, User)
export class Login {
	public email
	public password

	public router
	public user

	public constructor(router: Router, user: User) {
		this.router = router
		this.user = user
	}

	public login() {
		firebase.auth().signInWithEmailAndPassword(this.email, this.password)
			.then((a) => {
				this.router.navigateToRoute('home')
			})
			.catch((e) => {
				alert('invalid login')
			})
	}
}
