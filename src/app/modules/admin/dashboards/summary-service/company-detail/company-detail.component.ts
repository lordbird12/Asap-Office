import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DataTablesModule } from 'angular-datatables';
import { CenterChartComponent } from '../center-chart/center-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from 'app/modules/admin/account/page.service';
import { CompanyListService } from '../company-list/company-list.service';

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
    ],
    templateUrl: './company-detail.component.html',
    styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    typeScore = [56, 40, 38, 28, 18, 0, 0, 0];
    dtOptions: DataTables.Settings = {};
    dataRow: any[] = [];
    data = null;

    company_id: number;

    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: CompanyListService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.company_id = this.activatedRoute.snapshot.params.company_id;
    }

    ngOnInit(): void {
        this.loadTable();
        this.getDashboardSummaryByComp();
    }

    calPerStyly(score: number) {
        let txt = Math.floor(score);
        return txt > 0 ? txt + '%' : ""
    }

    calPers(index: number): number {
        const total: number = this.typeScore.reduce((acc, val) => acc + val, 0);

        const percentages: number = (this.typeScore[index] / total) * 100;

        return percentages;
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
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
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
        return +this.data.top_services.find(e => e.name == data).total;
    }
}
