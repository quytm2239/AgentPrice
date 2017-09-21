const shop = require('./shop');
module.exports = {
    getTA: function (keyword,success,fail) {
        let url = shop.TA;
        const htmlToJson = require('html-to-json');
        var searchUrl = url.replace('@', keyword);
        var promise = htmlToJson.request(searchUrl, {
            'results': ['.col-lg-2', function ($div) {
                return {
                    image: $div.find('.img-product').attr('data-original'),
                    name: $div.find('.product-name').text().replace('\r\n', '').trim(),
                    prices: $div.find('.option-price').find('.price').text().replace('\r\n', '').trim(),
                    detail_url: $div.find('.product3').attr('href'),
                    supplier: 'Công ty cổ phần Thế giới số Trần Anh'
                };
            }]
        }, function (err, result) {
            // console.log(result);
            if (err) {
              fail(err);
            }
        });

        promise.done(function (result) {
            //Works as well
            // console.log(result);
            success(result);
        });
    }
    // getTA: function (keyword,success,fail) {
    //     let url = shop.TA;
    //     httpsSearch(url,keyword,success,fail);
    // },
    // getTA: function (keyword,success,fail) {
    //     let url = shop.TA;
    //     httpsSearch(url,keyword,success,fail);
    // },
    // getTA: function (keyword,success,fail) {
    //     let url = shop.TA;
    //     httpsSearch(url,keyword,success,fail);
    // }
};

// function httpsSearch(url,keyword,success,fail) {
//     const htmlToJson = require('html-to-json');
//     var searchUrl = url.replace('@', keyword);
//     var promise = htmlToJson.request(searchUrl + keyword, {
//         'results': ['.col-lg-2', function ($div) {
//             return {
//                 image: $div.find('.img-product').attr('data-original'),
//                 name: $div.find('.product-name').text().replace('\r\n', '').trim(),
//                 prices: $div.find('.option-price').find('.price').text().replace('\r\n', '').trim(),
//                 detail_url: $div.find('.product3').attr('href')
//             };
//         }]
//     }, function (err, result) {
//         // console.log(result);
//         if (err) {
//           fail(err);
//         }
//     });
//
//     promise.done(function (result) {
//         //Works as well
//         console.log(result);
//         success(result);
//     });
// }
