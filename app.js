// require dependicies
var express = require('express');
var bodyparser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//var deviceDetect = require('device-detect') ();
var session = require('express-session');
var cookieParser = require('cookie-parser');


var User = require('./model/register');

//declare the app
var app = express();

//configure the app
app.set('port',4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//app.set('trust proxy', 1);



//set all middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret : 'keyboard cat',
    resave : false,
    saveUninitialized : true
}));


app.get('/register',function (req,res) {
    if(req.session.userID) {
        res.redirect('/nextpage');
    } else {
        res.render('register');
    }});

app.post('/register',function (req,res) {
   var user = new User({
       Name : req.body.name,
       Number : req.body.number,
       Password : req.body.password
   });
   user.save(function (err) {
       if(err) {
           console.log(err);
       }else {
           res.redirect('/login');
       }
   });
});


app.get('/login',function (req,res) {
    if(req.session.userID) {
        res.redirect('/nextpage');
    } else {
        res.render('login');
    }
});

app.post('/login',function (req,res) {
    User.findOne({Number: req.body.number , Password : req.body.password}).exec(function (err,results) {
        if(err){
            console.log("Some error occurred");
            res.send(JSON.stringify({failure : "some error occurred"}));
            res.end();
        } else {

            if(results) {
                req.session.userID = req.body.number;
                console.log("Successfully login");
               // res.send(JSON.stringify({success : "login"}));
                res.end();
            }
            res.redirect('/nextpage');
        }
    });
});


app.get('/nextpage',function (req,res) {
    console.log(req.session.userID);
    if(req.session.userID) {
        res.render('profile', {number :req.session.userID});
    } else {
        console.log("check your name or password");
        res.send(JSON.stringify({failure : "check your number or password"}));
        res.end();

    }
});

app.get('/logout',function (req,res) {
   res.render('logout');
});

app.get('/startlogout',function (req,res) {
    req.session.destroy(function (err) {
       if(err) {
           console.log(err);
       } else {
           res.redirect('/login');
       }
    });
});

app.get('/profile',function (req,res) {

    res.render('profile',{number : req.session.userID});
});







// store database
var db = 'mongodb://localhost/Test';
mongoose.connect(db,{ useMongoClient: true });
//start server
var database = mongoose.connection;
database.on('open',function () {
    console.log("database is connected");
    app.listen(app.get('port'), function () {
        console.log('server connected to http:localhost:' + app.get('port'));
    });
});
