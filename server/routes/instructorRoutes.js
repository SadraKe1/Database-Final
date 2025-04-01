const express = require('express');
const router = express.Router();
const { getAllInstructors, createInstructor, updateInstructor, deleteInstructor } = require('../controller/instructorController');

router.get('/', getAllInstructors);
router.post('/', createInstructor);
router.put('/:id', updateInstructor);
router.delete('/:id', deleteInstructor);

module.exports = router;
