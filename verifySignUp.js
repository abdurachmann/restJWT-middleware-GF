const db = require('./app/db.js');
const config = require('./app/config.js');
const ROLEs = config.ROLEs;
const User = db.user;

checkDuplicateUserNameOrEmail = (req, res, next) => {
    // check username is already in use
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.status(400).send("Fail -> Username is already taken!");
            return;
        }

        // check email is already in use
        User.findOne({
            where: {
                email: req.body.email
            }
        }).then(user => {
            if(user) {
                res.status(400).send("Fail => Email is already taken");
                return;
            }
            next();
        });
    });
} 

checkRolesExisted = (req, res, next) => {
    for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLEs.includes(req.body.roles[i].toUpperCase())) {
            res.status(400).send("Fail -> Does Not Exist Role = " + req.body.roles[i]);
            return;
        }
    }
    next();
}

const signUpVerify = {};
signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
signUpVerify.checkRolesExisted = checkRolesExisted;

module.exports = signUpVerify;