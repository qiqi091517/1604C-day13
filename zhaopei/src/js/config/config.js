require.config({
    baseUrl: '/js/',
    paths: {
        'index': './app/index',
        'render': './libs/render',
        'jquery': './app/jquery-2.1.1.min',
        'swiper': './app/swiper-4.2.2.min',
        'bscroll': './app/Bscroll.min',
        'handlebars': './app/handlebars-v4.0.11'
    }
});

require(['index']);