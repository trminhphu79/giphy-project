import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTPParams, HTTPResponseItems, HTTPResponseItem } from './http.model';
import { GLOBAL_SETTINGS } from '@global-settings';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private __http: HttpClient) { }

    protected getItems<T>(url: string, options?: HTTPParams) {
        let params: HTTPParams = {}
        params['api_key'] = GLOBAL_SETTINGS.apiKey;
        console.log('params...', params)
        if (options) {
            if (options.limit) {
                params['limit'] = options.limit;
            };
            if (options.rating) {
                params['rating'] = options.rating;
            };
            if (options.lang) {
                params['lang'] = options.lang;
            };
            if (options.offset) {
                params['offset'] = options.offset;
            };
            if (options.q) {
                params['q'] = options.q;
            };

            if (options.type) {
                params['type'] = options.type;
            }
            return this.__http.get<HTTPResponseItems<T>>(url, { params: params })
        } else {
            return this.__http.get<HTTPResponseItems<T>>(url);
        };
    }

    protected getItem<T>(url: string, options?: Omit<HTTPParams, '$skip' | '$top' | '$filter' | '$count' | '$orderby'>) {
        if (options) {
            return this.__http.get<HTTPResponseItem<T>>(url, { params: options });
        } else {
            return this.__http.get<HTTPResponseItem<T>>(url);
        };
    }

    protected submitItem<T>(url: string, body: T) {
        return this.__http.post(url, body, {
            params: {
                'api_key': GLOBAL_SETTINGS.apiKey
            }
        });
    }

    protected updateItem<T>(url: string, body: T) {
        return this.__http.patch(url, body);
    }

    protected deleteItem<T>(url: string) {
        return this.__http.delete(url);
    }
}
