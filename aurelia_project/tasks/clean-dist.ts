import * as gulp from 'gulp'
import * as del from 'del'
import * as vinylPaths from 'vinyl-paths'

export default function cleanDist() {
	return gulp.src('dist/*')
		.pipe(vinylPaths(del))
}
