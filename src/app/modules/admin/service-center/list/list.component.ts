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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { Router, RouterLink } from '@angular/router';
import { PictureComponent } from '../../picture/picture.component';
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
        RouterLink,
    ],
})
export class ListComponent implements OnInit, AfterViewInit {
    searchQuery: string = '';
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    flashMessage: 'success' | 'error' | null = null;
    // public dataRow: any[];
    dataRow: any[] = [];
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
        this.loadTable();
        // this._service.getPosition().subscribe((resp: any) => {
        //     this.positions = resp.data;
        // });
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    editElement(element: any) {
        this._router.navigate(['admin/service-center/form', element]);
    }
    viewElement(element: any) {
        const dialogRef = this.dialog.open(EditDialogComponent, {
            width: '700px', // กำหนดความกว้างของ Dialog
            data: element,
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                //    console.log(result,'result')
            }
        });
    }
    addElement() {
        this._router.navigate(['admin/service-center/form']);
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
            height: '600px', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                //    console.log(result,'result')
            }
        });
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
                dataTablesParameters.type = 'Good';
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
                { data: 'action', orderable: false },
                { data: 'No' },
                { data: 'name' },
                { data: 'create_by' },
                { data: 'created_at' },
            ],
            order: [[1, 'asc']]
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    showPicture(imgObject: any): void {
        this.dialog
            .open(PictureComponent, {
                autoFocus: false,
                data: {
                    imgSelected: imgObject,
                },
            })
            .afterClosed()
            .subscribe(() => {
                // Go up twice because card routes are setup like this; "card/CARD_ID"
                // this._router.navigate(['./../..'], {relativeTo: this._activatedRoute});
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
            message: 'ศูนย์บริการที่เลือกจะถูกลบออกจากระบบถาวร',
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
                            service_center_id: element.id,
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

    cancelCheck() {
        this.setAll(false)
    }
}
