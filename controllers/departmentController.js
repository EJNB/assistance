let departmentController = new Object(),
    departmentModel = require('../models/departmentRepository');

departmentController.findAll = function (req,res,next) {
    departmentModel.findAllDepartments(function (departments) {
        res.render('department/index',{departments})
    });
};

departmentController.createDepartment = function (req,res,next) {
    departmentModel.saveDepartment(req.body.department);
    res.redirect('/departments')
};

departmentController.showFormEdit = function (req,res,next) {
    departmentModel.findOneById(req.params.id,function (department) {
        if(!department) console.log("el departmento no ha sido encontrado");
        res.render('department/edit',{ department : department });
    });
};

departmentController.updateDepartment = function (req,res,next) {
    departmentModel.findByIdAndUpdate(req.params.id,req.body.department,function (department) {
        res.redirect('/departments');
    });
};

departmentController.deleteDepartment = function(req,res,next){
    departmentModel.removeDepartment(req.params.id);
    res.redirect('/departments');
};

module.exports = departmentController;