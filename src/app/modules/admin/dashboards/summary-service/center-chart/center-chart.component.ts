import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexFill, ApexLegend, ApexPlotOptions, ApexStroke, ApexTooltip, ApexXAxis, ApexYAxis, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-center-chart',
    standalone: true,
    imports: [CommonModule, NgApexchartsModule],
    templateUrl: './center-chart.component.html',
    styleUrls: ['./center-chart.component.scss']
})
export class CenterChartComponent implements OnInit {
    @Input()
    data: any;

    public chartOptions: Partial<ChartOptions>;

    ngOnInit(): void {
        this.chartOptions = {
            series: [
                {
                    name: "จำนวนครั้ง",
                    data: this.data.most_service_centers.map(e => ({ x: e.name, y: +e.total, fillColor: '#FF4849' }))
                }
            ],
            chart: {
                type: "bar",
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: "40%",
                    borderRadius: 6
                    // endingShape: "rounded"
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
                colors: ["transparent"]
            },
            fill: {
                opacity: 1
            },
            // tooltip: {
            //   y: {
            //     formatter: function (val) {
            //       return "$ " + val + " thousands";
            //     }
            //   }
            // }
        };
    }

    mostCenter() {
        return this.data?.most_service_centers.reduce((max, obj) => +obj.total > +max.total ? obj : max, this.data?.most_service_centers[0]);
    }
}
