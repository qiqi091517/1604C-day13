// 引入

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    gulp = require('gulp'),
    server = require('gulp-webserver'),
    mySwiper = JSON.parse(fs.readFileSync('./src/moke/mySwiper.json')),
    data = JSON.parse(fs.readFileSync('./src/moke/data.json'));

// 服务

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            open: true,
            middleware: function(req, res, next) {

                var obj = url.parse(req.url, true),
                    query = obj.quiery,
                    pathName = obj.pathname;
                if (pathName === '/favicon.ico') {
                    return;
                }
                if (pathName === '/api/list') {
                    res.end(JSON.stringify(data[0].data));
                } else if (pathName === '/api/mySwiper') {
                    res.end(JSON.stringify(mySwiper[0].swiper));
                } else {
                    pathName = pathName === '/' ? '/index.html' : pathName;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathName)));
                }
            }
        }))
});