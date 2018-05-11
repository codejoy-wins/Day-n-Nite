const express = require("express");
const app = express();

var session = require("express-session");
var bodyParser = require("body-parser");

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    secret: 'keyboardkitteh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000},
}))

app.get('/', function(req, res){
    req.session['name'] = 'max';
    req.session['rando'] = Math.floor((Math.random()* 100));
    res.render('index', {panther: req.session['rando']});
})

app.post('/process', function(req, res){
    console.log("req dat body",req.body);
    console.log("wreck dat sesh",req.session);
    console.log(req.body.number);
    if (req.body.number < req.session['rando']){
        res.redirect('/low');
    }
    else if (req.body.number > req.session['rando']){
        res.redirect('/high');
    }
    else if(req.body.number == req.session['rando']){
        res.redirect('/win');
    }
    else{
        res.redirect('/');
    }
    
})

app.get('/high', function(req, res){
    res.render('high', {panther: req.session['rando']});
})

app.get('/low', function(req, res){
    res.render('low', {panther: req.session['rando']});
})

app.get('/win', function(req, res){
    res.render('win', {panther: req.session['rando']});
})

app.get('/reset', function(req, res){
    // req.session.destroy();
    //changes
    res.redirect('/');
})


app.listen(8000, function(){
    console.log('Listening on port 8000');
})