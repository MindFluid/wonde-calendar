import React, { useState, useEffect } from 'react';
import { getEmployees, getEmployeeClasses } from '../services/teacherService';
import Calendar from './Calendar';

/**
 * The TeacherSelect component that allows users to select a teacher and displays
 * their classes in the Calendar component
 */
function TeacherSelect() {
	const [teachers, setTeachers] = useState([]);
	const [teacherClasses, setTeacherClasses] = useState([]);
	const [noDataMessage, setNoDataMessage] = useState('');

	useEffect(() => {
		async function fetchTeachers() {
			const teachers = await getEmployees();
			const sortedTeachers = [...teachers].sort((a, b) => {
				const aSurname = a.surname.toLowerCase();
				const bSurname = b.surname.toLowerCase();
				return aSurname.localeCompare(bSurname);
			});
			setTeachers(sortedTeachers);
		}
		fetchTeachers();
	}, []);


	async function handleTeacherSelect(event) {
		const teacherID = event.target.value;
		const teacherClasses = await getEmployeeClasses(teacherID);
		if (teacherClasses.length === 0) {
			setNoDataMessage('No classes found for the selected teacher.');
		} else {
			setNoDataMessage('');
		}
		setTeacherClasses(teacherClasses);
	}

	return (
		<div className="teacher-select-container">
			<label htmlFor="teacher-select-label">Select a teacher: </label>
			<select
				className="teacher-select-select"
				id="teacher-select"
				onChange={handleTeacherSelect}
				defaultValue=""
			>
				<option className="teacher-select-option" value="" disabled>
					--Please select a teacher--
				</option>
				{teachers.map(teacher => (
					<option
						className="teacher-select-option"
						key={teacher.id}
						value={teacher.id}
					>
						{teacher.title} {Array.from(teacher.forename)[0]}. {teacher.surname}
					</option>
				))}
			</select>
			{noDataMessage && <p>{noDataMessage}</p>}
			{teacherClasses.length > 0 && <Calendar classData={teacherClasses} />}
		</div>
	);
}

export default TeacherSelect;
