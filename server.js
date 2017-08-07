// lcxrsyc1DpYO3wJnC3ZHbrVWqimz3mRuB7CM82OIhPHGqacJlGTn3MwF3wzGEcq4
let express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    http = require('http'),
    allRoutes = require('./routes'),
    methodOverride = require('method-override'),
    app = express(),
    startServer,
    MongoClient = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017/minisprint';

app.set('port', 3000);
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});
app.post('/link-account', function (req, res) {
    allRoutes.linkAccount(req, res)
});
app.post('/import', function (req, res) {
    allRoutes.addCourses(req, res)
});
app.get('/courses', function (req, res) {
    allRoutes.getCourses(req, res)
});

db = '';

console.log("Connected correctly to server");
startServer = http.createServer(app).listen(3000, function () {
    console.log('====================listening on *:', 3000);
    MongoClient.connect(url, function (err, dba) {
        assert.equal(null, err);
        db = dba;
    });
});

