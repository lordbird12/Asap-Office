import { LiveAnnouncer } from '@angular/cdk/a11y';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { PageService } from '../page.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { tap } from 'rxjs';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { TicketCardComponent } from '../../ticket/ticket-card/ticket-card.component';
import { result } from 'lodash';

@Component({
    selector: 'car-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        DataTablesModule,
    ],
})
export class ListComponent implements OnInit, AfterViewInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    public dataRow: any[];
    task: any[] = [
        {
            id: 1,
            name: 'งานใหม่ / Todo',
            detail: 'งานใหม่รอรับ',
            status: 'Process',
            task: []
        },
        {
            id: 2,
            name: 'กำลังดำเนินงาน',
            detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
            status: 'Waiting',
            task: []
        },
        {
            id: 3,
            name: 'รอเข้ารับบริการ',
            detail: 'โทรยืนยันการเข้ารับบริการกับทางศูนย์',
            status: 'Finish',
            task: []
        },
        {
            id: 4,
            name: 'เสร็จสิ้น',
            detail: '-',
            status: 'Cancel',
            task: []
        },
    ]
    itemData: any[] = [
        {
            status: 'Process',
            car: {
                license: '6กท-3155',
                brand_model: {
                    name: 'Honda'
                }
            },
            created_at: '2023-02-12'
        },
        {
            status: 'Process',
            car: {
                license: '6กท-3155',
                brand_model: {
                    name: 'Honda'
                }
            },
            created_at: '2023-02-12'
        },
        {
            status: 'Waiting',
            car: {
                license: '6กท-3155',
                brand_model: {
                    name: 'Honda'
                }
            },
            service_center: {
                name: 'ลาดกระบัง',
                phone: '0987776655',
            },
            name: 'นาย เควิน เคลวิน',
            phone: '0975554433',
            created_at: '2023-02-12'
        },
        {
            status: 'Waiting_service',
            car: {
                license: '6กท-3155',
                brand_model: {
                    name: 'Honda'
                }
            },
            service_center: {
                name: 'ลาดกระบัง',
                phone: '0987776655',
            },
            name: 'นาย เควิน เคลวิน',
            phone: '0975554433',
            created_at: '2023-02-12'
        },
        {
            status: 'Finish',
            car: {
                license: '6กท-3155',
                brand_model: {
                    name: 'Honda'
                }
            },
            created_at: '2023-02-12'
        },
    ]

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router
    ) {


    }

    ngOnInit() {
        this._service.getBooking().subscribe((resp: any) => {
            this.itemData = resp.data;
            // cons ole.log('itemData', this.itemData)
            for (const item of this.itemData) {
                if (item.status === 'New') {
                    this.task[0].task.push(item)
                }
                else if (item.status === 'Process') {
                    this.task[1].task.push(item)
                }
                else if (item.status === 'Waiting') {
                    this.task[2].task.push(item)
                }
                else if (item.status === 'Finish') {
                    this.task[3].task.push(item)
                }
            }
            this._changeDetectorRef.detectChanges();
        })



    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    editElement(element: any) {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '400px', // กำหนดความกว้างของ Dialog
            data: {
                data: element,
                position: this.positions,
            }, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // เมื่อ Dialog ถูกปิด ดำเนินการตามผลลัพธ์ที่คุณได้รับจาก Dialog
            }
        });
    }
    addElement() {
        // this._router.navigate(['admin/employee/form']);
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '1000px',
            height: '600px', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                //    console.log(result,'result')
            }
        });
    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            serverSide: true,
            processing: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                that._service
                    .getPage(dataTablesParameters)
                    .subscribe((resp: any) => {
                        this.dataRow = resp.data;
                        this.pages.current_page = resp.current_page;
                        this.pages.last_page = resp.last_page;
                        this.pages.per_page = resp.per_page;
                        if (resp.current_page > 1) {
                            this.pages.begin =
                                resp.per_page * resp.current_page - 1;
                        } else {
                            this.pages.begin = 0;
                        }

                        callback({
                            recordsTotal: resp.total,
                            recordsFiltered: resp.total,
                            data: [],
                        });
                        this._changeDetectorRef.markForCheck();
                    });
            },
            columns: [
                { data: 'action', orderable: false },
                { data: 'No' },
                { data: 'name' },
                { data: 'email' },
                { data: 'tel' },
            ],
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    createTicket() {
       const dialogRef= this.dialog.open(TicketCardComponent,
            {
                minWidth: '50%',
                width: '676px'
            }
        );
        dialogRef.afterClosed().subscribe(result => {
           

        })
    }

    editTicket(value: FormGroup) {
        console.log(value)
        const dialogRef = this.dialog.open(TicketCardComponent,
            {
                minWidth: '50%',
                width: '676px',
                data: value
            }
        );
        dialogRef.afterClosed().subscribe(result => {
            console.log('close');
            if(result) {
                this._service.getBooking().subscribe((resp: any) => {
                    this.itemData = resp.data;  
                    this.task = []
                    // cons ole.log('itemData', this.itemData)
                    for (const item of this.itemData) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                        else if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Waiting') {
                            this.task[2].task.push(item)
                        }
                        else if (item.status === 'Finish') {
                            this.task[3].task.push(item)
                        }
                    }
                    this._changeDetectorRef.detectChanges();
                })
            }
          
        })

    }

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }
}
