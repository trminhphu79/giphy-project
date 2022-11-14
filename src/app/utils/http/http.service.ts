import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { THTTPParams, THTTPResponseItems, THTTPResponseItem } from './http.model';

@Injectable({
    providedIn: 'root'
})
export class HttpService {
    constructor(private __http: HttpClient) { }

    protected getItems<T>(url: string, options?: THTTPParams) {
        if (options) {
            let params: THTTPParams = {};
            if (options.$count) {
                params['$count'] = options.$count;
            };
            if (options.$expand) {
                params['$expand'] = options.$expand;
            };
            if (options.$filter) {
                params['$filter'] = options.$filter;
            };
            if (options.$orderby) {
                params['$orderby'] = options.$orderby;
            };
            if (options.$select) {
                params['$select'] = options.$select;
            };
            if (typeof (options.$skip) === 'number' && options.$skip >= 0) {
                params['$skip'] = options.$skip;
            };
            if (typeof (options.$top) === 'number' && options.$top >= 0) {
                params['$top'] = options.$top;
            };
            return this.__http.get<THTTPResponseItems<T>>(url, { params: params });
        } else {
            return this.__http.get<THTTPResponseItems<T>>(url);
        };
    }

    protected getItem<T>(url: string, options?: Omit<THTTPParams, '$skip' | '$top' | '$filter' | '$count' | '$orderby'>) {
        if (options) {
            return this.__http.get<THTTPResponseItem<T>>(url, { params: options });
        } else {
            return this.__http.get<THTTPResponseItem<T>>(url);
        };
    }

    protected submitItem<T>(url: string, body: T) {
        return this.__http.post(url, body);
    }

    protected updateItem<T>(url: string, body: T) {
        return this.__http.patch(url, body);
    }

    protected deleteItem<T>(url: string) {
        return this.__http.delete(url);
    }
}
