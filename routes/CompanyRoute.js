const express = require('express');
const router = express.Router();
const CompanyManager = require('../src/DatabaseHelpers/CompanyManager');
let companyInstance = new CompanyManager();
const ReviewManager = require('../src/DatabaseHelpers/ReviewsManager');
const reviewInstance = new ReviewManager();


router.post('/register', (req, res) => {

    let companyName = req.body.companyName;
    let owns = req.body.owns;
    let department = req.body.department;
    let website = req.body.website;
    let numberOfEmployee = req.body.numberOfEmployee;
    let logo = req.body.logo;
    let city = req.body.city;
    let country = req.body.country;
    companyInstance.addCompany(companyName, owns, website, department, numberOfEmployee, logo, city, country, (err, data) => {
        if (err) {
            res.status(500).send({
                Error: err.message
            })
            return;
        }
        res.json({
            Success: data
        });
    })
})
router.get('/register', (req, res) => {
    console.log("hi")
    res.render('companyRegister.hbs', {
        title: "Register Company",
        styles: "companyRegister.hbs",
        script: "companyRegister.js"
    })
})
router.get('/all', (req, res) => {
    companyInstance.getAllCompany((err, data) => {
        if (err) {
            res.status.json({
                "Error": err.message
            });
            return;
        }
        res.json(data)
    })
})

router.get('/', (req, res) => {
    res.render('companies.hbs', {
        title: "Company",
        styles: "companies.css",
        script: "companies.js"
    })
});

router.get('/:companyId', (req, res) => {
    let companyId = req.params.companyId;
    let reviews = [];
    companyInstance.getCompanyById(companyId, (err, company) => {
        if (err) {
            res.status(404).send(err.message);
            return;
        }

        reviewInstance.getReviewByCompanyId(companyId, (err, reviews) => {
            if (err) {
                res.send(err);
                return;
            }
            let AverageRating;
            if(reviews){
               
            
            let TotalRating = reviews.map(review => Number(review.review.reviewRating)).reduce((acc, curr, index, array) => {
                acc += curr
                return acc;
            })
             AverageRating = TotalRating / reviews.length
        }
            res.status(201).render('company.hbs', {
                title: company.companyName,
                styles: "company.css",
                script: "company.js",
                company: company,
                companyId: companyId,
                reviews: reviews,
                AverageRating: AverageRating
            })


        })


    });


})

module.exports = router;