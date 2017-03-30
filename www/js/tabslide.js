var geraslider = (function () {
    "use strict";
    return {
        slide: (function (data1, data2) {
            var swiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',

                effect: 'coverflow',
                initialSlide: 1,
                paginationClickable: true,
                coverflow: {
                    rotate: 0,
                    stretch: 0,
                    depth: 0,
                    modifier: 1,
                    slideShadows: false
                }
            });
        })
    };
}());