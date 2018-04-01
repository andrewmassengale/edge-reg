import * as gulp from 'gulp'
import * as del from 'del'
import * as vinylPaths from 'vinyl-paths'

export default function clean() {
	return gulp.src('scripts/*')
		.pipe(vinylPaths(del))
}
