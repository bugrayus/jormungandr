/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseResponseModel } from '../models/BaseResponseModel';
import type { CreateLessonModel } from '../models/CreateLessonModel';
import type { CreateLessonResponseModel } from '../models/CreateLessonResponseModel';
import type { LessonResponseModel } from '../models/LessonResponseModel';
import type { UpdateLessonModel } from '../models/UpdateLessonModel';
import type { UpdateLessonResponseModel } from '../models/UpdateLessonResponseModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class LessonService {

    /**
     * @returns LessonResponseModel Success
     * @throws ApiError
     */
    public static getApiLessons(): CancelablePromise<Array<LessonResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lessons',
        });
    }

    /**
     * @param requestBody 
     * @returns CreateLessonResponseModel Success
     * @throws ApiError
     */
    public static postApiLessons(
requestBody?: CreateLessonModel,
): CancelablePromise<CreateLessonResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/lessons',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @param requestBody 
     * @returns UpdateLessonResponseModel Success
     * @throws ApiError
     */
    public static putApiLessons(
id: string,
requestBody?: UpdateLessonModel,
): CancelablePromise<UpdateLessonResponseModel> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/lessons/{id}',
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
    public static deleteApiLessons(
id: string,
): CancelablePromise<BaseResponseModel> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/lessons/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns LessonResponseModel Success
     * @throws ApiError
     */
    public static getApiLessons1(
id: string,
): CancelablePromise<LessonResponseModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lessons/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @returns LessonResponseModel Success
     * @throws ApiError
     */
    public static getApiLessonsByUser(): CancelablePromise<Array<LessonResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/lessons/by-user',
        });
    }

}
