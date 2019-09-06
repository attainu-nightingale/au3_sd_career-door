const dbInstance = require('../mongodbUtil').getDb();
const Employee = require('../models/Employee');
var ObjectId = require('mongodb').ObjectID
class EmployeeManager {
    constructor() {
        this.collectionName = "Employee";
        this.collection = dbInstance.collection(this.collectionName);
    }
    createEmployee(id, username, firstname, lastname, gender, email, city, country, callback) {
        let employee = new Employee(id, firstname, lastname, username, gender, email, city, country);
        this.collection.insertOne({
            employee
        }, (err, data) => {
            if (err) {
                callback(new Error("Unknown Error"));
                return;
            }
            callback(null, data);
            return
        })
    }
    getEmployee(id, callback) {
        id = new ObjectId(id);
        this.collection.findOne({
            "employee.id": id
        }, (err, data) => {
            if (err) {
                callback(new Error("Unknown error"));
                return
            }
            callback(null, data.employee);
        })
    }
    addReviewIdInReviews(userId, reviewId, callback){
        this.collection.updateOne({"employee.id": new ObjectId(userId)},{
            $push:{"employee.reviews":reviewId}
        }, (err, data)=>{
            if (err){
                callback(new Error("unsucessful"));
                return
            }
            callback(null, data)
        })
    }
}
module.exports = EmployeeManager;