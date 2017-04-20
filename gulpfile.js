var gulp        = require('gulp'),
    tslint      = require('gulp-tslint')
    ts          = require('gulp-typescript');

gulp.task('default', function() {
    console.log('Hello Gulp!');
});

gulp.task('lint', function() {
    return gulp.src([
        './source/ts/**/**.ts', './test/**/**.test.ts'
    ])
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report())
});

gulp.task('tsc', function() {
    return gulp.src('./source/ts/**/**.ts')
                .pipe(ts({
                    removeComments : true,
                    noImplicitAny : true,
                    target : 'ES3',
                    module : 'commonjs',
                    declarationFiles : false
                }))
                .pipe(gulp.dest('./temp/source/js'));
});

gulp.task('tsc-tests', function() {
    return gulp.src('./test/**/**.test.ts')
                .pipe(ts({
                    removeComments : true,
                    noImplicitAny : true,
                    target : 'ES3',
                    module : 'commonjs',
                    declarationFiles : false
                }))
                .pipe(gulp.dest('./temp/source/js'));
});

gulp.task('default', ['lint', 'tsc', 'tsc-tests']);