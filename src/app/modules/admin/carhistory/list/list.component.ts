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
    FormBuilder,
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

import { PageService } from '../page.service';

import { Observable, map, startWith, tap } from 'rxjs';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Router } from '@angular/router';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { environment } from 'environments/environment.development';
import { ChangeStatusPipe } from 'app/shared/status.pipe';

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
        MatAutocompleteModule,
        ReactiveFormsModule,
        ChangeStatusPipe,

    ],
})
export class ListComponent implements OnInit, AfterViewInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    public dataRow: any[];
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    form: FormGroup;
    dtInstance: Promise<DataTables.Api>;
    tableRow: any[] = [
        {
            created_at: '2024-03-04T11:01:29.000000Z',
            mile: '23000',
            activity: 'เช็คระยะ',
            service: 'Toyota บางนา',
            create_by: 'โอลิเวีย  (แผนก Enterprise)',
        },
        {
            created_at: '2024-03-04T11:01:29.000000Z',
            mile: '23000',
            activity: 'เช็คระยะ',
            service: 'Toyota บางนา',
            create_by: 'โอลิเวีย  (แผนก Enterprise)',
        },
        {
            created_at: '2024-03-04T11:01:29.000000Z',
            mile: '23000',
            activity: 'เช็คระยะ',
            service: 'Toyota บางนา',
            create_by: 'โอลิเวีย  (แผนก Enterprise)',
        },
    ];
    filteredOptionsProduct: Observable<string[]>;
    selectedProduct: string = '';
    productData: any[] = [];
    categoryData: any[] = [];
    productFilter: any[] = [];
    cars: any;
    car: any;
    ProductControl = new FormControl('2กล-5442');
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router,
        private _fb: FormBuilder
    ) {
        this._service.getCarwithClient().subscribe((resp: any) => {
            this.productData = resp.data;
        });
        this.form = this._fb.group({
            car_img: '',
            license_plate: '',
            model_car: '',
            name: '',
            company: '',
        });

        this.addForm = this._fb.group({
            filter: [null],
            car_id: [],
        });
    }

    ngOnInit() {
        this.loadTable();
        this.filteredOptionsProduct = this.ProductControl.valueChanges.pipe(
            startWith(''),
            map((value: any) => this._filterProduct(value || ''))
        );
    }

    HandlerPage(e: any) {
        this._service.getcarbytext(e).subscribe((resp: any) => {
            this.cars = resp;
            if (this.cars.length == 1) {
                this.car = this.cars[0]
                this.rerender();
                this._changeDetectorRef.markForCheck();
            } else {
                this.car = null;
                this.rerender();
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    ngAfterViewInit(): void {
        this._changeDetectorRef.detectChanges();
    }

    // เพิ่มเมธอด editElement(element) และ deleteElement(element)
    edit(Id: any) {
        this._router.navigate(['admin/car/edit/' + Id]);
    }

    private _filterProduct(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.productData.filter((option) =>
            option.license_plate.toLowerCase().includes(filterValue)
        );
    }
    data1: any;
    displayProduct(subject) {
        // console.log('product',subject);
        if (!subject) return '';
        let index = this.productData.findIndex(
            (state) => state.license_plate === subject
        );
        // console.log(index)
        this.data1 = this.productData[index];
        console.log(this.data1);
        return this.productData[index].license_plate;
    }

    clear() {
        this.ProductControl.setValue('');
    }

    searchTable() {
        // this.loadTable()
        this.rerender();
        this._changeDetectorRef.markForCheck();
    }

    uploadfile() {
        const dialogRef = this.dialog.open(FormDialogComponent, {
            width: '500px',
            height: '600px', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                // this.loadTable()
                this.rerender();
                this._changeDetectorRef.markForCheck();
            }
        });
    }

    exportFile() {
        window.open(
            environment.baseURL +
                '/api/booking_export_history/' +
                this.ProductControl.value ?? ''
        );
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
                dataTablesParameters.search_license_plate =
                    this.car?.license ?? '';
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
                { data: 'date' },
                { data: 'mile' },
                { data: 'event' },
                { data: 'service_center' },
                { data: 'user' },
            ],
        };
    }

    deleteElement() {
        // เขียนโค้ดสำหรับการลบออกองคุณ
    }

    // handlePageEvent(event) {
    //     this.loadData(event.pageIndex + 1, event.pageSize);
    // }
}
