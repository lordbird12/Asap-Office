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
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AsapConfirmationService } from '@fuse/services/asap-confirmation';

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
        MatTabsModule,
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

    status: string = null;

    searchQuery: string = ''
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    flashMessage: 'success' | 'error' | null = null;
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    selectedTabLabel: string;
    public dataRow: any[];
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private asapConfirmationService: AsapConfirmationService,
    ) {
        this.status = this.activatedRoute.snapshot.data.status;
    }

    ngOnInit() {
        this.loadTable();
        // this._service.getPosition().subscribe((resp: any)=>{
        //     this.positions = resp.data
        // })
    }

    applySearch() {
        // You may need to modify this based on your DataTables structure
        this.rerender()
    }
    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });

    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }
    edit(Id: any) {
        this._router.navigate(['admin/customer/edit/' + Id]);
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
        this._router.navigate(['admin/customer/form']);
        // const dialogRef = this.dialog.open(FormDialogComponent, {
        //     width: '1000px',
        //     height: '850px', // กำหนดความกว้างของ Dialog
        // });

        // dialogRef.afterClosed().subscribe((result) => {
        //     if (result) {
        //         //    console.log(result,'result')
        //     }
        // });
    }

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
                if (this.status == null) {
                    dataTablesParameters.status = null;
                } else if (this.status == 'active') {
                    dataTablesParameters.status = 'Active';
                } else if (this.status == 'expire') {
                    dataTablesParameters.status = 'Expire';
                } else if (this.status == 'block') {
                    dataTablesParameters.status = 'Block';
                }

                dataTablesParameters.search = { value: this.searchQuery }; // Include search query
                that._service
                    .getPage(dataTablesParameters)
                    .subscribe((resp: any) => {
                        this.dataRow = resp.data;

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
                { data: '' },
                { data: '' },
                { data: '' },
                { data: '' },
                { data: '' },
                { data: '' },
            ],
            order: [[2, 'asc']]
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }

    uploadfile() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px',
            height: '600px', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                //    console.log(result,'result')
                this.rerender();
            }
        });
    }

    get someOneChecked() {
        return this.dataRow?.filter(e => e.checked);
    }

    get someCheck() {
        if (this.someOneChecked?.length == 0) { return false; }

        return this.someOneChecked?.length > 0 && !this.checkAll;
    }

    get checkAll() {
        return this.dataRow?.every(e => e.checked);
    }

    setAll(checked: boolean) {
        this.dataRow?.forEach(e => e.checked = checked);
    }

    confirmDelete() {
        const confirmation = this.asapConfirmationService.open({
            title: `ยืนยันการลบ ${this.someOneChecked.length} รายการ`,
            message: 'บัญชีลูกค้าที่เลือกจะถูกลบออกจากระบบถาวร',
            icon: { show: true, name: 'heroicons_asha:delete2', color: 'error' },
            actions: {
                confirm: {
                    label: 'ลบ'
                },
                cancel: {
                    label: 'ยกเลิก'
                }
            }
        });

        confirmation.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
                const data_array = [];
                this.dataRow.forEach((element) => {
                    if (element.checked) {
                        const data = {
                            client_id: element.id,
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
        this.setAll(false)
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
