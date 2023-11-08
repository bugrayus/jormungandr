/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type LessonStudentResponseModel = {
    id?: string;
    studentId?: string;
    studentUserName?: string | null;
    lessonId?: string;
    lessonName?: string | null;
    midterm?: number | null;
    final?: number | null;
    makeup?: number | null;
};
