import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() dataArrayChange = new EventEmitter<any[]>();
  ngOnInit(): void {

  }

  isChecked(item: any): boolean {
    // return this.dataArray.includes(item);
    return this.dataArray.some(dataItem => +dataItem.id === item);
  }

  toggleCheckbox(item: any): void {
    console.log(item)
    if (this.isChecked(item)) {
      this.dataArray = this.dataArray.filter(value => value !== item);
      this.dataArrayChange.emit(this.dataArray);
    } else {
      this.dataArray.push(item);
      this.dataArrayChange.emit(this.dataArray);
    }
  }

}
