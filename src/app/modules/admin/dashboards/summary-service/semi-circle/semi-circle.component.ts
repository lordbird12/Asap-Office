import { Component, OnInit } from '@angular/core';
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

  public chartOptions: Partial<ChartOptions>;

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      colors: ["#FF4849", "#2B4D66", "#33C455", "#FFB600", "#6692FB"],
      series: [56, 40, 38, 28, 18],
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
      labels: ["Bank", "Government/Hospital", "Logistic", "General", "Short term/Replacment"],
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

}
function ViewChild(arg0: string): (target: SemiCircleComponent, propertyKey: "chart") => void {
  throw new Error('Function not implemented.');
}

