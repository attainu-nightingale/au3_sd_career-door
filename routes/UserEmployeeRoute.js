var express = require('express')
var router = express.Router();
const EmployeeUserManager = require('../src/DataBaseHelpers/UserEmplyoeeManager');
const EmployeeManager = require('../src/DatabaseHelpers/EmployeeManager');
const employeeUserInstance = new EmployeeUserManager();
const employeeInstance = new EmployeeManager();

router.post('/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let gender = req.body.gender;
    let email = req.body.email;
    let city = req.body.city;
    let country = req.body.country;
    if (!validateInput(username, password)) {
        res.send("Invalid input");
    }
    employeeUserInstance.createNewEmployeeUser(username, password, (err, data) => {
        if (err) {
            res.send(err.message);
            return;
        }
        let id = data
        employeeInstance.createEmployee(id, username, firstname, lastname, gender, email, city, country, (err, employData) => {
            if (err) {
                res.send(err.message);
                return
            }
            res.send("Added Sucessfully");
        })

    });
});



router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    employeeUserInstance.loginUser(username, password, (err, data) => {
        if (err) {
            res.send(err.message);
        }
       let id = data;
       console.log(id)
       
        employeeInstance.getEmployee(id, (err, employData) =>{
            if(err){
                res.send(err.message);
                return
            }
            res.send(employData);
        })
    })
});


router.get('/login', (req, res)=>{
    res.render('loginEmployee',{
        title:"Login",
        stylesheet:"loginEmployee.css"    })
})

function validateInput() {
    //validates input
    return true;
}

module.exports = router;