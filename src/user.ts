import * as firebase from 'firebase'

declare global {
	interface Window { user: any, loggedInUser: any }
}
export class User {
	public loggedIn: Boolean
	public name: String
	public spouseName: String
	public address: String
	public city: String
	public zipCode: String
	public phone: String
	public email: String
	public alternateEmail: String
	public children: IChildren[]
	public householdOccupation: String
	public tutor: Boolean
	public tutorArea: String
	public publishEdgeDirectory: Boolean
	public emailSubscription: Boolean
	private database

	public constructor() {
		this.database = firebase.database()
	}

	public async syncUser(initialLoad?: boolean): Promise<boolean> {
		const currentUser = firebase.auth().currentUser
		window.user = this

		this.loggedIn = !!currentUser

		if (this.loggedIn && initialLoad) {
			const userData = await this.database.ref(`users/${currentUser.uid}`).once('value')
			const userDataVal = userData.val()

			this.name = userDataVal.name
			this.spouseName = userDataVal.spouseName
			this.address = userDataVal.address
			this.city = userDataVal.city
			this.zipCode = userDataVal.zipCode
			this.phone = userDataVal.phone
			this.email = userDataVal.email
			this.alternateEmail = userDataVal.alternateEmail
			this.children = userDataVal.children
			this.householdOccupation = userDataVal.householdOccupation
			this.tutor = userDataVal.tutor
			this.tutorArea = userDataVal.tutorArea
			this.publishEdgeDirectory = userDataVal.publishEdgeDirectory
			this.emailSubscription = userDataVal.emailSubscription
		} else if (this.loggedIn) {
			await this.database.ref(`users/${currentUser.uid}`).set(this.toJSON())
		}

		return true
	}

	public toJSON() {
		const retJson = {
			name: this.name,
			spouseName: this.spouseName,
			address: this.address,
			city: this.city,
			zipCode: this.zipCode,
			phone: this.phone,
			email: this.email,
			alternateEmail: this.alternateEmail,
			children: [ ],
			householdOccupation: this.householdOccupation,
			tutor: this.tutor,
			tutorArea: this.tutorArea,
			publishEdgeDirectory: this.publishEdgeDirectory,
			emailSubscription: this.emailSubscription,
		}
		this.children.forEach((child) => {
			retJson.children.push({
				name: child.name,
				birthDate: child.birthDate,
				homeEducated: child.homeEducated,
			})
		})

		return retJson
	}
}

interface IChildren {
	name: String
	birthDate: String
	homeEducated: Boolean
}
