import React, { useEffect, useState } from 'react';
import { getStudents } from '../services/studentService';

/**
 * This component fetches and displays a list of students based on a given class ID.
 *
 */
function StudentList({ classID }) {
	const [students, setStudents] = useState([]);

	useEffect(() => {
		async function fetchStudents() {
			const students = await getStudents(classID);
			setStudents(students);
		}
		fetchStudents();
	}, [classID]);

	return (
		<ul className="student-list">
			{students.map(student => (
				<li key={student.id + classID}>
					{student.forename + ' ' + student.surname}
				</li>
			))}
		</ul>
	);
}

// nice to have: more student info. Click/hover/interact with a student element to display relevant student info
// such as medical alerts, gender, preferred name, house/rollgroup/year, emergency contact info, photo etc. Perhaps out of scope for this.

export default StudentList;
