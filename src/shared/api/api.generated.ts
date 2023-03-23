/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DTOOk {
    /** @example true */
    ok: boolean;
}

export interface DTOError {
    /** Error message */
    error: string;
}

export interface DTOUser {
    /**
     * @format int64
     * @example "1464363297"
     */
    id: number;
    /**
     * ID from the Telegram service
     * @format int64
     * @example "1260831881"
     */
    tg_id?: number;
    /**
     * TON wallet address
     * @example "0:97146a46acc2654y27947f14c4a4b14273e954f78bc017790b41208b0043200b"
     */
    wallet_address?: string;
    /** @example "Test" */
    first_name?: string;
    /** @example "Testov" */
    last_name?: string;
    /** @example "https://test.io/my_face.png" */
    avatar?: string;
    /**
     * @default false
     * @example false
     */
    is_ban: boolean;
    /** Authorization token */
    token?: string;
    /**
     * @format int64
     * @example 1678275313
     */
    date_create: number;
}

export interface DTOWebhook {
    /**
     * @format int64
     * @example 1
     */
    id: number;
    /**
     * @format int64
     * @example 1464363297
     */
    user_id: number;
    /**
     * @format int64
     * @example 2465363097
     */
    app_id: number;
    /** @example "http://tonapi.io/callback" */
    payload_url: string;
    /** @example "it's my secret" */
    secret: string;
    /** @example ["0:15d570f9c0c67e8e6d40f5c69be049a247dd6c0e841d31ac8dcc3edf4a57d057","0:85d570f9c0c67e8e6v40f2c69be049a217dd6c0f841d31ac8dcc3edf4a57d057"] */
    addresses?: string[];
    /** @example true */
    active: boolean;
    type_actions: 'account_event';
    /**
     * @format int64
     * @example 1678275313
     */
    date_create: number;
}

export interface DTOApp {
    /**
     * @format int64
     * @example 2465363097
     */
    id: number;
    /**
     * @format int64
     * @example 1464363297
     */
    user_id: number;
    /** @example "Test App" */
    name: string;
    /** @example "https://tonapi.io/static/test.png" */
    avatar?: string;
    app_tokens?: DTOAppToken[];
    webhooks?: DTOWebhook[];
    /** @example "https://tonapi.io/login?app=2465363097" */
    oauth_url?: string;
    /** @example false */
    is_ban: boolean;
    /** @example "firebase_creds.json" */
    firebase_filename?: string;
    /** @example true */
    enable_notifications?: boolean;
    /**
     * @format int64
     * @example 1678275313
     */
    date_create: number;
}

export interface DTOAppToken {
    /** @example 1 */
    id: number;
    /**
     * @format int64
     * @example 1464363297
     */
    user_id: number;
    /**
     * @format int64
     * @example 2465363097
     */
    app_id: number;
    tire: DTOAppTokenTire;
    /** @example "AFWRUVK5QHVRFFAAAAACNAS5QU22SHA2D4SMH3SFJOOQB5PCBU7Z7KDDWKQT5KI2YNABHBI" */
    token: string;
    /** @example false */
    is_ban: boolean;
    /** @example true */
    active: boolean;
    /**
     * @format int64
     * @example 1678275313
     */
    date_create: number;
}

export interface DTOAppTokenTire {
    /** @example "Test tire" */
    id?: string;
    /** @example 1 */
    burst: number;
    /** @example 5 */
    rpc: number;
}

import axios, {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    HeadersDefaults,
    ResponseType
} from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
    extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown>
    extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
    securityWorker?: (
        securityData: SecurityDataType | null
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

export enum ContentType {
    Json = 'application/json',
    FormData = 'multipart/form-data',
    UrlEncoded = 'application/x-www-form-urlencoded',
    Text = 'text/plain'
}

export class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({
        securityWorker,
        secure,
        format,
        ...axiosConfig
    }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || 'http://localhost:8888'
        });
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
    }

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected mergeRequestParams(
        params1: AxiosRequestConfig,
        params2?: AxiosRequestConfig
    ): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method &&
                    this.instance.defaults.headers[
                        method.toLowerCase() as keyof HeadersDefaults
                    ]) ||
                    {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {})
            }
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === 'object' && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        ...params
    }: FullRequestParams): Promise<AxiosResponse<T>> => {
        const secureParams =
            ((typeof secure === 'boolean' ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
            body = JSON.stringify(body);
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {})
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path
        });
    };
}

/**
 * @title REST API to TON Console
 * @version 0.0.1
 * @baseUrl http://localhost:8888
 * @contact Support <contact@tonaps.org>
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    v1 = {
        /**
         * @description Auth via telegram
         *
         * @tags auth
         * @name AuthViaTg
         * @request POST:/v1/auth/tg
         */
        authViaTg: (
            data: {
                /**
                 * @format int64
                 * @example "1261871881"
                 */
                id: number;
                /** @example "Test" */
                first_name?: string;
                /** @example "Testov" */
                photo_url?: string;
                /** @example "testov" */
                username?: string;
                hash: string;
                /**
                 * @format int64
                 * @example "1678275313"
                 */
                auth_date: number;
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    user: DTOUser;
                },
                DTOError
            >({
                path: `/v1/auth/tg`,
                method: 'POST',
                body: data,
                ...params
            }),

        /**
         * @description Generate payload for TON Connect
         *
         * @tags auth
         * @name AuthGeneratePayload
         * @request POST:/v1/auth/ton-proof/generate_payload
         */
        authGeneratePayload: (params: RequestParams = {}) =>
            this.request<
                {
                    payload: string;
                },
                DTOError
            >({
                path: `/v1/auth/ton-proof/generate_payload`,
                method: 'POST',
                ...params
            }),

        /**
         * @description Auth via TON Connect
         *
         * @tags auth
         * @name AuthViaTonConnect
         * @request POST:/v1/auth/ton-proof/check_proof
         */
        authViaTonConnect: (
            data: {
                /** @example "0:97146a46acc2654y27947f14c4a4b14273e954f78bc017790b41208b0043200b" */
                address: string;
                /**
                 * -3 is testnet network, -239 is mainnet network
                 * @example "-3"
                 */
                network: '-3' | '-239';
                proof: {
                    /**
                     * @format int64
                     * @example "1678275313"
                     */
                    timestamp?: number;
                    domain?: {
                        /** @format uint32 */
                        length_bytes?: number;
                        value?: string;
                    };
                    signature?: string;
                    payload?: string;
                    state_init?: string;
                };
            },
            params: RequestParams = {}
        ) =>
            this.request<
                {
                    token: string;
                },
                DTOError
            >({
                path: `/v1/auth/ton-proof/check_proof`,
                method: 'POST',
                body: data,
                ...params
            }),

        /**
         * @description Logout from the system
         *
         * @tags account
         * @name AccountLogout
         * @request POST:/v1/account/logout
         * @secure
         */
        accountLogout: (params: RequestParams = {}) =>
            this.request<DTOOk, DTOError>({
                path: `/v1/account/logout`,
                method: 'POST',
                secure: true,
                ...params
            }),

        /**
         * @description Get apps by user account
         *
         * @tags app
         * @name GetApps
         * @request GET:/v1/apps
         * @secure
         */
        getApps: (params: RequestParams = {}) =>
            this.request<
                {
                    items: DTOApp[];
                },
                DTOError
            >({
                path: `/v1/apps`,
                method: 'GET',
                secure: true,
                ...params
            }),

        /**
         * @description Create app
         *
         * @tags app
         * @name CreateApp
         * @request POST:/v1/app
         * @secure
         */
        createApp: (
            data: {
                /** @example "Test App" */
                name?: string;
                /** @example "https://tonapi.io" */
                oauth_url?: string;
                /** @format binary */
                image?: File;
            },
            params: RequestParams = {}
        ) =>
            this.request<DTOOk, DTOError>({
                path: `/v1/app`,
                method: 'POST',
                body: data,
                secure: true,
                type: ContentType.FormData,
                ...params
            }),

        /**
         * @description Delete app
         *
         * @tags app
         * @name DeleteApp
         * @request DELETE:/v1/app/{id}
         * @secure
         */
        deleteApp: (id: number, params: RequestParams = {}) =>
            this.request<DTOOk, DTOError>({
                path: `/v1/app/${id}`,
                method: 'DELETE',
                secure: true,
                ...params
            }),

        /**
         * @description Update app
         *
         * @tags app
         * @name UpdateApp
         * @request PATCH:/v1/app/{id}
         * @secure
         */
        updateApp: (
            id: number,
            data: {
                /** @example "Test App" */
                name?: string;
                /** @example true */
                enable_notifications?: boolean;
                /** @example true */
                remove_push_credentials?: boolean;
                /** @example "https://tonapi.io" */
                oauth_url?: string;
                /** @format binary */
                image?: File;
                /** @format binary */
                firebase_credentials?: File;
            },
            params: RequestParams = {}
        ) =>
            this.request<DTOOk, DTOError>({
                path: `/v1/app/${id}`,
                method: 'PATCH',
                body: data,
                secure: true,
                type: ContentType.FormData,
                ...params
            })
    };
    app = {
        /**
         * @description Generate app token
         *
         * @tags app
         * @name GenerateAppToken
         * @request POST:/app/{id}/generate
         * @secure
         */
        generateAppToken: (id: number, params: RequestParams = {}) =>
            this.request<DTOOk, DTOError>({
                path: `/app/${id}/generate`,
                method: 'POST',
                secure: true,
                ...params
            }),

        /**
         * @description Delete app token
         *
         * @tags app
         * @name DeleteAppToken
         * @request DELETE:/app/token/{id}
         * @secure
         */
        deleteAppToken: (id: number, params: RequestParams = {}) =>
            this.request<DTOOk, DTOError>({
                path: `/app/token/${id}`,
                method: 'DELETE',
                secure: true,
                ...params
            })
    };
}