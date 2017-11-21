export class User {
	public username: String
	public name: String
	public spouseName: String
	public address: String
	public city: String
	public zipCode: String
	public phone: String
	public email: String
	public alternateEmail: String
	public children: [ IChildren ]
	public householdOccupation: String
	public tutor: Boolean
	public tutorArea: String
	public publishEdgeDirectory: Boolean
	public emailSubscription: Boolean

	public constructor() {
		this.username = 'andrewmassengale'
		this.name = 'Andrew Massengale'
		this.spouseName = 'Megan Massengale'
		this.address = '429 Grace st'
		this.city = 'Bensenville'
		this.zipCode = '60106'
		this.phone = '815.614.8296'
		this.email = 'andrew.massengale@gmail.com'
		this.alternateEmail = ''
		this.children = [
			{ name: 'Bella', birthDate: '06/26/2010', homeEducated: true },
			{ name: 'Joshua', birthDate: '08/25/2012', homeEducated: true },
			{ name: 'Ava', birthDate: '03/29/2015', homeEducated: true },
		]
		this.householdOccupation = 'Web Developer'
		this.tutor = false
		this.tutorArea = ''
		this.publishEdgeDirectory = true
		this.emailSubscription = true
	}
}

interface IChildren {
	name: String
	birthDate: String
	homeEducated: Boolean
}
