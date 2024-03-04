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
import { MatTableModule } from '@angular/material/table';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { PageService } from '../page.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { TicketCardComponent } from '../../ticket/ticket-card/ticket-card.component';
import { UserImageService } from 'app/shared/image-last/user-image.service';
import { LastUserImagePipe } from 'app/shared/image-last/last-user-image.pipe';
import { TimeDifferencePipe } from 'app/shared/time-difference.pipe';
import { EmployeeDialogComponent } from '../../ticket/employee-filter/dailog.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CancelDialogComponent } from '../../ticket/cancel-dialog/dailog.component';

@Component({
    selector: 'car-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    styleUrls: ['./list.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        FormsModule,
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
        LastUserImagePipe,
        TimeDifferencePipe
    ],
    providers: [UserImageService],

})
export class ListComponent implements OnInit, AfterViewInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    isCheckedControl = new FormControl(false);
    status = new FormControl('');
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
    itemData: any;
    user: any;
    employeeDep: any[] = [];

    multiItems: any[] = [];

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private userImageService: UserImageService,
        private _fuseConfirmationService: FuseConfirmationService,
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
       this.user = JSON.parse(localStorage.getItem('user'));
    //    console.log(this.user)
    }

    ngOnInit() {
        if(this.user) {
            const data =   {
                users: [{
                    code: this.user.code
                }]
            }
            this._service.getBookingByDep(this.user.department_id,data).subscribe((resp: any) => {
                const news = resp.data.news;
                const all = resp.data.all;
                // console.log(resp.data.all)

                for (const item of news) {
                    if (item.status === 'New') {
                        this.task[0].task.push(item)
                    }
                }
                for (const item of all) {
                    if (item.status === 'Process') {
                        this.task[1].task.push(item)
                    }
                    else if (item.status === 'Waiting') {
                        this.task[2].task.push(item)
                    }
                    else if (item.status === 'Finish') {
                        this.task[3].task.push(item)
                    }
                    else if (item.status === 'Cancel' ) {
                        this.task[0].task.push(item)
                    }
                }
                this._changeDetectorRef.detectChanges();
            })
        }

    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }
    selectedIdx: number | null = null;
    selectItem(index: number): void {
        this.selectedIdx = index;
    }

    isChecked1: boolean[] = []
    isChecked2: boolean[] = []
    isChecked3: boolean[] = []
    changeColor1(index: number, event: any): void {
        this.isChecked1[index] = !this.isChecked1[index];
        if(event.target.checked === true )  {
            this.multiItems.push(this.task[1].task[index])
         
        } else {
            this.multiItems = this.multiItems.filter(item => item !== this.task[1].task[index]);
        
        }
    }
    changeColor2(index: number,event: any): void {
        this.isChecked2[index] = !this.isChecked2[index];
        if(event.target.checked === true )  {
            this.multiItems.push(this.task[2].task[index])
            console.log(this.multiItems)
        } else {
            this.multiItems = this.multiItems.filter(item => item !== this.task[2].task[index]);
          
        }
    }
    changeColor3(index: number): void {
        this.isChecked3[index] = !this.isChecked3[index];
    }

    isCheckboxVisible: boolean[] = [];

    showCheckbox(index: number): void {
        this.isCheckboxVisible[index] = true;
    }

    hideCheckbox(index: number): void {
        this.isCheckboxVisible[index] = false;
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
        const dialogRef = this.dialog.open(TicketCardComponent,
            {
                minWidth: '50%',
                width: '500px',
                data: {
                    status: 'New'
                }
            }
        );
        dialogRef.afterClosed().subscribe(result => {

            if (result) {
               
                const data =   {
                    users: this.employeeDep.filter(e => e.isSelected)
                }
                this.task = [
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
                this._service.getBookingByDep(this.user.department_id, data).subscribe((resp: any) => {
                    const news = resp.data.news;
                    const all = resp.data.all;
                    // console.log(resp.data.all)
    
                    for (const item of news) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                    }
                    for (const item of all) {
                        if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Waiting') {
                            this.task[2].task.push(item)
                        }
                        else if (item.status === 'Finish' ) {
                            this.task[3].task.push(item)
                        }
                        else if (item.status === 'Cancel' ) {
                            this.task[0].task.push(item)
                        }
                    }
                })
                this._changeDetectorRef.markForCheck();
            }
        })
    }

    editTicket(value: FormGroup) {
        // console.log(value)
        const dialogRef = this.dialog.open(TicketCardComponent,
            {
                minWidth: '50%',
                width: '500px',
                data: {
                    status: 'Edit',
                    value: value,
                },
            }
        );
        dialogRef.afterClosed().subscribe(result => {
            // console.log('close');
            if (result) {

                const data =   {
                    users: this.employeeDep.filter(e => e.isSelected)
                }
                this.task = [
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
                this._service.getBookingByDep(this.user.department_id, data).subscribe((resp: any) => {
                    const news = resp.data.news;
                    const all = resp.data.all;
                    // console.log(resp.data.all)
    
                    for (const item of news) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                    }
                    for (const item of all) {
                        if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Waiting') {
                            this.task[2].task.push(item)
                        }
                        else if (item.status === 'Finish') {
                            this.task[3].task.push(item)
                        }
                        else if (item.status === 'Cancel' ) {
                            this.task[0].task.push(item)
                        }
                    }
                    this._changeDetectorRef.detectChanges();
                })
                this._changeDetectorRef.markForCheck();
            }

        })

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
                // this.employeeDep = result
                const data =   {
                    users: result
                }
                this.task = [
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
                this._service.getBookingByDep(this.user.department_id,data).subscribe((resp: any) => {
                    const news = resp.data.news;
                    const all = resp.data.all;
    
                    for (const item of news) {
                        if (item.status === 'New') {
                            this.task[0].task.push(item)
                        }
                    }
                    for (const item of all) {
                        if (item.status === 'Process') {
                            this.task[1].task.push(item)
                        }
                        else if (item.status === 'Waiting') {
                            this.task[2].task.push(item)
                        }
                        else if (item.status === 'Finish' ) {
                            this.task[3].task.push(item)
                        }
                        else if (item.status === 'Cancel' ) {
                            this.task[0].task.push(item)
                        }
                    }
                    this._changeDetectorRef.detectChanges();
                })
                            // this._service.getBooking().subscribe((resp: any) => {
                //     this.itemData = resp.data;  
                //     this.task = [
                //         {
                //             id: 1,
                //             name: 'งานใหม่ / Todo',
                //             detail: 'งานใหม่รอรับ',
                //             status: 'Process',
                //             task: []
                //         },
                //         {
                //             id: 2,
                //             name: 'กำลังดำเนินงาน',
                //             detail: 'โทรจองศูนย์ซ่อมและโทรยืนยันลูกค้า',
                //             status: 'Waiting',
                //             task: []
                //         },
                //         {
                //             id: 3,
                //             name: 'รอเข้ารับบริการ',
                //             detail: 'โทรยืนยันการเข้ารับบริการกับทางศูนย์',
                //             status: 'Finish',
                //             task: []
                //         },
                //         {
                //             id: 4,
                //             name: 'เสร็จสิ้น',
                //             detail: '-',
                //             status: 'Cancel',
                //             task: []
                //         },
                //     ]
                //     // cons ole.log('itemData', this.itemData)
                //     for (const item of this.itemData) {
                //         if (item.status === 'New') {
                //             this.task[0].task.push(item)
                //         }
                //         else if (item.status === 'Process') {
                //             this.task[1].task.push(item)
                //         }
                //         else if (item.status === 'Waiting') {
                //             this.task[2].task.push(item)
                //         }
                //         else if (item.status === 'Finish') {
                //             this.task[3].task.push(item)
                //         }
                //     }
                //     this._changeDetectorRef.markForCheck();
                // })
            }
        })
    }

    getLastElement(data: any): any {
        const created_at = data.activitys[data.activitys.length - 1];
        return created_at.updated_at
    }
    lastSelectEmp: any[] = []
    empFilter(data: any) {
      
        return data.filter(e => e.isSelected)
    }
    selectedItems: any[] = [];


    multiSave() {
        if(this.status.value === 'Cancel') {
            this.CancelStatus()
        } else {
            const confirmation = this._fuseConfirmationService.open({
                "title": "เปลี่ยนสถานะ",
                "message": "คุณต้องการเปลี่ยนสถานะใช่หรือไม่ ",
                "icon": {
                    "show": false,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "ยืนยัน",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": true,
                        "label": "ยกเลิก"
                    }
                },
                "dismissible": true
            });
    
            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    this.multiItems.map((item:any)=>{
                        const reason = '';
                        const services = item.services.map(data => ({service_id: data.service_id}));
                        const formValue = item
                        this._service.updateStatus(formValue.id , this.status.value, reason, services).subscribe({
                            
                            next: (resp: any) => {
                                this.multiItems = [];
                                this.isChecked1 = [];
                                this.isChecked2 = [];
                                const data =   {
                                    users: this.employeeDep.filter(e => e.isSelected)
                                }
                                this.task = [
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
                                this._service.getBookingByDep(this.user.department_id, data).subscribe((resp: any) => {
                                    const news = resp.data.news;
                                    const all = resp.data.all;
                                    // console.log(resp.data.all)
                    
                                    for (const item of news) {
                                        if (item.status === 'New') {
                                            this.task[0].task.push(item)
                                        }
                                    }
                                    for (const item of all) {
                                        if (item.status === 'Process') {
                                            this.task[1].task.push(item)
                                        }
                                        else if (item.status === 'Waiting') {
                                            this.task[2].task.push(item)
                                        }
                                        else if (item.status === 'Finish') {
                                            this.task[3].task.push(item)
                                        }
                                        else if (item.status === 'Cancel' ) {
                                            this.task[0].task.push(item)
                                        }
                                    }
                                    this._changeDetectorRef.detectChanges();
                                })
                            },
                            error: (err: any) => {
                                this._fuseConfirmationService.open({
                                    "title": "กรุณาระบุข้อมูล",
                                    "message": err.error.message,
                                    "icon": {
                                        "show": true,
                                        "name": "heroicons_outline:exclamation",
                                        "color": "warning"
                                    },
                                    "actions": {
                                        "confirm": {
                                            "show": false,
                                            "label": "ยืนยัน",
                                            "color": "primary"
                                        },
                                        "cancel": {
                                            "show": false,
                                            "label": "ยกเลิก",
        
                                        }
                                    },
                                    "dismissible": true
                                });
                            }
                        })
                    })
                
                }
            })
        }
    
    }

    CancelStatus() {
        const dialogRef = this.dialog.open(CancelDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog
            data: {
                data: 1,
                position: this.positions,
            }, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        });
        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                const confirmation = this._fuseConfirmationService.open({
                    "title": "เปลี่ยนสถานะ",
                    "message": "คุณต้องการเปลี่ยนสถานะใช่หรือไม่ ",
                    "icon": {
                        "show": false,
                        "name": "heroicons_outline:exclamation",
                        "color": "warning"
                    },
                    "actions": {
                        "confirm": {
                            "show": true,
                            "label": "ยืนยัน",
                            "color": "primary"
                        },
                        "cancel": {
                            "show": true,
                            "label": "ยกเลิก"
                        }
                    },
                    "dismissible": true
                });
        
                // Subscribe to the confirmation dialog closed action
                confirmation.afterClosed().subscribe((result) => {
                    if (result === 'confirmed') {
                        this.multiItems.map((item:any)=>{
                            const reason = result
                            const formValue = item
                            const services = item.services.map(data => ({service_id: data.service_id}));
                     
                            this._service.updateStatus(formValue.id , this.status.value, reason,  services).subscribe({

                                next: (resp: any) => {
                                    this.multiItems = [];
                                    this.isChecked1 = [];
                                    this.isChecked2 = [];
                                    const data =   {
                                        users: this.employeeDep.filter(e => e.isSelected)
                                    }
                                    this.task = [
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
                                    this._service.getBookingByDep(this.user.department_id, data).subscribe((resp: any) => {
                                        const news = resp.data.news;
                                        const all = resp.data.all;
                                        // console.log(resp.data.all)
                        
                                        for (const item of news) {
                                            if (item.status === 'New') {
                                                this.task[0].task.push(item)
                                            }
                                        }
                                        for (const item of all) {
                                            if (item.status === 'Process') {
                                                this.task[1].task.push(item)
                                            }
                                            else if (item.status === 'Waiting') {
                                                this.task[2].task.push(item)
                                            }
                                            else if (item.status === 'Finish') {
                                                this.task[3].task.push(item)
                                            }
                                            else if (item.status === 'Cancel' ) {
                                                this.task[0].task.push(item)
                                            }
                                        }
                                        this._changeDetectorRef.detectChanges();
                                    })
                                },
                                error: (err: any) => {
                                    this._fuseConfirmationService.open({
                                        "title": "กรุณาระบุข้อมูล",
                                        "message": err.error.message,
                                        "icon": {
                                            "show": true,
                                            "name": "heroicons_outline:exclamation",
                                            "color": "warning"
                                        },
                                        "actions": {
                                            "confirm": {
                                                "show": false,
                                                "label": "ยืนยัน",
                                                "color": "primary"
                                            },
                                            "cancel": {
                                                "show": false,
                                                "label": "ยกเลิก",
            
                                            }
                                        },
                                        "dismissible": true
                                    });
                                }
                            })
                        })
                    
                    }
                })
            }
        })
    }

    uncheckAll() {
        // this.isChecked2[1] = false
        this.isChecked2 = Array(this.task[2].task.length).fill(false);
        this.multiItems = [];
    }

    onUncheckAllClick(): void {
        this.uncheckAll()
    }
}
