const shop = require('./shop');
const htmlToJson = require('html-to-json');
module.exports = {
    getTA: function (keyword) {
        let url = shop.TA;
        var searchUrl = url.replace('@', keyword);
        return htmlToJson.request(searchUrl, {
            'results': ['.col-lg-2', function ($div) {
                return $div.find('.img-product').text();
            }]
            // 'results': ['.col-lg-2', function ($div) {
            //     return {
            //         image: $div.find('.img-product').attr('data-original'),
            //         name: $div.find('.product-name').text().replace('\r\n', '').trim(),
            //         prices: $div.find('.option-price').find('.price').text().replace('\r\n', '').trim(),
            //         detail_url: $div.find('.product3').attr('href'),
            //         supplier: 'Công ty cổ phần Thế giới số Trần Anh'
            //     };
            // }]
        }, function (err, result) {
            if (err) {
                return err;
            } else {
                return result;
            }
        });
    },
    getFPT: function (keyword) {
        let url = shop.FPTSHOP;
        var searchUrl = url.replace('@', keyword);
        return htmlToJson.request(searchUrl, {
            'results': ['.fs-lpitem', function ($div) {
                return {
                    image: 'https:' + $div.find('.fs-icimg').find('img').attr('src'),
                    name: $div.find('.fs-icname').text().replace('\r\n', '').trim(),
                    prices: $div.find('.fs-icpri').text().replace('\r\n', '').trim(),
                    detail_url: 'https://fptshop.com.vn' + $div.find('a').attr('href'),
                    supplier: 'Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT'
                };
            }]
        }, function (err, result) {
            if (err) {
                return err;
            } else {
                return result;
            }
        });
    }
};
