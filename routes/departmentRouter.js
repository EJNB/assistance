let express = require('express'),
    router = express.Router(),
    departmentController = require('../controllers/departmentController');

router.get('/',departmentController.findAll);
router.post('/',departmentController.createDepartment);
router.get('/edit/:id', departmentController.showFormEdit);
router.post('/update/:id', departmentController.updateDepartment);
router.delete('/delete/:id');

module.exports = router;