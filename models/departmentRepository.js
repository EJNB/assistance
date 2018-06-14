let Department = require('./models').departmentModel,
    departmentRepository = new Object();

departmentRepository.findAllDepartments = function (cb) {
    Department.find().sort('name').exec(function (err,departments) {
        err ? console.log(err) : cb(departments);
    });
};

departmentRepository.saveDepartment = function (department_name) {
    let department = new Department({
        name : department_name,
    });
    department.save(function (err,department) {
        err ? console.log(err) : console.log('El departamento ha sido insetado con exito');
    });
};

departmentRepository.findOneById = function (id,cb) {
    Department.findById(id,function (err,department) {
        err ? console.log(err) : cb(department);
    });
};

departmentRepository.findByIdAndUpdate = function (id,department_name,cb) {
    Department.findByIdAndUpdate(id,{ name : department_name },function (err,department) {
        err ? console.log(err) : cb(department);
    });
};

departmentRepository.removeDepartment = function(id){
    Department.findByIdAndRemove(id,function (err) {
        err ? console.log(err) : console.log('The department has been deleted successfully');
    });
};

module.exports = departmentRepository;