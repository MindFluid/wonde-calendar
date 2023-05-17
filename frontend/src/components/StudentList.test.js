import { render, screen } from '@testing-library/react';
import StudentList from './StudentList';
import { getStudents } from '../services/studentService';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../services/studentService'); // Mock the studentService module

describe('StudentList', () => {
	it('renders the StudentList component with student data', async () => {
		const classID = 1;
		const mockStudents = [
			{ id: 1, forename: 'John', surname: 'Doe' },
			{ id: 2, forename: 'Jane', surname: 'Smith' }
		];

		getStudents.mockResolvedValueOnce(mockStudents); // Mock the getStudents function

		render(<StudentList classID={classID} />);

		// Wait for the students to be fetched and rendered
		await screen.findByText('John Doe');
		await screen.findByText('Jane Smith');

		// Assert the rendered student names
		expect(screen.getByText('John Doe')).toBeInTheDocument();
		expect(screen.getByText('Jane Smith')).toBeInTheDocument();
	});
});
