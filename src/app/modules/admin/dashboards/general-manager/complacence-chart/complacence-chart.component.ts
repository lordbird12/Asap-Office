import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexNonAxisChartSeries, ApexChart, ApexPlotOptions, NgApexchartsModule, ApexStroke } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    labels: string[];
    
    plotOptions: ApexPlotOptions;
    colors: string[];
    stroke: ApexStroke;
};

@Component({
    selector: 'app-complacence-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './complacence-chart.component.html',
    styleUrls: ['./complacence-chart.component.scss']
})
export class ComplacenceChartComponent implements OnInit {

    @Input()
    data: any;

    public chartOptions: Partial<ChartOptions>;

    ngOnInit(): void {
        this.chartOptions = {
            series: [70],
            chart: {
                height: 350,
                type: "radialBar",

            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        size: "68%"
                    },

                },

            },

            labels: [this.data.client_smile.point],
            colors: ['#FBAF5D'],
            stroke: {
                lineCap: "round",
            }
        };
    }

}
