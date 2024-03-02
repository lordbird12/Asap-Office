import { Routes } from '@angular/router';
import { SummaryServiceComponent } from './summary-service.component';

export default [
    {
        path     : '',
        component: SummaryServiceComponent,
        resolve  : {
        },
    },
] as Routes;
