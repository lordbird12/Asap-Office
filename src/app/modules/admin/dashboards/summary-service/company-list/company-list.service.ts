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
}
