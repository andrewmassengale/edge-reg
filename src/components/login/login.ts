import { inject } from 'aurelia-framework'
import { Router } from 'aurelia-router'
import * as firebase from 'firebase'
import swal from 'sweetalert2'

import { UserModel } from '../../resources/models/UserModel'

@inject(Router, UserModel)
export class Login {
	public email
	public password

	public router
	public user

	public constructor(router: Router, user: UserModel) {
		this.router = router
		this.user = user
	}

	public async login() {
		try {
			await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
			this.router.navigateToRoute('home')
		} catch (e) {
			swal({
				title: e.message,
				type: 'error',
			})
		}
	}
}
