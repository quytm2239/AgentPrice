const shop = require('./shop');
const htmlToJson = require('html-to-json');
module.exports = {
    getAllShop: function (keyword,completion) {
        Promise.all([
            module.exports.getTGDD(keyword),
            module.exports.getPC(keyword),
            module.exports.getFPT(keyword),
            module.exports.getTA(keyword),
            module.exports.getNCMOBILE(keyword),
            module.exports.getT1(keyword)
        ]).then(success => {
            // console.log(success[2]);
            var arrayFinal = [];
// ------------------------ I. process for TGDD shop ---------------------------
            var TGDD_DATA = success[shop.INDEX_TGDD];
            if (TGDD_DATA.names && TGDD_DATA.names.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < TGDD_DATA.names.length; i++) {
                    let mixedPrice = TGDD_DATA.prices[i].replace('Giá online:', '').replace('Giá thường:', '').trim();
                    let mixedSplit = mixedPrice.split(' ');
                    arrayTemp.push({
                        name: TGDD_DATA.names[i],
                        price: (mixedSplit.length > 1 ? mixedSplit[1] : mixedSplit[0]).replace('₫','').replace(/\./g,''),
                        sale_price: (mixedSplit.length > 1 ? mixedSplit[1] : mixedSplit[0]).replace('₫','').replace(/\./g,''),
                        online_price: (mixedSplit[0]).replace('₫','').replace(/\./g,''),
                        image: TGDD_DATA.images[i],
                        detail: TGDD_DATA.details[i],
                        supplier: 'Công ty cổ phần Thế Giới Di Động'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
// ----------------------- II. process for PICO shop ---------------------------
            var PICO_DATA = success[shop.INDEX_PC];
            if (PICO_DATA.names && PICO_DATA.names.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < PICO_DATA.names.length; i++) {
                    let priceSplit = PICO_DATA.prices[i].split('|');
                    arrayTemp.push({
                        name: PICO_DATA.names[i],
                        price: (priceSplit.length > 1 ? priceSplit[1] : priceSplit[0]).replace('₫','').replace(/\./g,''),
                        sale_price: (priceSplit[0]).replace('₫','').replace(/\./g,''),
                        online_price: (priceSplit.length > 1 ? priceSplit[1] : priceSplit[0]).replace('₫','').replace(/\./g,''),
                        image: PICO_DATA.images[i],
                        detail: PICO_DATA.details[i],
                        supplier: '© Công ty Cổ phần Pi Co.'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
// ------------------------ III. process for FPT shop --------------------------
            var FPT_DATA = success[shop.INDEX_FPTSHOP];
            if (FPT_DATA.names && FPT_DATA.names.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < FPT_DATA.names.length; i++) {
                    let mixedPrice = FPT_DATA.prices[i].replace('\r\n', '');
                    let sale_price = mixedPrice.substring(0,mixedPrice.indexOf('₫') + 1);
                    sale_price = sale_price.replace('₫','').replace(/\./g,'');
                    let price = mixedPrice.substring(mixedPrice.indexOf('₫') + 1,mixedPrice.length).trim();
                    price = price.replace('₫','').replace(/\./g,'');
                    arrayTemp.push({
                        name: FPT_DATA.names[i],
                        price: price,
                        sale_price: sale_price.length > 0 ? sale_price : price,
                        online_price: price,
                        image: FPT_DATA.images[i],
                        detail: FPT_DATA.details[i],
                        supplier: 'Công Ty Cổ Phần Bán Lẻ Kỹ Thuật Số FPT'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
// ------------------------- IV. process for TA shop ---------------------------
            var TA_DATA = success[shop.INDEX_TA];
            if (TA_DATA.names && TA_DATA.names.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < TA_DATA.names.length; i++) {
                    arrayTemp.push({
                        name: TA_DATA.names[i],
                        price: (TA_DATA.prices[i]).replace('₫','').replace(/\./g,''),
                        sale_price: (TA_DATA.prices[i]).replace('₫','').replace(/\./g,''),
                        online_price: (TA_DATA.prices[i]).replace('₫','').replace(/\./g,''),
                        image: TA_DATA.images[i],
                        detail: TA_DATA.details[i],
                        supplier: 'Công ty cổ phần Thế giới số Trần Anh'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
// ----------------------- V. process for NCMOBILE shop ------------------------
            var NCMOBILE_DATA = success[shop.INDEX_NCMOBILE];
            if (NCMOBILE_DATA.names && NCMOBILE_DATA.names.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < NCMOBILE_DATA.names.length; i++) {
                    arrayTemp.push({
                        name: NCMOBILE_DATA.names[i],
                        price: (NCMOBILE_DATA.prices[i]).replace('đ','').replace(/\./g,''),
                        sale_price: (NCMOBILE_DATA.prices[i]).replace('đ','').replace(/\./g,''),
                        online_price: (NCMOBILE_DATA.prices[i]).replace('đ','').replace(/\./g,''),
                        image: NCMOBILE_DATA.images[i],
                        detail: NCMOBILE_DATA.details[i],
                        supplier: '2016 © Nhật Cường Mobile'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
// ----------------------- VI. process for TECHONE shop ------------------------
            var T1_DATA = success[shop.INDEX_T1];
            if (T1_DATA.names && T1_DATA.names.length > 0) {
                let arrayTemp = [];
                for (let i = 0;i < T1_DATA.names.length; i++) {
                    let priceSplit = T1_DATA.prices[i].split('|');
                    arrayTemp.push({
                        name: T1_DATA.names[i],
                        price: (priceSplit.length > 1 ? priceSplit[1] : priceSplit[0]).replace('đ','').replace(/\./g,''),
                        sale_price: (priceSplit[0]).replace('đ','').replace(/\./g,''),
                        online_price: (priceSplit.length > 1 ? priceSplit[1] : priceSplit[0]).replace('đ','').replace(/\./g,''),
                        image: T1_DATA.images[i],
                        detail: T1_DATA.details[i],
                        supplier: 'Công ty TNHH TechOne Việt Nam'
                    });
                }
                arrayFinal.push(arrayTemp);
            } else {
                arrayFinal.push([]);
            }
// --------------------------------- [FINISH] ----------------------------------
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
            'prices': ['.fs-lpitem > a', function ($a) {
                return $a.find('.fs-icpri').text().split(' ').join('');
            }],
            'images': ['.fs-icimg', function ($p) {
                return 'https:' + $p.find('img').attr('src');
            }],
            'details': ['.fs-lpitem', function ($div) {
                return 'https://fptshop.com.vn' + $div.find('a').attr('href');
            }]
        }, function (err, result) {
        });
    },
    getTGDD: function (keyword) {
        let url = shop.TGDD;
        var searchUrl = url.replace('@', encodeURI(keyword));
        return htmlToJson.request(searchUrl, {
            'names': ['.listsearch > li > a > h3', function ($h3) {
                return $h3.text();
            }],
            'prices': ['.listsearch > li > a', function ($a) {
                let strong = $a.find('strong');
                return strong.text();
            }],
            'images': ['.listsearch > li > a > img', function ($img) {
                return $img.attr('src');
            }],
            'details': ['.listsearch > li > a', function ($a) {
                return 'https://www.thegioididong.com' + $a.attr('href');
            }]
        }, function (err, result) {
        });
    },
    getPC: function (keyword) {
        let url = shop.PC;
        var searchUrl = url.replace('@', encodeURI(keyword));
        return htmlToJson.request(searchUrl, {
            'names': ['.product-info > h6 > a', function ($a) {
                return $a.text();
            }],
            'prices': ['.product-info > .priceInfo', function ($div) {
                let $price = $div.find('.price');
                let $strong = $price.find('strong');
                let $old_price = $div.find('.old-price');
                if ($old_price.text() && $old_price.text().length > 0){
                    return $price.text() + '|' + $old_price.text();
                } else if ($strong.text() && $strong.text().length > 0){
                    return $strong.text();
                } else {
                    return $price.text();
                }
            }],
            'images': ['.product-image > img', function ($img) {
                return 'https:' + $img.attr('data-src');
            }],
            'details': ['.product-info > h6 > a', function ($a) {
                return $a.attr('href');
            }]
        }, function (err, result) {
        });
    },
    getNCMOBILE: function (keyword) {
        let url = shop.NCMOBILE;
        var searchUrl = url.replace('@', encodeURI(keyword));
        return htmlToJson.request(searchUrl, {
            'names': ['.item-product > .detail > h2 > a', function ($a) {
                return $a.text();
            }],
            'prices': ['.item-product > .detail > .price-buy', function ($div) {
                let $giaKM = $div.find('.gia-km');
                let $giaNY = $div.find('.price');

                if ($giaKM.text()) {
                    return $giaKM.text().replace('Giá Bán:', '').trim();
                }
                if ($giaNY.text()) {
                    return $giaNY.text().replace('Giá NY:', '').trim();
                }
                return '';
            }],
            'images': ['.item-product > a > img', function ($img) {
                return 'https://www.dienthoaididong.com' + $img.attr('src');
            }],
            'details': ['.item-product > a', function ($a) {
                return 'https://www.dienthoaididong.com' + $a.attr('href');
            }]
        }, function (err, result) {
        });
    },
    getT1: function (keyword) {
        let url = shop.T1;
        var searchUrl = url.replace('@', encodeURI(keyword));
        return htmlToJson.request(searchUrl, {
            'names': ['.lli > .lmhref > .lpro > .lmname', function ($h3) {
                return $h3.text();
            }],
            'prices': ['.lli > .lmhref > .lpro > .lprice', function ($div) {
                let $sellPrice = $div.find('.price');
                let $oldPrice = $div.find('.lspecial');

                if ($oldPrice.text()) {
                    return ($sellPrice.text() + '|' + $oldPrice.text()).trim();
                }
                if ($sellPrice.text()) {
                    return $sellPrice.text().trim();
                }
                return '';
            }],
            'images': ['.lli > .lmhref > .lpro > img', function ($img) {
                return $img.attr('src');
            }],
            'details': ['.lli > .lmhref', function ($a) {
                return $a.attr('href');
            }]
        }, function (err, result) {
        });
    }
};
