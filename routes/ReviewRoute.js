const express = require('express');
const router = express.Router();
const ReviewManager = require('../src/DatabaseHelpers/ReviewsManager');
const EmployeeManager = require('../src/DatabaseHelpers/EmployeeManager');
const employeeInstance = new EmployeeManager();
const reviewInstance = new ReviewManager();

router.post('/addReview', (req, res)=>{
    if(req.session.user && req.session.loggedIn){   
    let companyId = "123333";
    let reviewHeading = req.body.reviewHeading;
     let description = req.body.description;
    let rating = req.body.rating;
    let userId = req.session.user;
    reviewInstance.addReview(userId, companyId, reviewHeading, description, rating, (err, reviewId)=>{
        if(err){
            res.send(err.message)
        }
        employeeInstance.addReviewIdInReviews(userId,reviewId, (err, data)=>{
            if (err){
                console.log("hi", data)
                res.status(500).json(new Error("unknown error"))
                return
            }
           
            res.status(201).redirect("/employee/profile/"+ userId)
        })
    })
}
});

router.get('/addReview', (req, res)=>{
    if (req.session.user && req.session.loggedIn){
        res.render('addReview.hbs', {
            title:"Add review",
            script:"addReview.js",
            styles:"addReview.css"
        })
    }
    else{
        res.redirect('/employee/login')
    }
})

router.get('/getReview/:id', (req, res)=>{
    
 let userId = req.params.id;
reviewInstance.getReviewOfEmployee(userId, (err, reviews)=>{
    if(err){
        console.log(err)
        throw err;
    }
    res.json(reviews)
})

})
module.exports = router;