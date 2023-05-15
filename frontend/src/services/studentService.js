const SERVER = process.env.REACT_APP_SERVER_URL;

// Cache data using a Map
const studentCache = new Map();

export const getStudents = async classID => {
	console.log('[getStudents]');

	if (studentCache.has(classID)) {
		console.log('[getStudents] Returning data from studentCache');
		return studentCache.get(classID);
	}

	try {
		const response = await fetch(`${SERVER}/students/${classID}/classes`);
		const data = await response.json();
		studentCache.set(classID, data); // Cache student data
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch students');
	}
};
