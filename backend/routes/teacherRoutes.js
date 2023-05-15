const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// GET /students - get all students
router.get('/', employeeController.getEmployees);

router.get('/:employeeID/classes', employeeController.getEmployeeClasses);

module.exports = router;
