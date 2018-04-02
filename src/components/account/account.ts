import * as firebase from 'firebase'
import swal from 'sweetalert2'

export class Account {
	public password = ''
	public passwordRepeat: string
	public passwordFocus: Boolean = false

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
}
