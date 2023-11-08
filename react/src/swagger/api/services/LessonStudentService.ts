/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseModel } from '../models/BaseResponseModel';
import type { CreateLessonStudentModel } from '../models/CreateLessonStudentModel';
import type { CreateLessonStudentResponseModel } from '../models/CreateLessonStudentResponseModel';
import type { LessonStudentResponseModel } from '../models/LessonStudentResponseModel';
import type { UpdateLessonStudentModel } from '../models/UpdateLessonStudentModel';
import type { UpdateLessonStudentResponseModel } from '../models/UpdateLessonStudentResponseModel';
import type { UpdateLessonStudentScoreModel } from '../models/UpdateLessonStudentScoreModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonStudentService {

    /**
     * @returns LessonStudentResponseModel Success
     * @throws ApiError
     */
    public static getApiLessonStudents(): CancelablePromise<Array<LessonStudentResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson-students',
        });
    }

    /**
     * @param requestBody 
     * @returns CreateLessonStudentResponseModel Success
     * @throws ApiError
     */
    public static postApiLessonStudents(
requestBody?: CreateLessonStudentModel,
): CancelablePromise<CreateLessonStudentResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/lesson-students',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns UpdateLessonStudentResponseModel Success
     * @throws ApiError
     */
    public static putApiLessonStudents(
id: string,
requestBody?: UpdateLessonStudentModel,
): CancelablePromise<UpdateLessonStudentResponseModel> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/lesson-students/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns BaseResponseModel Success
     * @throws ApiError
     */
    public static deleteApiLessonStudents(
id: string,
): CancelablePromise<BaseResponseModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/lesson-students/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns LessonStudentResponseModel Success
     * @throws ApiError
     */
    public static getApiLessonStudents1(
id: string,
): CancelablePromise<LessonStudentResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson-students/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns UpdateLessonStudentResponseModel Success
     * @throws ApiError
     */
    public static putApiLessonStudentsScore(
id: string,
requestBody?: UpdateLessonStudentScoreModel,
): CancelablePromise<UpdateLessonStudentResponseModel> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/lesson-students/{id}/score',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns LessonStudentResponseModel Success
     * @throws ApiError
     */
    public static getApiLessonStudentsByUser(): CancelablePromise<Array<LessonStudentResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson-students/by-user',
        });
    }

    /**
     * @param lessonId 
     * @returns LessonStudentResponseModel Success
     * @throws ApiError
     */
    public static getApiLessonStudentsByLesson(
lessonId: string,
): CancelablePromise<Array<LessonStudentResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lesson-students/by-lesson/{lessonId}',
            path: {
                'lessonId': lessonId,
            },
        });
    }

}
