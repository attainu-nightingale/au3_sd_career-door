const express = require('express');
const router = express.Router();
const ReviewManager = require('../src/DatabaseHelpers/ReviewsManager');
const EmployeeManager = require('../src/DatabaseHelpers/EmployeeManager');
const CompanyManager = require('../src/DatabaseHelpers/CompanyManager');
const employeeInstance = new EmployeeManager();
const reviewInstance = new ReviewManager();
const companyInstance = new CompanyManager();

router.post('/addReview', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        let companyId = req.session.companyId;
        let reviewHeading = req.body.reviewHeading;
        let description = req.body.description;
        let rating = req.body.rating;
        let userId = req.session.user;
        reviewInstance.addReview(userId, companyId, reviewHeading, description, rating, (err, reviewId) => {
            if (err) {
                res.send(err.message)
            }
            employeeInstance.addReviewIdInReviews(userId, reviewId, (err, data) => {
                if (err) {
                    res.status(500).json(new Error("unknown error"))
                    return
                }
            })

            companyInstance.addReviewIdInCompany(companyId, reviewId, (err, company) => {
                if (err) {
                    res.status(500).json(new Error("unknown error"))
                    return
                }
                res.status(201).redirect("/company/" + companyId);
            })
        })
    }
});

router.get('/addReview/:companyId', (req, res) => {
    if (req.session.user && req.session.loggedIn) {
        req.session.companyId = req.params.companyId;
        res.render('addReview.hbs', {
            title: "Add review",
            login: "login",
            profile: "/employee/profile/" + req.session.user,
            script: "addReview.js",
            styles: "addReview.css"
        })
    } else {
        res.redirect('/employee/login')
    }
})


module.exports = router;