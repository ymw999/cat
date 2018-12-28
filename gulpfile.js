var gulp = require("gulp");
var webserver = require("gulp-webserver");
var path = require("path");
var fs = require("fs");
var sass = require("gulp-sass");
var url = require("url");
var clean = require("gulp-clean-css");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(clean())
        .pipe(gulp.dest("./src/css/"))
})

gulp.task("uglify", function() {
    return gulp.src("./src/js/index.js")
        .pipe(uglify())
        .pipe(concat("index.js"))
        .pipe(gulp.dest("./src/js/"))
})

gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"));
})


gulp.task("webserver", function() {
    return gulp.src("src")
        .pipe(webserver({
            port: 3000,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                var pathname = decodeURI(url.parse(req.url).pathname);
                if (pathname === "/favicon.ico") {
                    return res.end("");
                } else if (pathname === "/") {
                    res.end(fs.readFileSync(path.join(__dirname, "src", "index.html")))
                } else {
                    res.end(fs.readFileSync(path.join(__dirname, "src", pathname)));
                }
            }
        }))
})