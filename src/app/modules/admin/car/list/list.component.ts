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
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router, RouterLink } from '@angular/router';
import { CompanyDialogComponent } from '../../ticket/compony-dialog/dailog.component';
import { AsapConfirmationService } from '@fuse/services/asap-confirmation';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
        MatCheckboxModule,
        RouterLink,
    ],
})
export class ListComponent implements OnInit, AfterViewInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    flashMessage: 'success' | 'error' | null = null;
    componys: any[];
    public dataRow: any[];
    user: any;
    companyList: any[] = [];
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private asapConfirmationService: AsapConfirmationService
    ) {}

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.loadTable();
        this._service.getClient().subscribe((resp: any) => {
            this.componys = resp;
        });
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    edit(Id: any) {
        this._router.navigate(['admin/car/edit/' + Id]);
    }
    editElement(element: any) {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '400px', // กำหนดความกว้างของ Dialog
            data: {
                data: element,
                position: this.componys,
            }, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // เมื่อ Dialog ถูกปิด ดำเนินการตามผลลัพธ์ที่คุณได้รับจาก Dialog
            }
        });
    }
    addElement() {
        this._router.navigate(['admin/car/form']);
        // const dialogRef = this.dialog.open(FormDialogComponent, {
        //     width: '1000px',
        //     height: '600px', // กำหนดความกว้างของ Dialog
        // });

        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         //    console.log(result,'result')
        //     }
        // });
    }

    uploadfile() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px',
            maxHeight: '80%', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            this.rerender();
        });
    }
    companyDialog() {
        const dialogRef = this.dialog.open(CompanyDialogComponent, {
            width: '500px',
            height: '80%', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
          
            if (result) {
                this.companyList = result.map((item) => item.id);
                this.rerender();
            }
        });
    }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });

        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
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
            searching: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                dataTablesParameters.company = this.companyList;
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
                { data: 'name' },
                { data: 'license' },
                { data: 'status' },
                { data: 'client_id' },
                { data: '' },
            ],
            order: [[1, 'asc']],
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }

    get someOneChecked() {
        return this.dataRow?.filter((e) => e.checked);
    }

    get someCheck() {
        if (this.someOneChecked?.length == 0) {
            return false;
        }

        return this.someOneChecked?.length > 0 && !this.checkAll;
    }

    get checkAll() {
        return this.dataRow?.every((e) => e.checked);
    }

    setAll(checked: boolean) {
        this.dataRow?.forEach((e) => (e.checked = checked));
    }

    confirmDelete() {
        const confirmation = this.asapConfirmationService.open({
            title: `ยืนยันการลบ ${this.someOneChecked.length} รายการ`,
            message: 'รถที่เลือกจะถูกลบออกจากระบบถาวร',
            icon: {
                show: true,
                name: 'heroicons_asha:delete2',
                color: 'error',
            },
            actions: {
                confirm: {
                    label: 'ลบ',
                },
                cancel: {
                    label: 'ยกเลิก',
                },
            },
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                const data_array = [];
                this.dataRow.forEach((element) => {
                    if (element.checked) {
                        const data = {
                            car_id: element.id,
                            check: element.checked,
                        };
                        data_array.push(data);
                    }
                });

                this._service.delete_all(data_array).subscribe({
                    next: (resp: any) => {
                        this.showFlashMessage('success');
                        this.rerender();
                    },
                    error: (err: any) => {
                        this.asapConfirmationService.open({
                            title: 'กรุณาระบุข้อมูล',
                            message: err.error.message,
                            icon: {
                                show: true,
                                name: 'heroicons_outline:exclamation',
                                color: 'warning',
                            },
                            actions: {
                                confirm: {
                                    show: false,
                                    label: 'ยืนยัน',
                                    color: 'primary',
                                },
                                cancel: {
                                    show: false,
                                    label: 'ยกเลิก',
                                },
                            },
                            dismissible: true,
                        });
                    },
                });
            }
        });
    }

    cancelCheck() {
        this.setAll(false);
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }
}
