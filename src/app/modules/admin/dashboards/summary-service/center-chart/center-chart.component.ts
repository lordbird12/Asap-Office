import { Component, OnInit } from '@angular/core';
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
  public chartOptions: Partial<ChartOptions>;

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "จำนวนครั้ง",
          data: [
            { y: 10, x: "ศูนย์ 1", fillColor: '#FF4849' },
            { y: 20, x: "ศูนย์ 2", fillColor: '#FF4849' },
            { y: 5, x: "ศูนย์ 3", fillColor: '#FF4849' },
            { y: 30, x: "ศูนย์ 4", fillColor: '#FF4849' },
            { y: 4, x: "ศูนย์ 5", fillColor: '#FF4849' },
            { y: 15, x: "ศูนย์ 6", fillColor: '#FF4849' },
          ]
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
}
