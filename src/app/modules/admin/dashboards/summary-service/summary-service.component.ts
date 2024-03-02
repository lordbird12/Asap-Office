import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexPlotOptions, ApexXAxis, ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { SemiCircleComponent } from './semi-circle/semi-circle.component';
import { CenterChartComponent } from './center-chart/center-chart.component';

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
  imports: [CommonModule, NgApexchartsModule, SemiCircleComponent, CenterChartComponent],
  templateUrl: './summary-service.component.html',
  styleUrls: ['./summary-service.component.scss']
})
export class SummaryServiceComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  typeScore = [56, 40, 38, 28, 18, 0, 0, 0];

  lists = [
    { province: "กรุงเทพมหานคร", quantity: 450, top: "เปลี่ยนแบตเตอรี่" },
    { province: "นครราชสีมา", quantity: 250, top: "เปลี่ยนยาง" },
    { province: "นนทบุรี", quantity: 150, top: "เช็คระยะ" },
  ];

  constructor() {
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
}
