import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from "axios";
import {BASE_URL} from "../util/constant";
import {sendSystemError} from "../util/response";
import {PGConfig} from "./pgConfig";
import {PGClientOptions, PGClientResponse} from "../util/type";

export class PGClient {
	private client: AxiosInstance;
	pgConfig: PGConfig;
	pgClientOptions: PGClientOptions;

	constructor(config: PGConfig) {
		this.client = axios.create();
		this.pgConfig = config;
		this.pgClientOptions = {
			path: "",
			params: "",
			headers: {},
			body: {},
		};
	}

	/**
	 * @description set path on client option
	 * @param {string} path
	 */
	setOptionPath(path: string) {
		this.pgClientOptions.path = path;
	}

	/**
	 * @description set header on client option
	 * @param {object} header
	 */
	setOptionHeaders(header: object) {
		this.pgClientOptions.headers = header;
	}

	/**
	 * @description set params on client option
	 * @param {string} param
	 */
	setOptionParams(param: string) {
		this.pgClientOptions.params = param;
	}

	/**
	 * @description set body on client option
	 * @param {object} body
	 */
	setOptionBody(body: object) {
		this.pgClientOptions.body = body;
	}

	/**
	 * @description send HTTP POST method to server
	 */
	async post<T>(): Promise<PGClientResponse<T>> {
		try {
			const url = this.getFullUrl();
			const options: AxiosRequestConfig = {
				timeout: this.pgConfig.timeout,
			};
			if (this.pgClientOptions.headers) {
				options.headers = this.pgClientOptions.headers;
			}
			const body = this.pgClientOptions.body;
			const response = await this.client.post(url, body, options);
			return response.data;
		} catch (err) {
			if (err instanceof AxiosError && err.response) {
				return err.response.data;
			}
			return sendSystemError<T>(err as Error);
		}
	}

	private getFullUrl = (): string => {
		const base = this.pgConfig.isProduction ? BASE_URL.PROD : BASE_URL.STAGE;
		const url = base + this.pgClientOptions.path + this.pgClientOptions.params;
		return url;
	};
}
