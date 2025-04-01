const express = require('express');
const router = express.Router();
const { getAllPersons, createPerson, updatePerson, deletePerson } = require('../controller/personController');

router.get('/', getAllPersons);
router.post('/add', createPerson);
router.put('/:id', updatePerson);
router.delete('/:id', deletePerson);

module.exports = router;
