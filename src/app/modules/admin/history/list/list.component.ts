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
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { environment } from 'environments/environment.development';
import moment from 'moment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsapConfirmationService } from '@fuse/services/asap-confirmation';

@Component({
    selector: 'employee-list',
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
    ],
})
export class ListComponent implements OnInit, AfterViewInit {
    range = new FormGroup({
        start: new FormControl<any>(new Date()),
        end: new FormControl<any>(new Date()),
    });
    searchQuery: string = '';
    department: string = '';
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    public dataRow: any[];
    user:any;
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
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

        // this._service.getPosition().subscribe((resp: any)=>{
        //     this.positions = resp.data
        // })
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    editElement(element: any) {
        this._router.navigate(['admin/history/form', element]);
        // const dialogRef = this.dialog.open(EditDialogComponent, {
        //     width: '400px', // กำหนดความกว้างของ Dialog
        //     data: {
        //         data: element,
        //         position: this.positions,
        //     }, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        // });

        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         // เมื่อ Dialog ถูกปิด ดำเนินการตามผลลัพธ์ที่คุณได้รับจาก Dialog
        //     }
        // });
    }

    exportfile() {
        const user = JSON.parse(localStorage.getItem('user'));
        window.open(
            environment.baseURL +
                '/api/export_log/' +
                user.position_id +
                '/' +
                user.code
        );
    }

    addElement() {
        this._router.navigate(['admin/history/form']);
        // const dialogRef = this.dialog.open(FormDialogComponent, {
        //     width: '1000px',
        //     height: '800px', // กำหนดความกว้างของ Dialog
        // });

        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         //    console.log(result,'result')
        //     }
        // });
    }

    applySearch() {
        // You may need to modify this based on your DataTables structure
        this.rerender();
    }
    rerender(): void {
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
            searching: false,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.status = null;
                dataTablesParameters.date_start = moment(
                    new Date(this.range.value.start)
                ).format('YYYY-MM-DD');
                dataTablesParameters.date_stop = moment(
                    new Date(this.range.value.end)
                ).format('YYYY-MM-DD');
                dataTablesParameters.department = this.department;
                dataTablesParameters.search = { value: this.searchQuery }; // Include search query
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
                { data: 'No' },
                { data: 'name' },
                { data: 'created_at' },
                { data: 'description' },
                { data: 'type' },
            ],
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    changeDate() {
        console.log(this.range.value);
        //     const formValue =  this.range.value
        //     this.range.value.start = moment(this.range.value.start).format('YYYY-MM-DD');
        //     this.range.value.end = moment(this.range.value.end).format('YYYY-MM-DD');
        //    console.log(this.range.value);

        this.rerender();
        this._changeDetectorRef.markForCheck();
    }

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
            message: 'ประวัติการทำรายการที่เลือกจะถูกลบออกจากระบบถาวร',
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
                const selectedIds = this.dataRow
                    .filter((e) => e.checked)
                    .map((e) => e.id);
                console.log(selectedIds);
            }
        });
    }

    cancelCheck() {
        this.setAll(false);
    }
}
