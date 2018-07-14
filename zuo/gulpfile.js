var gulp = require('gulp');
var server = require('gulp-webserver');
var fs = require('fs');
var url = require('url');
var path = require('path');
var swiperjson = require('./moke/swiper.json');
var list = require('./moke/list.json')
gulp.task('default', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {
                var obj = url.parse(req.url, true),
                    pathname = obj.pathname,
                    query = obj.query;
                if (pathname === '/favicon.ico') {
                    return
                }
                if (pathname === '/api/swiper') {
                    res.end(JSON.stringify({ code: 1, data: swiperjson }))
                } else if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, data: list }))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})