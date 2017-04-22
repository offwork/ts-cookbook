var gulp        = require('gulp'),
    tslint      = require('gulp-tslint')
    ts          = require('gulp-typescript')
    browserify  = require('browserify')
    transfotm   = require('vinyl-transform')
    uglify      = require('gulp-uglify')
    sourcemaps  = require('gulp-sourcemaps')
    runSequence = require('run-sequence')
    Server      = require('karma').Server
    browserSync = require('browser-sync').create();

var browseried  = transfotm(function(filename) {
    var b = browserify({ entries: filename, debug: true });
    return b.bundle;
});

gulp.task('default', function(cb) {
    runSequence(
        'lint',
        ['tsc', 'tsc-tests'],
        ['bundle-js', 'bundle-test'],
        'karmaServer',
        cb
    );
});

gulp.task('lint', function() {
    return gulp.src([
        './source/ts/**/**.ts', './test/**/**.test.ts'
    ])
    .pipe(tslint({
        formatter: "verbose"
    }))
    .pipe(tslint.report());
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

gulp.task('bundle-js', function() {
    return gulp.src('./temp/source/js/main.js')
                .pipe(browseried)
                .pipe(sourcemaps.init({ loadMaps: true }))
                .pipe(uglify())
                .pipe(sourcemaps.write('./'))
                .pipe(gulp.dest('./dist/source/js/'));
});

gulp.task('bundle-test', function() {
    return gulp.src('./temp/test/**/**.test.js')
                .pipe(browseried)
                .pipe(gulp.dest('./dist/test/'));
});

gulp.task('karmaServer', function(cb) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, function(exitCode){ 
        cb();
        process.exit(exitCode); 
    }).start();
});

gulp.task('build', function(cb) {
  runSequence('lint', ['tsc', 'tsc-tests'], cb);
});


gulp.task('bundle', function(cb) {
    runSequence(
        'build',
        ['bundle-js', 'bundle-test'],
        cb
    );
});

gulp.task('test', function(cb) {
    runSequence(
        'bundle', ['karmaServer'],cb
    );
});


gulp.task('browser-sync', ['test'], function() {
  browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

  return gulp.watch([
    "./dist/source/js/**/*.js",
    "./dist/source/css/**.css",
    "./dist/test/**/**.test.js",
    "./dist/data/**/**",
    "./index.html"
  ], [browserSync.reload]);
});

gulp.task('default', ['lint', 'tsc', 'tsc-tests', 'bundle-js', 'bundle-test']);