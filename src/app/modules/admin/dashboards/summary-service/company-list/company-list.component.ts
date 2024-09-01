import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { TextFieldModule } from '@angular/cdk/text-field';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CompanyListService } from './company-list.service';
import { environment } from 'environments/environment.development';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-company-list',
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
        MatTableModule,
        DataTablesModule,
        RouterLink,
    ],
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    // public dataRow: any[];
    dataRow: any[] = [];
    searchQuery: string = '';
    department: string = '';
    id: number;
    form: FormGroup;
    startDate: any;
    endDate: any;
    search: any;
    departmentName: string = '';
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: CompanyListService,
        private _router: Router,
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute
    ) {
        this.id = this.activatedRoute.snapshot.params.id;
        this.departmentName = this.activatedRoute.snapshot.queryParams.name;
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            startDate: [],
            endDate: [],
        });

        this.loadTable();

        this.form.valueChanges.subscribe({
            next: (data) => {
                this.startDate = data.startDate;
                this.endDate = data.endDate;
                if (data.startDate && data.endDate) {
                    this.rerender();
                }
            },
        });
    }

    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5000,
            serverSide: true,
            processing: true,
            searching: false, // Hide the search box
            lengthChange: false, // Hide the page length change control
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.search_text = this.search;
                dataTablesParameters.department_id = this.id;
                dataTablesParameters.ex_status = this.department;
                dataTablesParameters.start_date = this.startDate;
                dataTablesParameters.end_date = this.endDate;
                that._service
                    .dashboardBookingPage(dataTablesParameters)
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
                { data: 'action', orderable: false },
                { data: 'No', orderable: false },
                { data: 'name', orderable: false },
                { data: 'create_by', orderable: false },
                { data: 'created_at', orderable: false },
            ],
        };
    }

    exportExcel() {
        if (this.startDate && this.endDate) {
            console.log(this.startDate);
            window.open(
                environment.baseURL +
                    '/api/export_dashboard_services_group2/' +
                    this.id +
                    '/' +
                    this.startDate +
                    '/' +
                    this.endDate
            );
        } else {
            window.open(
                environment.baseURL +
                    '/api/export_dashboard_services_group/' +
                    this.id
            );
        }
    }

    uploadfile() {}

    applySearch() {
        // You may need to modify this based on your DataTables structure
        this.rerender();
    }

    // applySearch() {
    //     // You may need to modify this based on your DataTables structure
    //     this.rerender();
    // }

    rerender(): void {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }

    onKeyChange(event: any): void {
        this.search = event.target.value;
        this.rerender();
        // You can perform other operations based on the input value here
    }
}
