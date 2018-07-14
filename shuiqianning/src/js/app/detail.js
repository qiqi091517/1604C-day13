require(['jquery', 'render'], function($, render) {
    var url = location.search;
    console.log(url.split('?')[1].split('=')[1])

})