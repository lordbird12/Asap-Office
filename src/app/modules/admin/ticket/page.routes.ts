import { Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';

export default [
    // {
    //     path      : '',
    //     pathMatch : 'full',
    //     redirectTo: 'quotation',
    // },
    {
        path     : '',
        component: PageComponent,
        children : [
            {
                path     : 'list',
                component: ListComponent,
                resolve  : {
                    // brands    : () => inject(InventoryService).getBrands(),
                    // categories: () => inject(InventoryService).getCategories(),
                    // products  : () => inject(InventoryService).getProducts(),
                    // tags      : () => inject(InventoryService).getTags(),
                    // vendors   : () => inject(InventoryService).getVendors(),
                },
            },
            {
                path: 'list/new',
                component: ListComponent,
                data: {
                    status: 'new'
                }
            },
            {
                path: 'list/process',
                component: ListComponent,
                data: {
                    status: 'process'
                }
            },
            {
                path: 'list/finish',
                component: ListComponent,
                data: {
                    status: 'finish'
                }
            },
        ],
    },
    {
        path     : '',
        component: PageComponent,
        children : [
            {
                path     : 'form',
                component: FormComponent,
                resolve  : {
                    // brands    : () => inject(InventoryService).getBrands(),
                    // categories: () => inject(InventoryService).getCategories(),
                    // products  : () => inject(InventoryService).getProducts(),
                    // tags      : () => inject(InventoryService).getTags(),
                    // vendors   : () => inject(InventoryService).getVendors(),
                },
            },
        ],
    },
] as Routes;
