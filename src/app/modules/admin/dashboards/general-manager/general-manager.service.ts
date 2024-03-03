import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment.development';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class GeneralManagerService {

    constructor(
        private http: HttpClient,
    ) { }

    getSummary() {
        return this.http.post(environment.baseURL + '/api/get_dashboard_summary', {})
            .pipe(
                map((resp: any) => resp.data)
            );
    }

    department() {
        return this.http.get(environment.baseURL + '/api/get_department')
            .pipe(
                map((resp: any) => resp.data)
            );
    }

    

}
