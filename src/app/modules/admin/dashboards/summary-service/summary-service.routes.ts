import { Routes } from '@angular/router';
import { SummaryServiceComponent } from './summary-service.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanitDetailComponent } from './companit-detail/companit-detail.component';

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
        component: CompanitDetailComponent
    },
] as Routes;
