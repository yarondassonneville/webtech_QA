var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');
var concatCss = require('gulp-concat-css');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var concat = require('gulp-concat');
var gulpPugBeautify = require('gulp-pug-beautify');

gulp.task('minify-css', function() {
  return gulp.src('css/*.css')
    .pipe(concatCss("css/everything.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function(){
    gulp.watch('./assets/css/*.css', ['minify-css'])
});

gulp.task('image', () => {
	return gulp.src('images/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('scripts', function() {
  gulp.src(['./js/script.js'])
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/'))
});