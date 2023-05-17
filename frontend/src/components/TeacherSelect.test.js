import { render, screen, fireEvent } from '@testing-library/react';
import { getEmployees, getEmployeeClasses } from '../services/teacherService';
import TeacherSelect from './TeacherSelect';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/teacherService'); // Mock the teacherService module

describe('TeacherSelect', () => {
	beforeEach(() => {
		fetchMock.resetMocks();
	});

	it('renders the TeacherSelect component and handles teacher selection', async () => {
		const mockEmployees = [
			{ id: 1, title: 'Mr', forename: 'John', surname: 'Doe' },
			{ id: 2, title: 'Mrs', forename: 'Jane', surname: 'Smith' }
		];

		getEmployees.mockImplementation(() => Promise.resolve(mockEmployees)); // Mock the getEmployees function

		render(<TeacherSelect />);

		// Wait for the employees to be fetched and rendered
		await screen.findByLabelText('Select a teacher:');

		// Assert the rendered teachers
		for (const teacher of mockEmployees) {
			const displayName = `${teacher.title} ${
				Array.from(teacher.forename)[0]
			}. ${teacher.surname}`;
			expect(screen.getByText(displayName)).toBeInTheDocument();
		}
	});

	it('displays no data message when no classes are found for the selected teacher', async () => {
		const mockEmployees = [
			{ id: 1, title: 'Mr', forename: 'John', surname: 'Doe' },
			{ id: 2, title: 'Mrs', forename: 'Jane', surname: 'Smith' }
		];

		getEmployees.mockResolvedValueOnce(mockEmployees); // Mock the getEmployees function
		getEmployeeClasses.mockResolvedValueOnce([]); // Mock the getEmployeeClasses function with an empty array

		render(<TeacherSelect />);

		// Wait for the employees to be fetched and rendered
		await screen.findByLabelText('Select a teacher:');

		// Simulate selecting a teacher
		const selectElement = screen.getByLabelText('Select a teacher:');
		fireEvent.change(selectElement, { target: { value: '1' } });

		// Wait for the no data message to be rendered
		await screen.findByText('No classes found for the selected teacher.');

		expect(
			screen.getByText('No classes found for the selected teacher.')
		).toBeInTheDocument();
	});
});
