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
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxServiceComponent implements OnInit {

  timeOptions: string[] = [];
  @Input() items: any[] = [];
  @Input() dataArray: any[] = [];
  @Output() dataArrayChange = new EventEmitter<any[]>();
  ngOnInit(): void {
    // console.log('dataArray',this.dataArray)
  }

  isChecked(item: any): boolean {
    return this.dataArray.some(dataItem => +dataItem.id === item);
  }

  // toggleCheckbox1(item: any): void {
  //   if (this.isChecked(item)) {
  //     this.dataArray = this.dataArray.filter(value => value !== item);
  //     // this.dataArrayChange.emit(this.dataArray);
  //   } else {
  //     this.dataArray.push(item);
  //     this.dataArrayChange.emit(this.dataArray);
  //   }
  //   // ตรวจสอบทุกรายการที่ถูกเลือก
    
  // }


  toggleCheckbox(item: any): void {
    // คำนวณเฉพาะรายการที่ไม่ซ้ำใน Set
    const uniqueItemsSet = new Set(this.dataArray.map(dataItem => dataItem.id));
    // ตรวจสอบว่า item มีอยู่ใน uniqueItemsSet หรือไม่
    const isChecked = uniqueItemsSet.has(item.id);
    if (isChecked) {
      // ถ้ามี, ให้ลบ item ออกจาก uniqueItemsSet
      uniqueItemsSet.delete(item.id);
      this.dataArray = this.dataArray.filter(value => value !== item);
    } else {
      // ถ้าไม่มี, ให้เพิ่ม item เข้าไปใน uniqueItemsSet
      uniqueItemsSet.add(item.id);
      this.dataArray.push(item);
    }
    // แปลง Set กลับเป็น Array และกำหนดให้เป็นค่าใหม่ของ dataArray
    this.dataArray = Array.from(uniqueItemsSet).map(id => this.dataArray.find(item => item.id === id));
    // ทำการ emit ข้อมูลใหม่ไปยังคอมโพเนนต์
    this.dataArrayChange.emit(this.dataArray);
  }

}
