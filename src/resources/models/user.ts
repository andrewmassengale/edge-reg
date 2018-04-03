import { inject } from 'aurelia-framework'
import { EventAggregator } from 'aurelia-event-aggregator'
import * as firebase from 'firebase'

declare global {
	interface Window { user: any, loggedInUser: any }
}

@inject(EventAggregator)
export class User {
	public initialLoad: Boolean = false

	public loggedIn: Boolean = false
	public admin: Boolean = false
	public teacher: Boolean = false
	public name: string
	public spouseName: string
	public address: string
	public city: string
	public zipCode: string
	public phone: string
	public email: string
	public alternateEmail: string
	public children: IChildren[]
	public householdOccupation: string
	public tutor: Boolean
	public tutorArea: string
	public publishEdgeDirectory: Boolean
	public emailSubscription: Boolean

	private database
	private ea: EventAggregator
	private userListener
	private initialLoadWaiting: Boolean = false

	public constructor(ea: EventAggregator) {
		this.ea = ea
		this.database = firebase.database()
	}

	public async syncUser(): Promise<boolean> {
		const currentUser = firebase.auth().currentUser
		window.user = this

		this.loggedIn = !!currentUser

		if (this.loggedIn) {
			this.userListener = this.database.ref(`users/${currentUser.uid}`)
			this.initialLoadWaiting = true
			this.userListener.on('value', this.syncUserChangesFromFirebase.bind(this))
		}

		return true
	}

	public async saveUser(): Promise<boolean> {
		const currentUser = firebase.auth().currentUser
		await this.database.ref(`users/${currentUser.uid}`).set(this.toJSON())
		return true
	}

	public stopSync() {
		if (this.userListener) {
			this.userListener.off()

			this.admin = false
		}
	}

	public toJSON() {
		const retJson = {
			name: this.name,
			admin: this.admin,
			teacher: this.teacher,
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

	private syncUserChangesFromFirebase(userSnapshot) {
		const userVals = userSnapshot.val()

		this.admin = !!userVals.admin
		this.teacher = !!userVals.teacher
		this.name = userVals.name
		this.spouseName = userVals.spouseName
		this.address = userVals.address
		this.city = userVals.city
		this.zipCode = userVals.zipCode
		this.phone = userVals.phone
		this.email = userVals.email
		this.alternateEmail = userVals.alternateEmail
		this.children = userVals.children
		this.householdOccupation = userVals.householdOccupation
		this.tutor = userVals.tutor
		this.tutorArea = userVals.tutorArea
		this.publishEdgeDirectory = !!userVals.publishEdgeDirectory
		this.emailSubscription = !!userVals.emailSubscription

		if (this.initialLoadWaiting) {
			this.initialLoadWaiting = false
			this.initialLoad = true
			this.ea.publish('user_initial_load')
		}
	}
}

interface IChildren {
	name: String
	birthDate: String
	homeEducated: Boolean
}
