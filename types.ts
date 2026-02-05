
export interface TimeAndPlace {
    id: string;
    executiveEducationPlanNumber: string;
    coureNumber: string;
    coureSequenceNumber: string;
    studentNumber: string;
    classWeek: string; // Binary string "111100..."
    classDay: number; // 1-7
    classSessions: number; // Start session
    campusName: string;
    teachingBuildingName: string;
    classroomName: string;
    weekDescription: string;
    continuingSession: number; // Duration
    coursePropertiesName: string;
    coureName: string;
    courseTeacher: string | null;
    sksj?: string | null;
    time?: string | null;
    xf?: string | null;
    kcm?: string | null;
}

export interface Course {
    id: {
        executiveEducationPlanNumber: string;
        coureNumber: string;
        coureSequenceNumber: string;
        studentNumber: string;
    };
    courseName: string;
    englishCourseName: string;
    unit: number;
    attendClassTeacher: string;
    coursePropertiesName: string;
    timeAndPlaceList: TimeAndPlace[];
    programPlanName: string;
    [key: string]: any;
}

export interface CourseData {
    programPlanCode: string;
    programPlanName: string;
    totalUnits: number;
    selectCourseList: Course[];
    [key: string]: any;
}

export interface ScheduleJson {
    allUnits: number;
    dateList: CourseData[];
    [key: string]: any;
}

export enum ViewMode {
    Day = 'day',
    Week = 'week'
}

export interface ProcessedSession {
    day: number;
    start: number;
    duration: number;
    courseName: string;
    classroom: string;
    teacher: string;
    weeks: string;
    color: string;
    weekDesc: string;
    raw: TimeAndPlace;
    courseRaw: Course;
}
