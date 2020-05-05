const db = require('../app/db.js');
const User = db.user;
const Role = db.role;
const asyncMiddleware = require("express-async-handler");

exports.users = asyncMiddleware(async (req, res) => {
    const user = await User.findAll({
        attributes: ['name', 'username', 'email'],
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['userId', 'roleId']
                }
            }
        ]
    });
    res.status(200).json({
        description: 'All user',
        user: user
    });
});

exports.userContent = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.userId },
        attributes: ['name', 'username', 'email'],
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['userId', 'roleId']
                }
            }
        ]
    });
    res.status(200).send({
        description: 'User Content Page',
        user: user
    });
});

exports.adminBoard = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.userId },
        attributes: ["name", "username", "email"],
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['userId', 'roleId']
                }      
            }
        ]
    });
    res.status(200).send({
        description: 'Admin Board',
        user: user
    });
});

exports.managementBoard = asyncMiddleware(async (req, res) => {
    const user = await User.findOne({
        where: { id: req.userId },
        attributes: ["name", "username", "email"],
        include: [
            {
                model: Role,
                attributes: ['id', 'name'],
                through: {
                    attributes: ['userId', 'roleId']
                }      
            }
        ]
    });
    res.status(200).send({
        description: 'Management Board',
        user: user
    });
});