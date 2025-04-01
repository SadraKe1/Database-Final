const express = require('express');
const router = express.Router();
const { getAllEnrollments, createEnrollment, updateEnrollment, deleteEnrollment } = require('../controller/enrollmentController');

router.get('/list', getAllEnrollments);
router.post('/', createEnrollment);
router.put('/:id', updateEnrollment);
router.delete('/:id', deleteEnrollment);

module.exports = router;
