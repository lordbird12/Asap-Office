import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CompanyListService {

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

    dashboardBookingPage(dataTablesParameters: any) {
        return this.http
            .post(
                environment.baseURL + '/api/dashboard_booking_page',
                dataTablesParameters,
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    carCompPage(dataTablesParameters: any) {
        return this.http
            .post(
                environment.baseURL + '/api/car_comp_page',
                dataTablesParameters
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }

    getDashboardSummaryByComp(client_id: any) {
        return this.http
            .post(
                environment.baseURL + '/api/get_dashboard_summary_by_comp',
                {},
                {
                    params: {
                        client_id: client_id
                    }
                }
            )
            .pipe(
                switchMap((response: any) => {
                    return of(response.data);
                })
            );
    }
}
