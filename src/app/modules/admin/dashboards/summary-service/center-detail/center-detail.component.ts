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
import { Router, RouterLink } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { CenterChartComponent } from '../center-chart/center-chart.component';
import { MatDialog } from '@angular/material/dialog';
import { PageService } from 'app/modules/admin/account/page.service';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, NgApexchartsModule } from 'ng-apexcharts';

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
    typeScore = [56, 40, 38, 28, 18, 0, 0, 0];
    dtOptions: DataTables.Settings = {};
    dataRow: any[] = [];
    public chartOptions: Partial<ChartOptions>;

    constructor(
        private dialog: MatDialog,
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private _router: Router
    ) {}

    ngOnInit(): void {
        this.loadTable();

        this.chartOptions = {
            series: [
                {
                    name: "จำนวนการใช้บริการ",
                    data: [
                        { x: "บริษัท A", y: 12000, fillColor: '#FF4849' },
                        { x: "บริษัท B", y: 10000, fillColor: '#FF4849' },
                        { x: "บริษัท C", y: 6000, fillColor: '#FF4849' },
                        { x: "บริษัท D", y: 1400, fillColor: '#FF4849' },
                        { x: "บริษัท E", y: 1000, fillColor: '#FF4849' },
                        { x: "บริษัท F", y: 12, fillColor: '#FF4849' }
                    ]
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
                dataTablesParameters.type = 'Good';
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
            // columns: [
            //     { data: 'action', orderable: false },
            //     { data: 'No' },
            //     { data: 'name' },
            //     { data: 'create_by' },
            //     { data: 'created_at' },
            // ],
        };
    }
}
