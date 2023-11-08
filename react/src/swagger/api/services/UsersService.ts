/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicationUserResponseModel } from '../models/ApplicationUserResponseModel';
import type { CreateUserModel } from '../models/CreateUserModel';
import type { CreateUserResponseModel } from '../models/CreateUserResponseModel';
import type { LoginResponseModel } from '../models/LoginResponseModel';
import type { LoginUserModel } from '../models/LoginUserModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @param requestBody 
     * @returns CreateUserResponseModel Success
     * @throws ApiError
     */
    public static postApiUsers(
requestBody?: CreateUserModel,
): CancelablePromise<CreateUserResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns ApplicationUserResponseModel Success
     * @throws ApiError
     */
    public static getApiUsers(): CancelablePromise<Array<ApplicationUserResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users',
        });
    }

    /**
     * @param requestBody 
     * @returns LoginResponseModel Success
     * @throws ApiError
     */
    public static postApiUsersAuthenticate(
requestBody?: LoginUserModel,
): CancelablePromise<LoginResponseModel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/users/authenticate',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param role 
     * @returns ApplicationUserResponseModel Success
     * @throws ApiError
     */
    public static getApiUsersByRole(
role?: string,
): CancelablePromise<Array<ApplicationUserResponseModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/users/by-role',
            query: {
                'role': role,
            },
        });
    }

    /**
     * @param id 
     * @returns boolean Success
     * @throws ApiError
     */
    public static deleteApiUsers(
id: string,
): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/users/{id}',
            path: {
                'id': id,
            },
        });
    }

}
