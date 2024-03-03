import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { FinanceService } from 'app/modules/admin/dashboards/finance/finance.service';
import { GeneralManagerComponent } from './general-manager.component';
import { GeneralManagerService } from './general-manager.service';

export default [
    {
        path     : '',
        component: GeneralManagerComponent,
        resolve  : {
            data: () => {
                return inject(GeneralManagerService).getSummary();
            },
        },
    },
] as Routes;
