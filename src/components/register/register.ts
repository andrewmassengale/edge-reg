// node_modules
import { inject } from 'aurelia-framework'
import swal from 'sweetalert2'

// src
import { UserModel } from 'resources/models/UserModel'

@inject(UserModel)
export class Register {
	private user: UserModel

	constructor(user: UserModel) {
		this.user = user
	}

	public dateKeyPress(e: KeyboardEvent) {
		const elm = e.target as HTMLInputElement

		if (e.keyCode < 47 || e.keyCode > 57) {
			e.preventDefault()
		}

		const len = elm.value.length

		// If we're at a particular place, let the user type the slash
		// i.e., 12/12/1212
		if (len === 4 || len === 6) {
			if (e.keyCode === 111) {
				elm.value = elm.value.substring(0, elm.value.length - 1)
			}
		}

		// If they don't add the slash, do it for them...
		if (len === 2) {
			elm.value += '/'
		}

		// If they don't add the slash, do it for them...
		if (len === 5) {
			elm.value += '/'
		}

		return true
	}

	public async submitRegForm() {
		const successfulSync = await this.user.saveUser()

		if (successfulSync) {
			swal('Success!', 'Registration form successfully saved.', 'success')
		}
	}

	public async addChild() {
		this.user.children.push({
			name: '',
			birthDate: '',
			homeEducated: true,
		})
	}

	public async removeChild(index: number) {
		if (this.user.children[index]) {
			const confirm = await swal({
				title: 'Are you sure?',
				text: 'Removing a child is permanent and cannot be undone!',
				type: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete!',
			})
			if (confirm.value) {
				this.user.children.splice(index, 1)
			}
		} else {
			swal({
				title: 'Invalid child index',
				type: 'error',
			})
		}
	}
}
