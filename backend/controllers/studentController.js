const { handleRequest } = require('./apiController');

/**
 * Retrieves a list of students for a given class ID and returns it as a JSON response.
 * @param req - The request object containing information about the incoming HTTP request. It includes
 * data such as the request method, headers, URL, and parameters.
 * @param res - `res` stands for response object. It is the parameter that will be sent back to the
 * client with the requested data or an error message. It is used to send the HTTP response back to the
 * client.
 *
 */
async function getStudents(req, res) {
	try {
		const classId = req.params.classID;
		if (!classId) {
			throw new Error('No Class ID');
		}
		const url = `${process.env.WONDE_URL}/${process.env.WONDE_TEST_SCHOOL_ID}/classes/${classId}?include=students`;

		const students = await handleRequest(
			url,
			'Failed to fetch students',
			'data.students.data'
		);

		res.json(students);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Failed to fetch students' });
	}
}

module.exports = { getStudents };
