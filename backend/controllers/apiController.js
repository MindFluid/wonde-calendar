const fetch = require('node-fetch');

/**
 * Handles a request to a specified URL with optional data and returns the response, or
 * throws an error with a specified message.
 * @param url - The URL of the API endpoint that the function is making a request to.
 * @param errorMsg - The `errorMsg` parameter is a string that represents the error message to be
 * thrown if an error occurs during the execution of the `handleRequest` function.
 * @param data - The `data` parameter is an optional parameter that represents the path to the specific
 * data that needs to be extracted from the response. If provided, the `getDataByPath` function will be
 * called with this parameter to extract the desired data. If not provided, the entire response will be
 * returned.
 * @returns the response data obtained from the API after processing it with the `fetchData` and
 * `getDataByPath` functions. If an error occurs during the process, the function will throw an
 * error with the specified error message.
 *
 */
async function handleRequest(url, errorMsg, data = null) {
	try {
		const headers = getApiHeaders();
		console.log(`[handleRequest] Handling request to: ${url}`);
		const responseData = await fetchData(url, headers);
		const response = getDataByPath(responseData, data);

		return response;
	} catch (error) {
		console.error(error);
		throw new Error(errorMsg);
	}
}

/**
 * Retrieves data from an object based on a given path.
 * @param obj - The `obj` parameter is an object that we want to extract data from.
 * @param path - The `path` parameter is a string that represents the path to a specific property in an
 * object. The path consists of a series of property names separated by dots, where each property name
 * represents a nested object within the main object.
 * @returns the value of the property specified by the `path`
 * parameter in the `obj` object. If the property does not exist or the `path` parameter is not
 * provided, it returns the object itself.
 *
 */
function getDataByPath(obj, path) {
	if (!path) {
		return obj;
	}

	const keys = path.split('.');
	let result = obj;

	for (const key of keys) {
		if (result && result.hasOwnProperty(key)) {
			result = result[key];
		} else {
			result = null;
			break;
		}
	}

	return result;
}

/**
 * Fetches data from a specified URL using headers and returns it as a JSON object.
 * @param url - The URL of the API endpoint that you want to fetch data from.
 * @param headers - The headers parameter is an object that contains any additional headers that need
 * to be included in the HTTP request. These headers can be used to provide additional information
 * about the request, such as authentication tokens or content types.
 * @returns a Promise that resolves to the data fetched from the
 * provided URL after making a request with the provided headers. If the request fails, the function
 * throws an error.
 *
 */
async function fetchData(url, headers) {
	const response = await fetch(url, { headers });
	if (!response.ok) {
		throw new Error('Request failed');
	}
	const data = await response.json();
	console.log(`[fetchData] fetched data`);
	return data;
}

function getApiHeaders() {
	return {
		Authorization: `Bearer ${process.env.WONDE_API_TOKEN}`
	};
}

module.exports = { handleRequest, fetchData };
