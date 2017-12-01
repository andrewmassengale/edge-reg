export class CreateAccount {
	public name
	public email
	public password
	public passwordRepeat

	public createAccount() {
		console.log(this.name, this.email, this.password, this.passwordRepeat)
	}
}
