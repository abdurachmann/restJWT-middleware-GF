const jwt = require('jsonwebtoken');
const config = require('./app/config.js');
const db = require('./app/db.js');
const Role = db.role;
const User = db.user;

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (token.startsWith("Bearer ")) {
        // remove bearer from string
        token = token.slice(7, token.length);
    }

    if (!token) {
        return res.status(403).send({
            auth: false,
            message: "No Token provided"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if(err) {
            return res.status(500).send({
                auth: false,
                message: "fail to authentication. Error -> " + err
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                console.log(roles[i].name);
                if (roles[i].name.toUpperCase() === "ADMIN") {
                    next();
                    return;
                }
            }  
            res.status(403).send("Require Admin Role");
            return;
        });
    });
};

isPmOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if(roles[i].name.toUpperCase() === "PM") {
                    next();
                    return;
                }

                if (roles[i].name.toUpperCase() === "ADMIN") {
                    next();
                    return;
                }
            }
            res.status(403).send("Require PM or Admin Roles");
        });
    });
};

const authJwt = {};
authJwt.verifyToken = verifyToken;
authJwt.isAdmin= isAdmin;
authJwt.isPmOrAdmin = isPmOrAdmin;

module.exports = authJwt;