const shop = require('./shop');
const htmlToJson = require('html-to-json');
module.exports = {
    getAllShop: function (keyword,completion) {
        Promise.all([
            module.exports.getTA(keyword),
            module.exports.getFPT(keyword)
        ]).then(success => {
            var arrayFinal = [];
            // 1. process for TA shop
            var namesTA = success[0].names;
            if (namesTA && namesTA.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < namesTA.length; i++) {
                    arrayTemp.push({
                        name: namesTA[i],
                        price: success[0].prices[i],
                        image: success[0].images[i],
                        detail: success[0].details[i],
                        supplier: 'Công ty cổ phần Thế giới số Trần Anh'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
            // 2. process for FPT shop
            var namesFPT = success[1].names;
            if (namesFPT && namesFPT.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < namesFPT.length; i++) {
                    var mixedPrice = success[1].prices[i].replace('\r\n', '');
                    var price = mixedPrice.substring(0,mixedPrice.indexOf('₫') + 1);
                    var old_price = mixedPrice.substring(mixedPrice.indexOf('₫') + 1,mixedPrice.length).trim();
                    arrayTemp.push({
                        name: namesFPT[i],
                        price: price,
                        old_price: old_price,
                        image: success[1].images[i],
                        detail: success[1].details[i],
                        supplier: 'Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
            completion(null,arrayFinal);
        }).catch(err => {
            console.log(err);
            completion(err,[]);
        });
    },
    getTA: function (keyword) {
        let url = shop.TA;
        var searchUrl = url.replace('@', encodeURI(keyword));
        return htmlToJson.request(searchUrl, {
            'names': ['.product-name', function ($div) {
                return $div.text().replace('\r\n', '').trim();
            }],
            'prices': ['.option-price', function ($div) {
                return $div.find('.price').text().replace('\r\n', '').trim();
            }],
            'images': ['.img-product', function ($img) {
                return $img.attr('data-original');
            }],
            'details': ['.product3', function ($a) {
                return $a.attr('href');
            }]
        }, function (err, result) {
        });
    },
    getFPT: function (keyword) {
        let url = shop.FPTSHOP;
        var searchUrl = url.replace('@', encodeURI(keyword));
        return htmlToJson.request(searchUrl, {
            'names': ['.fs-icname', function ($div) {
                return $div.text().replace('\r\n', '').trim();
            }],
            'prices': ['.fs-icpri', function ($p) {
                return $p.text().replace('\r\n', '').trim();
            }],
            'images': ['.fs-icimg', function ($p) {
                return 'https:' + $p.find('img').attr('src');
            }],
            'details': ['.fs-lpitem', function ($div) {
                return 'https://fptshop.com.vn' + $div.find('a').attr('href');
            }]
        }, function (err, result) {
        });
    }
};
