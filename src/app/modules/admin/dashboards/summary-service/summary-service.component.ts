import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { SemiCircleComponent } from './semi-circle/semi-circle.component';
import { CenterChartComponent } from './center-chart/center-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, RouterLink } from '@angular/router';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    xaxis: ApexXAxis;
};

@Component({
    selector: 'app-summary-service',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule, SemiCircleComponent, CenterChartComponent, MatIconModule, MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, RouterLink],
    templateUrl: './summary-service.component.html',
    styleUrls: ['./summary-service.component.scss']
})
export class SummaryServiceComponent implements OnInit {

    formFieldHelpers: string[] = ['fuse-mat-dense'];
    @ViewChild("chart") chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    typeScore = [];

    lists = [
        { province: "กรุงเทพมหานคร", quantity: 450, top: "เปลี่ยนแบตเตอรี่" },
        { province: "นครราชสีมา", quantity: 250, top: "เปลี่ยนยาง" },
        { province: "นนทบุรี", quantity: 150, top: "เช็คระยะ" },
    ];

    data = null;

    constructor(
        private activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.data = this.activatedRoute.snapshot.data.data;
        console.log(this.data);

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

        this.data.most_booking.map(e => ({x: e.company, y: +e.total, fillColor: '#FF4849'}));

        this.chartOptions = {
            series: [
                {
                    name: "จำนวนการใช้บริการ",
                    data: this.data.most_booking.map(e => ({x: e.company, y: +e.total, fillColor: '#FF4849'}))
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

    deps_totals(data: string): {name:string, total: number} {
        return this.data.deps_totals.find(e => e.name == data);
    }

    top_services(data: string): number {
        return +this.data.top_services.find(e => e.name == data).total;
    }
}
