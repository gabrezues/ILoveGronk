const express = require('express');
const ejs = require('ejs');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');

// Navigation

const clientPath = path.join(__dirname,'../client/');
const staticPath = path.join(clientPath,'/static/');
const viewsPath = path.join(clientPath,'/views/');

// Basic Server

const app = express();
app.use(express.static(staticPath));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    name: 'Gronk',
    secret: 'mydad',
    saveUninitialized: true,
    resave: false,
    cookie: {
        maxAge: 1000*60*60*24*3
    }
}))

app.listen(2000)

// Setting Views

app.set('view engine', 'ejs');
app.set('views',viewsPath);

// Visitor Counter

//var x = 0;

//const counter = function(req, res, next) {
//    x++;
//    console.log(x);
//    next();
//};

// Routes


app.get('/', function(req, res) {
    res.render('index', {data: req.session});
});

app.get('/Aboutme', function(req, res) {
    res.render('Aboutme', {data: req.session});
});

app.get('/blog', (req, res) => {
    res.render('blog',{data: req.session});
});

app.get('/writing', (req, res) => {
    res.render('writing',{data: req.session});
});

app.get('/blog/entry/', (req, res) => {
    res.render('entry',{data: req.session, entry: {}});
});

app.post('/welcome', (req, res) => {
    console.log(req.body)
    req.session.username = req.body.nombre;
    res.send('SUCCESS')
});

app.post('/writeblogpost', (req, res) => {
    console.log(req.body)
    res.redirect('/')
})