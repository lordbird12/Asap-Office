import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { isEqual } from 'lodash';

@Component({
  selector: 'app-checkbox-service',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule,FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxServiceComponent implements OnInit{

  timeOptions: string[] = [];
  @Input() items: any[] = [];
  @Input() dataArray: any[] = [];

  ngOnInit(): void {
    // console.log('items',this.items)
    // console.log('dataArray',this.dataArray)
    
  }

  isChecked(item: any): boolean {
    // return this.dataArray.includes(item);
    return this.dataArray.some(dataItem => dataItem.id === item);
  }

  toggleCheckbox(item: string): void {
    console.log('data',item);
    
    if (this.isChecked(item)) {
      
      this.dataArray = this.dataArray.filter(value => value !== item);
    } else {
      
      this.dataArray.push(item);
    }
  }

}
