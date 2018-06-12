let userController = new Object(),
    userModel = require('../models/users');

userController.getAll = function (req,res,next) {
    userModel.findAllUser(function (users) {
        return res.render('users/index',{users});
    });
};

userController.showAddForm = function (req,res,next) {
    res.render('users/add-form')
};

userController.saveUser = function (req,res,next) {

    console.log(req.body.nombre)
    console.log(req.body.occupation)
    console.log(req.body.email)
    console.log(req.body.department)
    res.redirect('/users');
};

module.exports = userController;