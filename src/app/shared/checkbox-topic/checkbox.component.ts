import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-checkbox-topic',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule,ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxTopicComponent implements OnInit{

  timeOptions: string[] = [];
  @Input() topics: any[] = [];
  @Input() dataArray: any[] = [];
  items: any[] = [
    'รถเสียฉุกเฉิน',
    'อุบัติเหตุ',
    'ติดตามรถทดแทน',
    'ติดตามงานบริหารรถยนต์',
    'อื่นๆ',
];

  ngOnInit(): void {
    // console.log('items',this.items)
    console.log('dataArray',this.dataArray)
  }

  isChecked(item: any): boolean {
    console.log(item)
    return this.dataArray.includes(item);
    // return this.dataArray.some(dataItem => dataItem.id === item);
  }

  toggleCheckbox(item: string): void {

    if (this.isChecked(item)) {
      
      this.dataArray = this.dataArray.filter(value => value !== item);
    } else {
      
      this.dataArray.push(item);
    }
  }

}
