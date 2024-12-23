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
            .post<any>(environment.baseURL + '/api/user', data)
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
            .get<any>(environment.baseURL + '/api/get_permission')
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

    getPage(dataTablesParameters: any): Observable<DataTablesResponse> {
        return this._httpClient
            .post(
                environment.baseURL + '/api/user_page',
                dataTablesParameters,
                this.httpOptionsFormdata
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getBooking(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_booking')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    
    getBookingByDep(id: any, data: any): Observable<any> {
        return this._httpClient
            .put<any>(environment.baseURL + '/api/get_booking_by_dep/' + id, data)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
    
    getService(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_services')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getEmployeeBydepartment(): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_user_by_dep')
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    getEmployeeBydepartmentId(id:any): Observable<any> {
        return this._httpClient
            .get<any>(environment.baseURL + '/api/get_user_by_department/'+id)
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }

    updateStatus(id: any, status: any, reason: any, services: any): Observable<any> {
        return this._httpClient
            .post<any>(environment.baseURL + '/api/update_booking_status', {booking_id: id , status: status, reason: reason, services: services})
            .pipe(
                tap((result) => {
                    this._data.next(result);
                })
            );
    }
}
