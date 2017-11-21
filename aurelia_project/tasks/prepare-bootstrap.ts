import * as gulp from 'gulp'
import * as merge from 'merge-stream'
import * as changedInPlace from 'gulp-changed-in-place'
import * as project from '../aurelia.json'

export default function prepareBootstrap() {
	const taskCss = gulp.src(`${project.bootstrap.source}/css/bootstrap.min.css`)
		.pipe(changedInPlace({ firstPass: true }))
		.pipe(gulp.dest(`${project.platform.output}/css`))

	const taskFonts = gulp.src(`${project.bootstrap.source}/fonts/*`)
		.pipe(changedInPlace({ firstPass: true }))
		.pipe(gulp.dest(`${project.platform.output}/fonts`))

	return merge(taskCss, taskFonts)
}
