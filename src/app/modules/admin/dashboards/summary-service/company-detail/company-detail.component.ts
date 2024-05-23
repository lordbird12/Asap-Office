import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
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
import { CenterChartComponent } from '../center-chart/center-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { CompanyListService } from '../company-list/company-list.service';
import { SharedModule } from 'app/shared/shared.module';
import { environment } from 'environments/environment.development';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-company-detail',
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
        CenterChartComponent,
        DataTablesModule,
        SharedModule,
    ],
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss'],
})
export class CompanyDetailComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    typeScore = [56, 40, 38, 28, 18, 0, 0, 0];
    dtOptions: DataTables.Settings = {};
    dataRow: any[] = [];
    data = null;
    showTool: number;
    company_id: number;
    form: FormGroup;
    search: any;

    dapartmentName: string = '';
    companyName: string = '';
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: CompanyListService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder
    ) {
        this.company_id = this.activatedRoute.snapshot.params.company_id;

        this.dapartmentName = this.activatedRoute.snapshot.queryParams.name;
        this.companyName = this.activatedRoute.snapshot.queryParams.company;

        this.form = fb.group({
            startDate: [],
            endDate: [],
        });
    }

    ngOnInit(): void {
        this.loadTable();
        this.getDashboardSummaryByComp();

        this.form.valueChanges.subscribe((data) => {
            if (data.startDate && data.endDate) {
                this.loadTable();
                this.getDashboardSummaryByComp();
            }
        });
    }

    calPerStyly(score: number) {
        let txt = Math.floor(score);
        return txt > 0 ? txt + '%' : '';
    }

    calPers(index: number): number {
        const total: number = this.typeScore.reduce((acc, val) => acc + val, 0);

        const percentages: number = (this.typeScore[index] / total) * 100;

        return percentages;
    }

    showTooltipShow(index: number): void {
        this.showTool = index;
    }

    showTooltipNot(index: number): void {
        this.showTool = 999;
    }

    getDashboardSummaryByComp() {
        this._service
            .getDashboardSummaryByComp(this.company_id)
            .subscribe((resp: any) => {
                this.data = resp;

                this.typeScore = [
                    this.top_services('เปลี่ยนยาง'),
                    this.top_services('เปลี่ยนแบตเตอรี่'),
                    this.top_services('เช็คระยะ'),
                    this.top_services('เช็คระบบแอร์'),
                    this.top_services('เช็คระบบเบรค'),
                    this.top_services('เช็คระบบไฟ'),
                    this.top_services('เช็คช่วงล่าง'),
                    this.top_services('อื่น (โปรดระบุ)'),
                ];
            });
    }

    loadTable(): void {
        const that = this;
        that.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            serverSide: true,
            processing: true,
            searching: false, // Hide the search box
            lengthChange: false, // Hide the page length change control
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.search_text = this.search;
                dataTablesParameters.client_id = this.company_id;
                that._service
                    .carCompPage(dataTablesParameters)
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
            // columns: [
            //     { data: 'action', orderable: false },
            //     { data: 'No' },
            //     { data: 'name' },
            //     { data: 'create_by' },
            //     { data: 'created_at' },
            // ],
        };
    }

    top_services(data: string): number {
        return +this.data.top_services.find((e) => e.name == data).total;
    }

    exportExcel() {
        window.open(
            environment.baseURL +
                '/api/export_service_center_by_service_center/' +
                this.company_id +
                '/1/1'
        );
    }

    exportExcel2() {
        window.open(
            environment.baseURL +
                '/api/export_book_activity_service_center2/' +
                this.company_id
        );
    }

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
