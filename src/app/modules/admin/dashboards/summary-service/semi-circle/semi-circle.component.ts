import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexNonAxisChartSeries, ApexChart, NgApexchartsModule, ApexResponsive, ApexGrid, ApexPlotOptions, ApexAxisChartSeries, ApexDataLabels } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    responsive: ApexResponsive[];
    plotOptions: ApexPlotOptions;
    grid: ApexGrid,
    labels: any,
    colors: any,
};

@Component({
    selector: 'app-semi-circle',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './semi-circle.component.html',
    styleUrls: ['./semi-circle.component.scss']
})
export class SemiCircleComponent implements OnInit {

    @Input()
    data: any;

    series: number[] = [];

    public chartOptions: Partial<ChartOptions>;

    constructor() { }

    ngOnInit(): void {


        this.series = [
            +this.deps_totals('Bank').total,
            +this.deps_totals('Government/Hospital').total,
            +this.deps_totals('Logistic').total,
            +this.deps_totals('General').total,
            +this.deps_totals('Short Term/Replacement').total,
        ];

        this.chartOptions = {
            colors: ["#FF4849", "#2B4D66", "#33C455", "#FFB600", "#6692FB"],
            series: this.series,
            chart: {
                type: "donut",
            },
            plotOptions: {
                pie: {
                    startAngle: -90,
                    endAngle: 90,
                    offsetY: 10,
                }
            },
            grid: {
                padding: {
                    bottom: -200
                }
            },
            labels: ["Bank", "Government / Hospital", "Logistic", "General", "Short term / Replacment"],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        },
                    }
                }
            ],
        };
    }

    deps_totals(data: string) {
        return this.data.deps_totals.find(e => e.name == data)
    }

}

