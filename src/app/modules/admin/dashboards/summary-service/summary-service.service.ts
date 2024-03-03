import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SummaryServiceService {

    constructor(
        private http: HttpClient,
    ) { }

    getData() {
        return this.http.post(environment.baseURL + '/api/get_dashboard_summary_service', {})
            .pipe(
                map((resp: any) => resp.data)
            );
    }

}
