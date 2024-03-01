import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { FinanceService } from 'app/modules/admin/dashboards/finance/finance.service';
import { GeneralManagerComponent } from './general-manager.component';

export default [
    {
        path     : '',
        component: GeneralManagerComponent,
        resolve  : {
            data: () => inject(FinanceService).getData(),
        },
    },
] as Routes;
