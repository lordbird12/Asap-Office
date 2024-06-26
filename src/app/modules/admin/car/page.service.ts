import {
    HttpClient,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpHeaders,
    HttpInterceptor,
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    BehaviorSubject,
    filter,
    map,
    Observable,
    of,
    switchMap,
    take,
    tap,
    throwError,
} from 'rxjs';
import { environment } from 'environments/environment.development';
import { Form } from '@angular/forms';
import { DataTablesResponse } from 'app/shared/datatable.types';
const token = localStorage.getItem('accessToken') || null;

@Injectable({ providedIn: 'root' })
export class PageService {
    // Private
    private _data: BehaviorSubject<any | null> = new BehaviorSubject(null);

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    httpOptionsFormdata = {
        headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    };

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    create(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/car', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    updatecar(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/update_car', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    update(data: any, id: any): Observable<any> {
        return this._httpClient
            .put<any>(environment.baseURL + '/api/employees/' + id, data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    delete(id: any): Observable<any> {
        return this._httpClient.delete<any>(
            environment.baseURL + '/api/employees/' + id,
            { headers: this.httpOptionsFormdata.headers }
        );
    }
    getDepartment(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_department')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getById(Id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/car/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    console.log(response);
                    return of(response.data);
                })
            );
    }
    getPosition(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_position')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getBrandModel(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_brand_model')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getProvince(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_province')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getCompany(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_client')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getData(key: any): Observable<any> {
        if (!key) {
            key = '*';
        }
        return this._httpClient
            .get(
                environment.baseURL +
                    '/api/get_service_center_by_key_search/' +
                    key
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getServiceCenter(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_service_center')
            .pipe(
                switchMap((response: any) => {
                    console.log(response.data);
                    return of(response.data);
                })
            );
    }
    getBrand(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_brand')
            .pipe(
                switchMap((response: any) => {
                    
                    return of(response.data);
                })
            );
    }

    importCar(data: any): Observable<any> {
        return this._httpClient
            .post(environment.baseURL + '/api/import_cars', data)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    /**
     * Get products
     *
     *
     * @param page
     * @param perPage
     * @param sortBy
     * @param order
     * @param search
     */

    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.baseURL + '/api/car_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    delete_all(data: any): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/car_delete_all', {
                cars: data,
            })
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getClient(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/get_client`)
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
}
