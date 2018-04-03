import * as firebase from 'firebase'
import swal from 'sweetalert2'

export class Admin {
	private newUserPass = 'edge-reg password'
	public newUserEmail = ''
	public users: object

	public attached() {
		firebase.database().ref('/users/').on('value', this.loadUserDatas.bind(this))
	}

	private async loadUserDatas(userQ) {
		const userVals = userQ.val()
		const userKeys = Object.keys(userVals)
		const userDatas = Object.values(userVals) as any

		this.users = userKeys.map((key, i) => {
			const userDatasRow = userDatas[i]
			userDatasRow.id = key
			return userDatasRow
		})
	}

	public async addNewUser() {
		try {
			await firebase.auth().createUserWithEmailAndPassword(this.newUserEmail, this.newUserPass)
			await swal(
				'Success!',
				'New user successfully added. They have been sent an e-mail with a link to login.',
				'success',
			)
			this.newUserEmail = ''
		} catch (e) {
			swal({
				title: e.message,
				type: 'error',
			})
		}
	}

	public async adjustAdmin(user) {
		try {
			await firebase.database().ref(`/users/${user.id}`).update({ admin: !user.admin })
		} catch (e) {
			swal({
				title: e.message,
				type: 'error',
			})
		}
	}

	public async adjustTeacher(user) {
		try {
			await firebase.database().ref(`/users/${user.id}`).update({ teacher: !user.teacher })
		} catch (e) {
			swal({
				title: e.message,
				type: 'error',
			})
		}
	}
}
