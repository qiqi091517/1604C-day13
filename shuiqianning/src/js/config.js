require.config({
    baseUrl: '/js/',
    paths: {
        "index": "app/index",
        "jquery": "libs/jquery-3.2.1.min",
        "handlebars": "libs/handlebars-v4.0.11",
        "swiper": "libs/swiper.min",
        "bscroll": "libs/bscroll",
        "render": "common/render",
        "detail": "app/detail"
    }
})
require(['index'])