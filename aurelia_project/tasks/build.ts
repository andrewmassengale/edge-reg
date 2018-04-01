import * as gulp from 'gulp'
import {CLIOptions, build as buildCLI} from 'aurelia-cli'
import clean from './clean'
import cleanDist from './clean-dist'
import transpile from './transpile'
import processMarkup from './process-markup'
import processCSS from './process-css'
import copyFiles from './copy-files'
import watch from './watch'
import copyFinal from './copy-final'
import * as project from '../aurelia.json'

let build = gulp.series(
	readProjectConfiguration,
	clean,
	cleanDist,
	gulp.parallel(
		transpile,
		processMarkup,
		processCSS,
		copyFiles
	),
	writeBundles,
	copyFinal,
)

let main

if (CLIOptions.taskName() === 'build' && CLIOptions.hasFlag('watch')) {
	main = gulp.series(
		build,
		(done) => {
			watch(() => { /* do nothing */ })
			done()
		}
	)
} else {
	main = build
}

function readProjectConfiguration() {
	return buildCLI.src(project)
}

function writeBundles() {
	return buildCLI.dest()
}

export { main as default }
