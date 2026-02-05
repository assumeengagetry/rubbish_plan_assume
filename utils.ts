import { RAW_SCHEDULE_DATA, COURSE_COLORS } from "./constants";
import { ProcessedSession } from "./types";

/**
 * Checks if a course is active in the given week number.
 * The binary string is 1-indexed conceptually but 0-indexed in JS string.
 * index 0 = Week 1.
 */
export const isClassActive = (weekBinary: string, currentWeek: number): boolean => {
    if (!weekBinary) return false;
    const index = currentWeek - 1;
    if (index < 0 || index >= weekBinary.length) return false;
    return weekBinary.charAt(index) === '1';
};

/**
 * Deterministically assigns a color to a course based on its name/ID.
 */
export const getCourseColor = (courseName: string): string => {
    if (!courseName) return COURSE_COLORS[0];
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
    
    // Safety check for empty or malformed data
    if (!RAW_SCHEDULE_DATA?.dateList?.[0]?.selectCourseList) {
        return sessions;
    }

    const courseList = RAW_SCHEDULE_DATA.dateList[0].selectCourseList;

    courseList.forEach(course => {
        if (!course.timeAndPlaceList) return;

        course.timeAndPlaceList.forEach(tp => {
            if (isClassActive(tp.classWeek, weekNumber)) {
                sessions.push({
                    day: tp.classDay || 1,
                    start: tp.classSessions || 1,
                    duration: tp.continuingSession || 2,
                    courseName: tp.coureName || 'Unknown Course',
                    classroom: tp.classroomName || 'Unknown Room',
                    teacher: (course.attendClassTeacher || '').replace('*', '').trim(),
                    weeks: tp.weekDescription || '',
                    color: getCourseColor(course.courseName || tp.coureName),
                    weekDesc: tp.weekDescription || '',
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