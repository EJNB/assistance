let express = require('express'),
    router = express.Router(),
    reportController = require('../controllers/reports');

router.get('/',reportController.getAll);

module.exports = router;