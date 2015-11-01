var gulp = require('gulp');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var streamify = require('gulp-streamify');
var compressor = require('gulp-compressor');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gutil = require('gulp-util');
var exec = require('exec');
var child_process = require('child_process');
var babelify = require('babelify');
var moreCSS = require('gulp-more-css');

var path = {
  HTML: 'public/index.html',
  JS: 'public/js',
  CSS: 'public/css',
  IMAGES: 'public/images',
  MINIFIED_OUT: 'app.min.js',
  OUT: 'app.js',
  DEST: 'dist',
  DEST_DEV: 'public',
  ENTRY_POINT: './src/App.jsx'
};

gulp.task('watch', function() {
  gulp.watch(path.HTML, ['copy']);

  var watcher  = watchify(browserify({
    entries: [path.ENTRY_POINT],
    transform: [babelify],
    debug: true,
    cache: {}, packageCache: {}, fullPaths: true
  }));

  return watcher.on('update', function () {
    watcher.bundle()
      .pipe(source(path.OUT))
      .pipe(gulp.dest(path.DEST_DEV))
      console.log('Updated');
  })
    .bundle()
    .pipe(source(path.OUT))
    .pipe(gulp.dest(path.DEST_DEV));
});

gulp.task('run_server', function() {
  child_process.exec('node app.js', function(error, stdout, stderr) {
    process.stderr.write(error);
    process.stdout.write(stdout);
  });
});

gulp.task('buildapp', function(){
  browserify({
    entries: [path.ENTRY_POINT],
    // extensions: ['.js', '.jsx'],
    transform: [babelify] //, {'es6': true}]
  })
    .bundle()
    .pipe(source(path.MINIFIED_OUT))
    .pipe(streamify(uglify(path.MINIFIED_OUT).on('error', gutil.log)))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('prepareJS', function(){
  gulp.src(['public/js/*.js', '!public/js/*.min.js'])
    .pipe(compressor())
    .pipe(gulp.dest(path.DEST + '/js'));
});

gulp.task('prepareCSS', function () {
  gulp.src('public/css/*.css')
    .pipe(moreCSS())
    .pipe(gulp.dest(path.DEST + '/css'));
});

gulp.task('prepareImage', function () {
  gulp.src('public/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(path.DEST + '/images'));
});

gulp.task('build', ['replaceHTML', 'prepareJS', 'prepareCSS', 'prepareImage', 'buildapp']);
gulp.task('default', ['watch', 'run_server']);
