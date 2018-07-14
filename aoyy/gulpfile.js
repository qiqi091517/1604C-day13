var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var json = require('./src/js/json/data.json');

gulp.task('server', function () {
    gulp.src('src')
    .pipe(server({
        port:8066,
        middleware:function (req, res, next) {
            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico'){
                return false;
            }
            if(pathname === '/api/anis'){
                res.end(JSON.stringify({code:0, mag:json}));
            }
            pathname = pathname === '/' ? 'index.html' : pathname;
            res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
        }
    }))
})