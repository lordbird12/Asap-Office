import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    grid: ApexGrid;
    stroke: ApexStroke;
    title: ApexTitleSubtitle;
};

@Component({
    selector: 'app-kpi-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './kpi-chart.component.html',
    styleUrls: ['./kpi-chart.component.scss']
})
export class KpiChartComponent implements OnInit {
    public chartOptions: Partial<ChartOptions>;

    ngOnInit(): void {
        this.chartOptions = {
            series: [
                {
                    name: "เคสใหม่",
                    data: [10, 41, 35, 51, 49, 62, 69],
                    color: "#FF4849"
                },
                {
                    name: "ปิดเคส",
                    data: [20, 80, 10, 88, 44, 11, 2],
                    color: "#36B37E"
                }
            ],
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "smooth"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                }
            },
            xaxis: {
                categories: [
                    "จันทร์",
                    "อังคาร",
                    "พุธ",
                    "พฤหัสบดี",
                    "ศุกร์",
                    "เสาร์",
                    "อาทิตย์"
                ]
            }
        };
    }


}
