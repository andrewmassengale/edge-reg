import { Aurelia } from 'aurelia-framework'
import environment from './environment'

export async function configure(aurelia: Aurelia) {
	aurelia.use
		.standardConfiguration()
		.globalResources('bootstrap/css/bootstrap.css')
		.feature('resources')

	if (environment.debug) {
		aurelia.use.developmentLogging()
	}

	if (environment.testing) {
		aurelia.use.plugin('aurelia-testing')
	}

	await aurelia.start()
	await aurelia.setRoot('app')
}
