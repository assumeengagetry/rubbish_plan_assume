import { RAW_SCHEDULE_DATA, COURSE_COLORS } from "./constants";
import { ProcessedSession } from "./types";

/**
 * Checks if a course is active in the given week number.
 * The binary string is 1-indexed conceptually but 0-indexed in JS string.
 * index 0 = Week 1.
 */
export const isClassActive = (weekBinary: string, currentWeek: number): boolean => {
    const index = currentWeek - 1;
    if (index < 0 || index >= weekBinary.length) return false;
    return weekBinary.charAt(index) === '1';
};

/**
 * Deterministically assigns a color to a course based on its name/ID.
 */
export const getCourseColor = (courseName: string): string => {
    let hash = 0;
    for (let i = 0; i < courseName.length; i++) {
        hash = courseName.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % COURSE_COLORS.length;
    return COURSE_COLORS[index];
};

/**
 * Flattens the nested JSON structure into a list of renderable session blocks for the current week.
 */
export const getSessionsForWeek = (weekNumber: number): ProcessedSession[] => {
    const sessions: ProcessedSession[] = [];
    const courseList = RAW_SCHEDULE_DATA.dateList[0].selectCourseList;

    courseList.forEach(course => {
        course.timeAndPlaceList.forEach(tp => {
            if (isClassActive(tp.classWeek, weekNumber)) {
                sessions.push({
                    day: tp.classDay,
                    start: tp.classSessions,
                    duration: tp.continuingSession,
                    courseName: tp.coureName,
                    classroom: tp.classroomName,
                    teacher: course.attendClassTeacher.replace('*', '').trim(),
                    weeks: tp.weekDescription,
                    color: getCourseColor(course.courseName),
                    weekDesc: tp.weekDescription,
                    raw: tp,
                    courseRaw: course
                });
            }
        });
    });

    return sessions;
};

/**
 * Get sessions for a specific day in a specific week.
 */
export const getSessionsForDay = (weekNumber: number, dayNumber: number): ProcessedSession[] => {
    return getSessionsForWeek(weekNumber)
        .filter(s => s.day === dayNumber)
        .sort((a, b) => a.start - b.start);
};
