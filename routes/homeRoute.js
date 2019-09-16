const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        let login = "login";
        let profile = "/employee/profile/" + req.session.user;

            res.render('home.hbs', {
            title: "Career Door",
            styles: "home.css",
            login: login,
            script: "home.js",
            profile: profile
            
        })
    }
    else {
        res.render('home.hbs',{
            title: "Career Door",
            styles: "home.css",
            script: "home.js"
        })
    }
})
module.exports = router;
