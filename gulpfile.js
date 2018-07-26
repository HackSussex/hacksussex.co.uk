var gulp = require("gulp"),
	browserify = require("browserify"),
	browserSync = require("browser-sync").create(),
	sass = require("gulp-sass"),
	notify = require("gulp-notify"),
	source = require("vinyl-source-stream"),
	rename = require("gulp-rename"),
	glob = require("glob"),
	postCSS = {
		"core": require("gulp-postcss"),
		"prefix": require("autoprefixer")
	};

gulp.task("scss", function() {
	return gulp.src("styles/style.scss")
		.pipe(
			sass(
				{
					errLogToConsole: true,
					outputStyle: "compressed"
				}
			)
			.on("error", onError)
		)
		.pipe(
			postCSS.core(
				[
					postCSS.prefix(
						{
							browsers: [
								"ie >= 9",
								"ie_mob >= 10",
								"ff >= 30",
								"chrome >= 34",
								"safari >= 7",
								"opera >= 23",
								"ios >= 7",
								"android >= 4.4",
								"bb >= 10"
							],
							cascade : false,
							remove  : true
						}
					)
				]
			)
		)
		.pipe(gulp.dest("./styles"));
});

function onError(err) {
	notify().write(err);
	this.emit("end");
}

gulp.task("browserify", function() {
	var pathStr = "./scripts/index.js";
	var files = glob.sync(pathStr);
	var b = browserify(files);

	return b.bundle()
		.pipe(source("./scripts/index.js"))
		.pipe(rename("dist.js"))
		.pipe(gulp.dest("./"));
});

gulp.task("browser-sync", function() {
	browserSync.init({
		"server": {},
		"middleware": [],
		"open": false
	});
});

gulp.task("reload", function(done) {
	browserSync.reload();
	done();
});

gulp.task("default", ["scss", "browser-sync"], function() {
	gulp.watch("./**/*.scss", ["scss"]);
	gulp.watch("./scripts/*.js", ["browserify"]);
	gulp.watch("./dist.js", ["reload"]);
	gulp.watch("./**/*.{html,css}", ["reload"]);
});