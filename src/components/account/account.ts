// node_modules
import { inject } from 'aurelia-framework'
import * as firebase from 'firebase'
import swal from 'sweetalert2'

// src
import { UserModel } from 'resources/models/UserModel'

@inject(UserModel)
export class Account {
	public email = ''
	public password = ''
	public passwordRepeat: string
	public passwordFocus: Boolean = false
	private user: UserModel

	constructor(user: UserModel) {
		this.user = user
		this.email = user.email
	}

	public async updatePassword() {
		const passwordNotExist = (this.password === '')
		const passwordMatch = (this.password === this.passwordRepeat)

		if (passwordNotExist) {
			await swal({
				title: 'You must enter a password',
				type: 'error',
			})
			this.passwordFocus = true
			return
		}
		if (!passwordMatch) {
			await swal({
				title: 'Passwords do not match',
				type: 'error',
			})
			this.password = ''
			this.passwordRepeat = ''
			this.passwordFocus = true
			return
		}

		const user = firebase.auth().currentUser
		try {
			await user.updatePassword(this.password)
			swal('Success!', 'Password successfully updated.', 'success')
		} catch (e) {
			await swal({
				title: e.message,
				type: 'error',
			})
		}
	}

	public async updateEmail() {
		const emptyEmail = (this.email === '')

		if (emptyEmail) {
			await swal({
				title: 'You must enter an Email',
				type: 'error',
			})
			return
		}

		const user = firebase.auth().currentUser
		try {
			await user.updateEmail(this.email)
			this.user.email = this.email
			await this.user.saveUser()
			swal('Success!', 'Email successfully updated.', 'success')
		} catch (e) {
			await swal({
				title: e.message,
				type: 'error',
			})
		}
	}
}
