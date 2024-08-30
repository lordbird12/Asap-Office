import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SummaryServiceService {
    constructor(private http: HttpClient) {}

    getData(id: number) {
        return this.http
            .post(environment.baseURL + '/api/get_dashboard_summary_service', {
                dep_id: id,
            })
            .pipe(map((resp: any) => resp.data));
    }

    getDataDate(id: number, start: any, end: any) {
        return this.http
            .post(environment.baseURL + '/api/get_dashboard_summary_service', {
                dep_id: id,
                start: start,
                end: end,
            })
            .pipe(map((resp: any) => resp.data));
    }
}
