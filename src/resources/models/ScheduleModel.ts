import * as firebase from 'firebase'

// tslint:disable-next-line:no-namespace
declare global {
	// tslint:disable-next-line:interface-name
	interface Window { schedule: any }
}

interface IScheduleItem {
	timeslot: string,
	info?: IScheduleItemInfo,
}

interface IScheduleItemInfo {
	edtiable: boolean
	name: string
	classes: Array<any>
}

export class ScheduleModel {
	private database

	public schedule: Array<IScheduleItem> = [
		{ timeslot: '9:30am - 10:20am' },
		{ timeslot: '10:25am - 11:15am' },
		{ timeslot: '11:20am - 11:50am' },
		{ timeslot: '11:55am - 12:30pm' },
		{ timeslot: '12:35pm - 1:25pm' },
		{ timeslot: '1:30pm - 2:20pm' },
	]

	private scheduleListener

	constructor() {
		window.schedule = this
		this.database = firebase.database()
	}

	public async syncSchedule() {
		this.scheduleListener = this.database.ref(`schedule`)
		this.scheduleListener.on('value', this.syncScheduleChangesFromFirebase.bind(this))
	}

	private syncScheduleChangesFromFirebase(scheduleSnapshot) {
		const scheduleVals = scheduleSnapshot.val()

		this.schedule.map((scheduleItem) => {
			const scheduleKey = scheduleItem.timeslot

			if (scheduleVals[scheduleKey]) {
				scheduleItem.info = scheduleVals[scheduleKey]
			}

			return scheduleItem
		})
	}
}
