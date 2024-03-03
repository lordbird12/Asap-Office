import { Routes } from '@angular/router';
import { SummaryServiceComponent } from './summary-service.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CenterListComponent } from './center-list/center-list.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';
import { inject } from '@angular/core';
import { SummaryServiceService } from './summary-service.service';

export default [
    {
        path: '',
        component: SummaryServiceComponent,
        resolve: {
            data: () => inject(SummaryServiceService).getData(),
        }
    },
    {
        path: ':id',
        component: CompanyListComponent
    },
    {
        path: ':id/:company_id',
        component: CompanyDetailComponent
    },
    {
        path: 'center',
        component: CenterListComponent
    },
    {
        path: 'center/:id',
        component: CenterDetailComponent
    },
] as Routes;
