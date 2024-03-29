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
    updateuser(data: FormData): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/update_user', data)
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

    getById(Id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/user/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    console.log(response);
                    return of(response.data);
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
    getPosition(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_position')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getbyidPosition(id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/position/' + id)
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
    getDepartment(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_department')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getbyidDepartment(id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/department/' + id)
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
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
}
