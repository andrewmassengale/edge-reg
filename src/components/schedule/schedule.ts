import { inject } from 'aurelia-framework'
import swal from 'sweetalert2'

import { UserModel } from '../../resources/models/UserModel'
import { ScheduleModel } from '../../resources/models/ScheduleModel'

@inject(UserModel, ScheduleModel)
export class Schedule {
	private user: UserModel
	private schedule: ScheduleModel

	constructor(user: UserModel, schedule: ScheduleModel) {
		this.user = user
		this.schedule = schedule

		// firebase.database().ref('schedule').set({
		// 	'9:30am - 10:20am': {
		// 		'editable': true,
		// 		'name': 'First Period',
		// 		'classes': [ ],
		// 	},
		// 	'10:25am - 11:15am': {
		// 		'editable': true,
		// 		'name': 'Second Period',
		// 		'classes': [],
		// 	},
		// 	'11:20am - 11:50am': {
		// 		'editable': false,
		// 		'name': 'Assembly',
		// 	},
		// 	'11:55am - 12:30pm': {
		// 		'editable': false,
		// 		'name': 'Lunch',
		// 	},
		// 	'12:35pm - 1:25pm': {
		// 		'editable': true,
		// 		'name': 'Third Period',
		// 		'classes': [],
		// 	},
		// 	'1:30pm - 2:20pm': {
		// 		'editable': true,
		// 		'name': 'Fourth Period',
		// 		'classes': [],
		// 	},
		// })
	}
}
