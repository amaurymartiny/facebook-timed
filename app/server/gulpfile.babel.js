/* eslint-disable import/no-extraneous-dependencies */

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import del from 'del';

const plugins = gulpLoadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**', '!coverage/**'],
  nonJs: ['./package.json', './.gitignore', './Procfile'],
  tests: './server/tests/*.js'
};

// Clean up dist and coverage directory
gulp.task('clean', () =>
  del(['dist/**', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', ['clean'], () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', ['clean'], () =>
  gulp.src([...paths.js, '!gulpfile.babel.js'], { base: '.' })
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest('dist'))
);

// Start server with restart on file changes
gulp.task('nodemon', ['copy', 'babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babel']
  })
);

// gulp serve for development
gulp.task('serve', ['nodemon']);

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', ['clean', 'copy', 'babel']);

// deploy on heroku
// IMPORTANT: heroku toolbelt needs to be installed, and logged in via heroku login
gulp.task('heroku', ['default'], plugins.shell.task([
  'git init',
  'heroku git:remote -a timed-server',
  'git commit -am "Deploy to heroku"',
  'git push --force heroku master'
], {
  cwd: 'dist/' // current working directory
}));
