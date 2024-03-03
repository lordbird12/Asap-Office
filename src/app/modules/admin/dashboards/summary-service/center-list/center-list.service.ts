import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CenterListService {

    constructor(
        private http: HttpClient,
    ) { }


    getPage(dataTablesParameters: any) {
        return this.http
            .post(
                environment.baseURL + '/api/service_center_page',
                dataTablesParameters,
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    serviceCenterBookPage(dataTablesParameters: any) {
        return this.http
            .post(
                environment.baseURL + '/api/service_center_book_page',
                dataTablesParameters,
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    carServiceCenterPage(dataTablesParameters: any) {
        return this.http
            .post(
                environment.baseURL + '/api/car_service_center_page',
                dataTablesParameters, {
                    params: {
                        service_center_id: dataTablesParameters.service_center_id
                    }
                }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getDashboardSummaryByServiceCenter(service_center_id: number) {
        return this.http
            .post(
                environment.baseURL + '/api/get_dashboard_summary_by_service_center',
                {
                    service_center_id: service_center_id
                }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
}
