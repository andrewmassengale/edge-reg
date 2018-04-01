import * as gulp from 'gulp'
import * as filter from 'gulp-filter'
import * as merge from 'merge-stream'
import * as del from 'del'
import * as vinylPaths from 'vinyl-paths'

export default function copyFinal() {
	const copyScripts = gulp.src('./scripts/**/*')
		.pipe(gulp.dest('./dist/scripts'))

	const copyIndex = gulp.src('./index.html')
		.pipe(gulp.dest('./dist'))

	return merge(copyScripts, copyIndex)
}
