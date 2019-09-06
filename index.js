const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = require('hbs');
const session = require('express-session');
var cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongodbUtil = require('./src/mongodbUtil');
mongodbUtil.connectToServer((err, client) => {
    if (err) {
        console.log(err);
    } 
    app.use(express.static('public'))
    app.set('view engine', 'hbs')
    app.use(bodyParser.urlencoded({ extended: true }));
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
 app.use('/employee', require('./routes/UserEmployeeRoute'));
 app.use('/review', require('./routes/ReviewRoute'))
 app.get('/',(req,res)=>{
     res.render('home.hbs',{
         title:"Career Door",
         styles:"home.css",
         script:"home.js"
     })
 })
 app.listen(PORT, function () {
        console.log("listenning on PORT", PORT)
    })
})