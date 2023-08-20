const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync");
const cssmin = require('gulp-cssmin');

const buildFiles = "./";

gulp.task("build-js", () => {
    return gulp.src("./gulp/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(buildFiles + '/js'))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
    return gulp.src("./gulp/scss/index.scss")
                .pipe(sass().on('error', sass.logError))
                .pipe(postcss([autoprefixer()]))
                .pipe(cssmin())
                .pipe(gulp.dest(buildFiles + '/css'))
                .pipe(browsersync.stream());
});

gulp.task("watch", () => {
    browsersync.init({
		server: "../../",
		port: 4000,
		notify: true
    });

    gulp.watch("./gulp/scss/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./gulp/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("build-sass", "build-js"));

gulp.task("prod", () => {
    gulp.src("./gulp/js/main.js")
        .pipe(webpack({
            mode: 'production',
            output: {
                filename: 'script.js'
            },
            module: {
                rules: [
                  {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [['@babel/preset-env', {
                            debug: false,
                            corejs: 3,
                            useBuiltIns: "usage"
                        }]]
                      }
                    }
                  }
                ]
              }
        }))
        .pipe(gulp.dest(buildFiles + '/js'));
    
    return gulp.src("./gulp/scss/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(buildFiles + '/css'));
});

gulp.task("default", gulp.parallel("watch", "build"));