const db = require('../app/db.js');
const config = require('../app/config.js');
const User = db.user;
const Role = db.role;
const asyncMiddleware = require('express-async-handler');

const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.signup = asyncMiddleware(async (req, res) => {
    // Save user to database
    console.log('Processing func -> SignUp');

    const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });

    const roles = await Role.findAll({
        where: {
            name: {
                [Op.or]: req.body.roles
            }
        }
    });

    await user.setRoles(roles);

    res.status(201).send({
        status: "User registered Successfully"
    });
});


exports.signin = asyncMiddleware(async (req, res) => {
    console.log("Sign-in");

    const user = await User.findOne({
        where: {
            username: req.body.username
        }
    });

    if (!user) {
        return res.status(404).send({
            auth: false,
            accessToken: null,
            reason: "User Not Found"
        });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
        return res.status(401).send({
            auth: false,
            accessToken: null,
            reason: "Invalid Password!"
        });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
        // expire in 24 hours
        expiresIn: 86400 
    });

    res.status(200).send({
        auth: true,
        type: "Bearer",
        accessToken: token
    });
});