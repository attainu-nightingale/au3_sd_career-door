const dbInstance = require('../mongodbUtil').getDb();
const Review = require('../models/Review');
class ReviewMannager {
    constructor() {
        this.collectionName = "Reviews";
        this.collection = dbInstance.collection(this.collectionName);

    }
    addReview(userId, companyId, reviewHeading, description, reviewRating, callback) {

        let review = new Review(userId, companyId, reviewHeading, description, reviewRating);
        this.collection.insertOne({
            review
        }, (err, data) => {
            if (err) {
                callback(new Error("Unknown Error"));
                return
            }
            callback(null, data.insertedId);
        });
    }
    getReviewOfEmployee(userId, callback) {
        this.collection.find({
            "review.userId": userId
        }).toArray((err, data) => {
            if (err) {
                callback(err)
                return;
            }
            callback(null, data)
        })
    }

    getReviewByCompanyId(companyId, callback) {
        this.collection.find({
            "review.companyId": companyId
        }).toArray((err, reviews) => {
            if (err) {
                callback(err);
                return
            }
            callback(null, reviews)
        })
    }
}
module.exports = ReviewMannager;