import { Route, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';

export const pageRoute: Route[] = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: 'list',
                component: ListComponent,
            },
        ],
    },
];
