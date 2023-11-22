import { type HttpAdapter } from '../interfaces/http-adapter.interface';
export declare class AxiosAdapter implements HttpAdapter {
    private readonly axios;
    get<T>(url: string): Promise<T>;
}
