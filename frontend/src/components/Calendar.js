import React, { useState } from 'react';
import StudentList from './StudentList';

//Set up date ranges for current working week
const currentWeekday = new Date().getDay(); // Get the current weekday (0 for Sunday, 1 for Monday, ...)
const startOfWeek = new Date(); // Get the start of the current week
const mondayOffset = 1 - currentWeekday;
startOfWeek.setDate(startOfWeek.getDate() + mondayOffset);
startOfWeek.setHours(0, 0, 0, 0);

const endOfWeek = new Date(startOfWeek);
endOfWeek.setDate(endOfWeek.getDate() + 4); // Set the end of the week to Friday
endOfWeek.setHours(23, 59, 0, 0);

/**
 * Returns a formatted time string in short style from a given date.
 * @returns The function `shortTime` returns a string representing the time portion of the given date
 * in short format, using the `toLocaleTimeString` method with the `timeStyle` option set to `'short'`.
 *
 */
const shortTime = date => {
	const time = new Date(date);
	return time.toLocaleTimeString([], { timeStyle: 'short' });
};

/**
 * returns the name of the day of the week based on the given index.
 * @returns The function `getDayName` returns the name of the day of the week corresponding to the
 * given `dayIndex`.
 *
 */
const getDayName = dayIndex => {
	const weekdays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday'
	];
	return weekdays[dayIndex];
};

const classesByDay = {
	Monday: [],
	Tuesday: [],
	Wednesday: [],
	Thursday: [],
	Friday: []
};

// Create a Set to store the unique class keys for detecting duplicate data
const uniqueClassKeys = new Set();

/**
 * The Calendar function groups and sorts classes by day of the week and displays them in a table
 * format with their corresponding start and end times.
 * @returns The `Calendar` component is returning a table that displays the teacher's schedule for the
 * current week. The table has five columns for Monday through Friday, and each column displays the
 * classes that the teacher has scheduled for that day. The classes are sorted by start time and
 * include the class name, start and end times, and a list of students enrolled in the class.
 *
 */
function Calendar({ classData }) {
	const [foldedClasses, setFoldedClasses] = useState([]);

	//Filter classData within current weekday range into 'classesByDay' object
	classData.forEach(classObj => {
		classObj.lessons.data.forEach(lesson => {
			const lessonDate = new Date(lesson.start_at.date);

			if (
				lessonDate >= startOfWeek && // Filter classes that fall within the current week
				lessonDate <= endOfWeek &&
				classesByDay[getDayName(lessonDate.getDay())]
			) {
				const classKey = `${lesson.id}-${lesson.start_at.date}`; //key for checking dupes

				if (!uniqueClassKeys.has(classKey)) {
					console.log(
						'Adding class:',
						classKey,
						'to',
						getDayName(lessonDate.getDay())
					);
					classesByDay[getDayName(lessonDate.getDay())].push({
						classObj,
						lesson
					});

					// Add the class key to the Set
					uniqueClassKeys.add(classKey);
				} else {
					console.log('Duplicate class found:', classKey, 'skipping...');
				}
			}
		});
	});

	// Sort classes by start time for each day
	Object.keys(classesByDay).forEach(day => {
		classesByDay[day].sort((a, b) => {
			const aStartTime = new Date(a.lesson.start_at.date).getTime();
			const bStartTime = new Date(b.lesson.start_at.date).getTime();
			return aStartTime - bStartTime;
		});
	});

	const toggleFoldedClass = (day, classID) => {
		const foldedKey = `${day}-${classID}`;
		if (foldedClasses.includes(foldedKey)) {
			setFoldedClasses(foldedClasses.filter(key => key !== foldedKey));
		} else {
			setFoldedClasses([...foldedClasses, foldedKey]);
		}
	};

	return (
		<div>
			<h1>Teacher Schedule</h1>
			<table>
				<thead>
					<tr>
						{Object.keys(classesByDay).map(day => (
							<th key={day}>
								{day}{' '}
								<span>
									{new Date(
										classesByDay[day][0].lesson.start_at.date
									).getDate()}
								</span>
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					<tr>
						{Object.keys(classesByDay).map((day, index) => (
							<td key={index}>
								<div className="day-column">
									{classesByDay[day].map(({ classObj, lesson }) => (
										<div
											key={lesson.id + lesson.start_at.date}
											className={`class ${
												foldedClasses.includes(`${day}-${classObj.id}`)
													? 'folded'
													: 'unfolded'
											}`}
										>
											<div
												className="class-info"
												onClick={() => toggleFoldedClass(day, classObj.id)}
											>
												<div className="class-name">{classObj.name}</div>
												<div className="class-time">
													{shortTime(lesson.start_at.date)} -{' '}
													{shortTime(lesson.end_at.date)}
												</div>
											</div>
											<StudentList classID={classObj.id} />
										</div>
									))}
								</div>
							</td>
						))}
					</tr>
				</tbody>
			</table>
		</div>
	);
}

export default Calendar;
