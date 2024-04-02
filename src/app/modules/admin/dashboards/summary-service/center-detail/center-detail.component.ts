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
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';
import { CenterListService } from '../center-list/center-list.service';
import { environment } from 'environments/environment.development';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
};

@Component({
    selector: 'app-center-detail',
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
        NgApexchartsModule
    ],
    templateUrl: './center-detail.component.html',
    styleUrls: ['./center-detail.component.scss']
})
export class CenterDetailComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    typeScore = [];
    dtOptions: DataTables.Settings = {};
    dataRow: any[] = [];
    data = null;
    public chartOptions: Partial<ChartOptions>;
    showTool: number;
    centerName: string = "";
    id: number;

    series: any[] = [];

    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: CenterListService,
        private _router: Router,
        private activatedRoute: ActivatedRoute,
    ) {
        this.id = this.activatedRoute.snapshot.params.id;
        this.centerName = this.activatedRoute.snapshot.queryParams.name;
        this.data = this.activatedRoute.snapshot.data.data;
    }

    ngOnInit(): void {
        this.loadTable();

        this.series = this.data.most_clients.map(e => ({ x: e.name, y: +e.total, fillColor: '#FF4849' }));

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

        this.chartOptions = {
            series: [
                {
                    name: "จำนวนการใช้บริการ",
                    data: [...this.series]
                }
            ],
            chart: {
                type: "bar",
                height: 350,
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 8,
                },
            },
            dataLabels: {
                enabled: true,
            },
        };
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
                dataTablesParameters.service_center_id = this.id;
                that._service
                    .carServiceCenterPage(dataTablesParameters)
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

    most_top_service() {
        return this.data.top_services.reduce((max, obj) => +obj.total > +max.total ? obj : max, this.data.top_services[0]);
    }

    get total_service() {
        return this.data.top_services.reduce((total, curr) => total + +curr.total, 0);
    }

    exportExcel() {
        window.open(environment.baseURL + '/api/export_book_activity_service_center/' + this.id);
    }

    showTooltipShow(index: number): void {
        this.showTool = index;
    }

    showTooltipNot(index: number): void {
        this.showTool = 999;
    }
}
