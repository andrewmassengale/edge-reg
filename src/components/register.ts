import { inject } from 'aurelia-framework'

import { User } from '../user'

@inject(User)
export class Register {
	private message: string
	private user: User

	constructor(user: User) {
		this.user = user
		this.message = 'Registration Page!'
	}
}
