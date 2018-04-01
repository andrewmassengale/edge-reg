import * as gulp from 'gulp'
import * as merge from 'merge-stream'
import * as changedInPlace from 'gulp-changed-in-place'
import * as autoprefixer from 'gulp-autoprefixer'
import * as sourcemaps from 'gulp-sourcemaps'
import * as sass from 'gulp-sass'
import * as project from '../aurelia.json'
import { build } from 'aurelia-cli'

export default function processCSS() {
	const processCssTasks =  gulp.src(project.cssProcessor.source)
		.pipe(changedInPlace({ firstPass: true }))
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.pipe(autoprefixer())
		.pipe(build.bundle())

	const taskFonts = gulp.src(`${project.bootstrap.source}/fonts/**/*`)
		.pipe(changedInPlace({ firstPass: true }))
		.pipe(gulp.dest(`${project.platform.output}/fonts`))

	return merge(processCssTasks, taskFonts)
}
