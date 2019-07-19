var vk2tubmlr = function ($) {

    var elements = []

    function parseAttrs() {
        if (elements.length > 0) {
            elements.each(index => {
                el = $(elements[index]);
                let paramLink = el.attr('albumLink').trim();
                let paramSize = el.attr('photoSize').trim();
                let paramOwner = paramLink.substring(paramLink.indexOf('album') + 5, paramLink.indexOf('_'));
                let paramAlbum = paramLink.substring(paramLink.indexOf('_') + 1, paramLink.length);
                if (paramSize.length > 0 && paramOwner.length > 0 && paramAlbum.length > 0) {
                    $.ajax({
                        type: 'GET',
                        url: "/photos",
                        async: false,
                        contentType: 'application/json',
                        data: {
                            o: paramOwner,
                            a: paramAlbum,
                            s: paramSize
                        },
                        success: function (response) {
                            el.empty();
                            response.forEach(photoUnprocessed => {
                                let img = $('<img src="' + photoUnprocessed[0] + '" alt="">');
                                el.append(img);
                            })

                        },
                        error: function (error) {
                            console.error('vk2tumblr:', error.responseJSON.message);
                        }
                    });
                }
                else console.error('vk2tumblr: not enought arguments in div-object. Learn more here: ')
            });
        }
    }

    function init() {
        elements = $('.vk2tumblr')
        parseAttrs();
    }

    return {
        init: init
    }
}(jQuery);

$(document).ready(function () {
    console.log('vk2tubmlr loaded');
});