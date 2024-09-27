import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ApexNonAxisChartSeries,
    ApexChart,
    NgApexchartsModule,
    ApexResponsive,
    ApexGrid,
    ApexPlotOptions,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    plotOptions: ApexPlotOptions;
    grid: ApexGrid;
    labels: any;
    colors: any;
};

@Component({
    selector: 'app-semi-circle',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './semi-circle.component.html',
    styleUrls: ['./semi-circle.component.scss'],
})
export class SemiCircleComponent implements OnInit {
    @Input()
    data: any;

    series: number[] = [];
    labels: string[] = [];
    public chartOptions: Partial<ChartOptions>;

    constructor() {}

    ngOnInit(): void {
        // Create an array of totals and labels
        const totals = this.data.deps_totals.map((department) => ({
            total: +department.total,
            label: department.name,
        }));

        // Sort totals in descending order
        totals.sort((a, b) => b.total - a.total);

        // Extract sorted series and labels
        this.series = totals.map((item) => item.total);
        this.labels = totals.map((item) => item.label);

        this.chartOptions = {
            colors: ['#FF4849', '#2B4D66', '#33C455', '#FFB600', '#6692FB'],
            series: this.series,
            chart: {
                type: 'donut',
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 10,
                },
            },
            grid: {
                padding: {
                    bottom: -200,
                },
            },
            labels: this.labels,
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200,
                        },
                        legend: {
                            position: 'bottom',
                        },
                    },
                },
            ],
        };
    }

    deps_totals(data: string) {
        return this.data.deps_totals.find((e) => e.name == data);
    }
}
