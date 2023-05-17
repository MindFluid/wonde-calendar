import { render, screen } from '@testing-library/react';
import Calendar from './Calendar';

// Mock the StudentList component
jest.mock('./StudentList', () => {
	return {
		__esModule: true,
		default: jest.fn(() => <div data-testid="mock-student-list"></div>)
	};
});

describe('Calendar', () => {
	it('renders the Calendar component with class data', async () => {
		const classData = [
			{
				id: '123',
				name: 'Math',
				code: null,
				description: 'Mathemagic',
				subject: '9Maths',
				created_at: {
					date: '2022-09-05 14:21:57.000000'
				},
				updated_at: {
					date: '2023-04-04 06:46:31.000000'
				},
				lessons: {
					data: [
						{
							id: '888',
							start_at: {
								date: '2023-05-15 10:35:00.000000'
							},
							end_at: {
								date: '2023-05-15 11:35:00.000000'
							}
						},
						{
							id: '999',
							start_at: {
								date: '2023-05-16 08:15:00.000000'
							},
							end_at: {
								date: '2023-05-16 09:15:00.000000'
							}
						},
						{
							id: '111',
							start_at: {
								date: '2023-05-17 08:15:00.000000'
							},
							end_at: {
								date: '2023-05-17 09:15:00.000000'
							}
						},
						{
							id: '6787',
							start_at: {
								date: '2023-05-17 09:15:00.000000'
							},
							end_at: {
								date: '2023-05-17 10:15:00.000000'
							}
						}
					]
				}
			},
			{
				id: '224',
				name: 'Science',
				code: null,
				description: 'Sciencia',
				subject: '9Science',
				lessons: {
					data: [
						{
							id: '666',
							start_at: {
								date: '2023-05-18 09:15:00.000000'
							},
							end_at: {
								date: '2023-05-18 10:15:00.000000'
							}
						},
						{
							id: '555',
							start_at: {
								date: '2023-05-19 08:15:00.000000'
							},
							end_at: {
								date: '2023-05-19 09:15:00.000000'
							}
						}
					]
				}
			}
		];

		render(<Calendar classData={classData} />);

		await screen.findByText('Teacher Schedule');

		// Assert some basic render expectations
		expect(screen.getByText('Monday'));
		expect(screen.queryAllByText('Science')).toHaveLength(2);
		expect(screen.queryAllByText('Math')).toHaveLength(4);
	});
});
