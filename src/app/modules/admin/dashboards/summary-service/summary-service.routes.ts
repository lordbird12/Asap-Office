import { Routes } from '@angular/router';
import { SummaryServiceComponent } from './summary-service.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CenterListComponent } from './center-list/center-list.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';

export default [
    {
        path: '',
        component: SummaryServiceComponent
    },
    {
        path: 'bank',
        component: CompanyListComponent
    },
    {
        path: 'bank/:id',
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
