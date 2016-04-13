var gulp = require('gulp');
var eslint = require('gulp-eslint');
var notify = require('gulp-notify');
var buffer = require('gulp-buffer');
var babelify = require('babelify');
var browserify = require('browserify');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var webserver = require('gulp-webserver');

var errHandler = function(){
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  this.emit('end');
};

var eslintNotice = function(arg){
  gulp.src(arg.match(/^.+\.js/)[0])
    .pipe(notify(arg));
};

gulp.task('eslint', function(){
    gulp.src('./src/**/*.js')
      .pipe(eslint())
      .pipe(eslint.formatEach.bind(this)('compact', eslintNotice));
});

gulp.task('build', function () {
  browserify(
        { entries: ['./src/index.js'],
          extensions: ['.js'],
          debug: true
        })
    .plugin('licensify')
    .transform(babelify, {presets: ["es2015"]})
    .bundle()
    .on('error', errHandler)
    .pipe(source('337.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./js'))
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .on('error', errHandler)
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('./js'));
});

gulp.task('server', function(){
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      https: true,
      open: false
    }));
});

gulp.task('watch',['server'], function(){
  gulp.watch('./src/*.js',['build', 'eslint']);
  gulp.watch('./src/**/*.js',['build', 'eslint']);
});

gulp.task('default', ['build', 'watch', 'server']);
