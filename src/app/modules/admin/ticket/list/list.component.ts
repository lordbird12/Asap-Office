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
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
import { TicketCardComponent } from '../ticket-card/ticket-card.component';
import { CreateComponent } from '../create-card/ticket-card.component';
import { DetailTicketComponent } from '../detail-card/ticket-card.component';
import { environment } from 'environments/environment.development';
import { EmployeeDialogComponent } from '../employee-filter/dailog.component';
import { DepartmentDialogComponent } from '../department-dialog/dailog.component';
import { UserImageService } from 'app/shared/image-last/user-image.service';
import { LastUserImagePipe } from 'app/shared/image-last/last-user-image.pipe';
import { TimeDifferencePipe } from 'app/shared/time-difference.pipe';

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
        MatDialogModule,
        LastUserImagePipe,
        TimeDifferencePipe
    ],
    providers: [UserImageService]
})
export class ListComponent implements OnInit, AfterViewInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    public dataRow: any[];
    user: any;
    task: any[] = [
        {
            id: 1,
            name: 'งานใหม่ / Todo',
            detail: 'งานใหม่รอรับ',
            status: 'New',
            task: []
        },
        {
            id: 2,
            name: 'กำลังดำเนินงาน',
            detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
            status: 'Process',
            task: []
        },
        {
            id: 4,
            name: 'เสร็จสิ้น',
            detail: '-',
            status: 'Finish',
            task: []
        },
    ]
    itemData: any[];
    employeeDep: any[] = [];
    department : any [] = []
    departmentData : any [] = []
    
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private userImageService: UserImageService,
    ) {
        this._service.getEmployeeBydepartment().subscribe((resp: any) => {
            for (let index = 0; index < resp.data.length; index++) {
                const element = {
                    id: resp.data[index].id,
                    fname: resp.data[index].fname,
                    lname: resp.data[index].lname,
                    image: resp.data[index].image,
                    code: resp.data[index].code,
                    isSelected: resp.data[index].code === this.user.code,
                }
                this.employeeDep.push(element)
            }
        })
        this._service.getDepartment().subscribe((resp: any) => {
           this.departmentData = resp.data;
        })
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        
        const data = {
            deps: [+this.user.department_id] , 
            users: [{
                code: this.user.code
            }]
        }
        this._service.getTicketByDep(data).subscribe((resp: any) => {
            this.itemData = resp.data;
            for (const item of this.itemData) {
                if (item.status === 'New') {
                    this.task[0].task.push(item)
                }
                else if (item.status === 'Process') {
                    this.task[1].task.push(item)
                }
                else if (item.status === 'Finish') {
                    this.task[2].task.push(item)
                }
            }
            this._changeDetectorRef.markForCheck();
        })
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }
    empFilter(data: any) {
      
        return data.filter(e => e.isSelected)
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

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }
    createTicket() {
        const dialogRef = this.dialog.open(CreateComponent,
            { minWidth: '50%' }
        );
        dialogRef.afterClosed().subscribe(result => {
            if(result) {    
                let dep = []
                if (this.department.length > 0 ) {
                    dep = this.department.map(item => item )
                }
                else 
                {
                    dep = [+this.user.department_id]
                }
                const emp = this.employeeDep.filter(item => item.isSelected)
                
                const data = {
                    deps:  dep,
                    users: emp.map(item => ({code: item.code}))
                }
                this.task = [
                    {
                        id: 1,
                        name: 'งานใหม่ / Todo',
                        detail: 'งานใหม่รอรับ',
                        status: 'New',
                        task: []
                    },
                    {
                        id: 2,
                        name: 'กำลังดำเนินงาน',
                        detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
                        status: 'Process',
                        task: []
                    },
                    {
                        id: 4,
                        name: 'เสร็จสิ้น',
                        detail: '-',
                        status: 'Finish',
                        task: []
                    },
            ];
        
                this._service.getTicketByDep(data).subscribe((resp: any) => {
                    this.itemData = resp.data;
                    for (const item of this.itemData) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                        else if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Finish') {
                            this.task[2].task.push(item)
                        }
                    }
                    this._changeDetectorRef.markForCheck();
                })
            }
        })
    }
    detailTicket(value: any) {
        const dialogRef = this.dialog.open(DetailTicketComponent,
            {
                minWidth: '50%',
                width: '676px',
                data: value
            }
        );
        dialogRef.afterClosed().subscribe(result => {

            if(result) {    
                let dep = []
                if (this.department.length > 0 ) {
                    dep = this.department.map(item => item )
                }
                else 
                {
                    dep = [+this.user.department_id]
                }
                const emp = this.employeeDep.filter(item => item.isSelected)
                // const dep = this.department.map(item => item)
                const data = {
                    deps:   dep, 
                    users: emp.map(item => ({code: item.code}))
                }
                this.task = [
                    {
                        id: 1,
                        name: 'งานใหม่ / Todo',
                        detail: 'งานใหม่รอรับ',
                        status: 'New',
                        task: []
                    },
                    {
                        id: 2,
                        name: 'กำลังดำเนินงาน',
                        detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
                        status: 'Process',
                        task: []
                    },
                    {
                        id: 4,
                        name: 'เสร็จสิ้น',
                        detail: '-',
                        status: 'Finish',
                        task: []
                    },
            ];
        
                this._service.getTicketByDep(data).subscribe((resp: any) => {
                    this.itemData = resp.data;
                    for (const item of this.itemData) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                        else if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Finish') {
                            this.task[2].task.push(item)
                        }
                    }
                    this._changeDetectorRef.markForCheck();
                })
            }
        })


    }

    exportExcel() {
        window.open(environment.baseURL + '/api/export_ticket')
    }

    employeeDialog(value) {
        console.log(this.employeeDep)
        const dialogRef = this.dialog.open(EmployeeDialogComponent,
            {
                minWidth: '30%',
                data: {
                    status: 'Edit',
                    value: this.employeeDep,
                },
            }
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                const deps = this.department.map(item => item)
                const data = {
                    deps:  deps,
                    users: result.map(item => ({code: item.code}))
                }
                this.task = [
                    {
                        id: 1,
                        name: 'งานใหม่ / Todo',
                        detail: 'งานใหม่รอรับ',
                        status: 'New',
                        task: []
                    },
                    {
                        id: 2,
                        name: 'กำลังดำเนินงาน',
                        detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
                        status: 'Process',
                        task: []
                    },
                    {
                        id: 4,
                        name: 'เสร็จสิ้น',
                        detail: '-',
                        status: 'Finish',
                        task: []
                    },
            ];
                this._service.getTicketByDep(data).subscribe((resp: any) => {
                    this.itemData = resp.data;
                    console.log(this.itemData)
                    for (const item of this.itemData) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                        else if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Finish') {
                            this.task[2].task.push(item)
                        }
                    }
                    this._changeDetectorRef.markForCheck();
                })
        }
        })
    }

    departmentDailog() {
        
        const dialogRef = this.dialog.open(DepartmentDialogComponent,
            {
                minWidth: '30%',
                data: {
                    status: 'Edit',
                    value: this.departmentData,
                },
            }
        );
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                    this.department = result.map(item => item.id)
                    const emp = this.employeeDep.filter(item => item.isSelected)
                    const data = {
                        deps:  this.department , 
                        users: emp.map(item => ({code: item.code}))
                    }
                    this.task = [
                        {
                            id: 1,
                            name: 'งานใหม่ / Todo',
                            detail: 'งานใหม่รอรับ',
                            status: 'New',
                            task: []
                        },
                        {
                            id: 2,
                            name: 'กำลังดำเนินงาน',
                            detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
                            status: 'Process',
                            task: []
                        },
                        {
                            id: 4,
                            name: 'เสร็จสิ้น',
                            detail: '-',
                            status: 'Finish',
                            task: []
                        },
                ];
                    this._service.getTicketByDep(data).subscribe((resp: any) => {
                        this.itemData = resp.data;
                        console.log(this.itemData)
                        for (const item of this.itemData) {
                            if (item.status === 'New') {
                                this.task[0].task.push(item)
                            }
                            else if (item.status === 'Process') {
                                this.task[1].task.push(item)
                            }
                            else if (item.status === 'Finish') {
                                this.task[2].task.push(item)
                            }
                        }
                        this._changeDetectorRef.markForCheck();
                    })
            }
        })
    }

    getLastElement(data: any): any {
        const created_at = data.activitys[data.activitys.length - 1];
        // return created_at.updated_at
        return this.checkAndFormatDateTime(created_at.updated_at)
    }

    checkAndFormatDateTime(inputDateTimeRaw: Date): string {
        const inputDateTime = new Date(inputDateTimeRaw)
        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
    
        if (this.isSameDate(inputDateTime, today)) {
          return 'วันนี้ ' + this.formatTime(inputDateTime);
        } else if (this.isSameDate(inputDateTime, yesterday)) {
          return 'เมื่อวาน ' + this.formatTime(inputDateTime);
        } else {
          return this.formatFullDateTime(inputDateTime);
        }
      }
    
      // Function to check if two dates are the same day
      private isSameDate(date1: Date, date2: Date): boolean {
   
        return (
          date1.getDate() === date2.getDate() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getFullYear() === date2.getFullYear()
        );
      }
    
      // Function to format time as HH:mm
      private formatTime(dateTime: Date): string {
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      }
    
      // Function to format full date and time as dd/MM/yyyy HH:mm
      private formatFullDateTime(dateTime: Date): string {
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear().toString();
        const time = this.formatTime(dateTime);
        return `${day}/${month}/${year} ${time}`;
      }
}
