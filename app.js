var express = require('express');
var bodyParser = require('body-parser');
var config = require('./server/config');
var async = require('async');

var User = require('./models/User');

var app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/',function (req,res) {

    var user = new User(
        {
            username: 'akarsh',
            password: 'abc'
        }
    );

    res.send('we are done');
    res.end();

});

app.get('/test',function (req, res) {

    async.parallel(
        [
            function (callback) {
                var name = {first_name: "akarsh", last_name: "sachdeva"};
                callback(null,name);
            },
            function (callback) {
                var education = {year: "2017", course: "Btech"};
                callback(null,education);
            },
            function (callback) {
                var skills = ['none','none','none'];
                callback(null,skills);
            }
        ],
        function (err, results) {

            if(err)
            {
                console.log('you hatched up');
                res.send('oops');
                res.end();
                return;
            }

            var data =
                {
                    "personal" : results[0],
                    "education" : results[1],
                    "skills" : results[2]
                };

            res.send(JSON.stringify(data));
            res.end();
            return;
        }
    );

});


app.get('/series',function (req, res) {

    async.series(
        [
            function (callback) {
                var name = {first_name: "akarsh", last_name: "sachdeva"};
                callback(null,name);
            },
            function (callback) {
                var education = {year: "2017", course: "Btech"};
                callback(null,education);
            },
            function (callback) {
                var skills = ['none','none','none'];
                callback(null,skills);
            }
        ],
        function (err, results) {

            if(err)
            {
                console.log('you hatched up');
                res.send('oops');
                res.end();
                return;
            }

            var data =
                {
                    "personal" : results[0],
                    "education" : results[1],
                    "skills" : results[2]
                };

            res.send(JSON.stringify(data));
            res.end();
            return;
        }
    );

});

app = config(app);

app.listen(2000,function () {
    console.log('server started');
});