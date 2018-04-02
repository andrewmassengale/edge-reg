import { Aurelia } from 'aurelia-framework'
import * as firebase from 'firebase'
import environment from './environment'

const firebaseConfig = {
	apiKey: 'AIzaSyDXV3cHbXKkC4A41NApOQl4kWMuj1V_rX0',
	authDomain: 'edge-reg.firebaseapp.com',
	databaseURL: 'https://edge-reg.firebaseio.com',
	projectId: 'edge-reg',
	storageBucket: 'edge-reg.appspot.com',
	messagingSenderId: '554738011723',
}

export async function configure(aurelia: Aurelia) {
	let aureliaInit = false
	aurelia.use
		.standardConfiguration()

	if (environment.debug) {
		aurelia.use.developmentLogging()
	}

	if (environment.testing) {
		aurelia.use.plugin('aurelia-testing')
	}

	// don't start the app until firebase has determined whether or not the user is logged in
	firebase.initializeApp(firebaseConfig)
	firebase.auth().onAuthStateChanged(async (state) => {
		if (!aureliaInit) {
			await aurelia.start()
			await aurelia.setRoot('app')
			aureliaInit = true
		}
	})
}
