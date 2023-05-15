const SERVER = process.env.REACT_APP_SERVER_URL;

// Cache data using Maps
const employeeCache = new Map();
const employeeClassesCache = new Map();

export const getEmployees = async () => {
	console.log('[getEmployees]');

	if (employeeCache.size > 0) {
		console.log('[getEmployeeClasses] Returning data from employee cache');
		return Array.from(employeeCache.values());
	}

	try {
		const response = await fetch(`${SERVER}/employees`);
		const data = await response.json();
		employeeCache.clear(); // Clear existing cache
		data.forEach(employee => {
			employeeCache.set(employee.id, employee); // Cache individual employee
		});
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch employees');
	}
};

export const getEmployeeClasses = async employeeID => {
	console.log('[getEmployeeClasses]');

	if (employeeClassesCache.has(employeeID)) {
		console.log(
			'[getEmployeeClasses] Returning data from employee class cache'
		);
		return employeeClassesCache.get(employeeID);
	}

	try {
		const response = await fetch(`${SERVER}/employees/${employeeID}/classes`);
		const data = await response.json();
		employeeClassesCache.set(employeeID, data); // Cache employee classes
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch employee classes');
	}
};
