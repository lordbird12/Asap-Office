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
            .post<any>(environment.baseURL + '/api/client', data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    edit(id: any, data: FormData): Observable<any> {
        return this._httpClient
            .put<any>(environment.baseURL + '/api/client' + id, data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    update(id: any, data: any): Observable<any> {
        return this._httpClient
            .put<any>(environment.baseURL + '/api/client/' + id, data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getById(Id: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/client/${Id}`)
            .pipe(
                switchMap((response: any) => {
                    console.log(response);
                    return of(response.data);
                })
            );
    }
    getcarbytext(text: any): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + `/api/get_car_by_key_search/${text}`)
            .pipe(
                switchMap((response: any) => {
                    console.log(response);
                    return of(response.data);
                })
            );
    }
    delete(id: any): Observable<any> {
        return this._httpClient.delete<any>(
            environment.baseURL + '/api/client/' + id
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
    getPosition(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_position')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    getPermission(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_car')
            .pipe(
                tap((result) => {
                    this._data.next(result);
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
    getBrandModel(): Observable<any> {
        return this._httpClient
            .get(environment.baseURL + '/api/get_brand_model')
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
    getCar(): Observable<any> {
        return this._httpClient.get(environment.baseURL + '/api/get_car').pipe(
            switchMap((response: any) => {
                return of(response.data);
            })
        );
    }
    getCars(): Observable<any> {
        return this._httpClient.get<any>(environment.baseURL + '/api/get_car');
    }
    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.baseURL + '/api/client_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    response.data.data.forEach(element => { element.checked = false });

                    return of(response.data);
                })
            );
    }

    delete_all(data: any): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/client_delete_all', {
                clients: data,
            })
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

}
