const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongodbUtil = require('./src/mongodbUtil');
hbs.registerHelper('is', function (parameter, string, options) {
    if (parameter == string) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }
})
app.use(express.static('public'))
app.set('view engine', 'hbs')


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));
mongodbUtil.connectToServer((err, client) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
  
    app.use('/employee', require('./routes/UserEmployeeRoute'));
    app.use('/review', require('./routes/ReviewRoute'));
    app.use('/company', require('./routes/CompanyRoute'))
    app.use('/', require('./routes/homeRoute'))

    app.listen(port, function () {
        console.log("listenning on PORT", port)
    })
})