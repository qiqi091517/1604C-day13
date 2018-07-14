var gulp = require('gulp');
var server = require('gulp-webserver');
var scss = require('gulp-sass');

var listData = require('./mork/list.json');
var detailData = require('./mork/detail.json');
var url = require('url');
var path = require('path');
var fs = require('fs');

gulp.task('server', ['devscss'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, msg: listData }));
                } else if (pathname === '/api/detail') {
                    var key = url.parse(req.url, true).query.id;
                    var arr = [];
                    var target = detailData.data.forEach(function(file) {
                        if (file.id == key) {
                            console.log(file)
                            arr.push(file)
                        }
                    })
                    console.log(arr);
                    res.end(JSON.stringify({ code: 1, data: arr }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
});

gulp.task('devscss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
        .pipe(gulp.dest('./src/css'))
});

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['devscss'])
});

gulp.task('dev', ['watch', 'server']);