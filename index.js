var rootDir = __dirname;
var express = require('express')
var app = express()
var server = require('http').createServer(app)
var bodyParser = require('body-parser')
var morgan = require('morgan')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// app.use(morgan('dev'))
require('./filelogger')(app,morgan)

// redirect to [right] route
app.use(function(req, res, next) {
   if(req.url.substr(-1) == '/' && req.url.length > 1)
       res.redirect(301, req.url.slice(0, -1));
   else
       next();
});

const detect_content = require('./detect_content');
app.get('/compare',function (req,res) {
    var keyword = req.query.keyword;
    if (keyword && keyword.length > 0){

        Promise.all([
            detect_content.getTA(keyword),
            detect_content.getFPT(keyword)
        ]).then(success => {
            res.status(200).send([
            {
                message: 'Tìm thấy '+success[0].results.length+ ' phù hợp với từ khoá: '+keyword,
                results: success[0].results
            },
            {
                message: 'Tìm thấy '+success[1].results.length+ ' phù hợp với từ khoá: '+keyword,
                results: success[1].results
            }
            ]);
        }).catch(err => {
            console.log(err);
        });


        // detect_content.getTA(keyword,
        // function(success) {
        //     console.log(success);
        //     res.status(200).send({
        //         message: 'Tìm thấy '+success.results.length+ ' phù hợp với từ khoá: '+keyword,
        //         results: success.results
        //     });
        // },
        // function(err) {
        //     res.status(500).send(err);
        // });
    } else {
        res.status(400).send({
            message: 'Tìm thấy 0 phù hợp với từ khoá: '+keyword,
            results: []
        });
    }
});

server.listen(process.env.PORT || 9090, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env)
});
