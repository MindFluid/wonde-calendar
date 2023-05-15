const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /students - get all students
router.get('/:classID/classes', studentController.getStudents);

module.exports = router;
