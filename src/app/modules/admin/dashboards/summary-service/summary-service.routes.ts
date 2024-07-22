import { ActivatedRoute, Routes } from '@angular/router';
import { SummaryServiceComponent } from './summary-service.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyDetailComponent } from './company-detail/company-detail.component';
import { CenterListComponent } from './center-list/center-list.component';
import { CenterDetailComponent } from './center-detail/center-detail.component';
import { inject } from '@angular/core';
import { SummaryServiceService } from './summary-service.service';
import { CenterListService } from './center-list/center-list.service';

export default [
    {
        path: '',
        component: SummaryServiceComponent,
        resolve: {
            data: () => inject(SummaryServiceService).getData(0),
        }
    },
    {
        path: 'center',
        component: CenterListComponent
    },
    {
        path: 'center/:id',
        component: CenterDetailComponent,
        resolve: {
            data: (activatedRoute) => {
                const serviceCenterId = activatedRoute.params.id;

                return inject(CenterListService).getDashboardSummaryByServiceCenter(serviceCenterId)
            }
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
] as Routes;
