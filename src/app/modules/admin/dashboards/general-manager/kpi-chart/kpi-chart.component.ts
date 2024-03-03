import { Component, Input, OnInit } from '@angular/core';
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

    @Input()
    data: any;

    public chartOptions: Partial<ChartOptions>;

    data1 = [];
    data2 = [];

    ngOnInit(): void {
        console.log(this.data.graph_weeks);

        this.data1 = [
            this.data.graph_weeks.mon.new,
            this.data.graph_weeks.tue.new,
            this.data.graph_weeks.wed.new,
            this.data.graph_weeks.thu.new,
            this.data.graph_weeks.fri.new,
            this.data.graph_weeks.sat.new,
            this.data.graph_weeks.son.new
        ]
        this.data2 = [
            this.data.graph_weeks.mon.finish,
            this.data.graph_weeks.tue.finish,
            this.data.graph_weeks.wed.finish,
            this.data.graph_weeks.thu.finish,
            this.data.graph_weeks.fri.finish,
            this.data.graph_weeks.sat.finish,
            this.data.graph_weeks.son.finish
        ]

        this.chartOptions = {
            series: [
                {
                    name: "เคสใหม่",
                    data: this.data1,
                    color: "#FF4849"
                },
                {
                    name: "ปิดเคส",
                    data: this.data2,
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
