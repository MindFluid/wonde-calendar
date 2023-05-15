const { handleRequest } = require('./apiController');

/**
 * Fetches a list of employees/teachers from a Wonde API endpoint and returns it as a JSON
 * response.
 * @param req - The `req` parameter is an object representing the HTTP request made to the server.
 * @param res - The `res` parameter is the response object that will be sent back to the client making
 * the request.
 *
 */
async function getEmployees(req, res) {
	try {
		const url = `${process.env.WONDE_URL}/${process.env.WONDE_TEST_SCHOOL_ID}/employees?has_role=TCHR`;

		const teachers = await handleRequest(
			url,
			'Failed to fetch employees',
			'data'
		);

		res.json(teachers);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch employees' });
	}
}

async function getEmployeeClasses(req, res) {
	try {
		const employeeID = req.params.employeeID;
		const url = `${process.env.WONDE_URL}/${process.env.WONDE_TEST_SCHOOL_ID}/employees/${employeeID}?include=classes,classes.lessons,roles`;

		console.log(`[getEmployeeClasses]`);
		const classes = await handleRequest(
			url,
			'Failed to fetch employee classes',
			'data.classes.data'
		);

		res.json(classes);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch employee classes' });
	}
}

module.exports = { getEmployees, getEmployeeClasses };
