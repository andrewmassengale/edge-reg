import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import * as firebase from 'firebase'

@inject(Router)
export class Login {
	public email
	public password

	public router

	public constructor(router: Router) {
		this.router = router
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
