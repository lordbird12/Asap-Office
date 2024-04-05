import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DropdownTimeComponent } from 'app/shared/dropdown-time/dropdown-time.component';
import { PageService } from '../page.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxTopicComponent } from 'app/shared/checkbox-topic/checkbox.component';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent,FormsModule, CheckboxTopicComponent],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss']
})
export class DetailTicketComponent implements OnInit {
    note: string = '';
    serviceData: any[] = []
    serviceCenterData: any[] = []
    activities: any[] = []
    dataArray: any[] = [];
    topics: any[] = [
        'อุบัติเหตุ',
        'งานปัญหา (ระบุในรายละเอียด)',
        'ติดตามสถานะงานซ่อม',
        'ขอรถทดแทน / ติดตามรถทดแทน',
        'ติดตามป้ายภาษี / พรบ. / กรมธรรม์',
        'ติดตามใบสั่งซ่อม / ติดตามใบเสนอราคา',
        'ศูนย์บริการเสนอราคาเพิ่มเติม',
        'ลืมของไว้ในรถ',
        'ลืมกุญแจรถยนต์ / กุญแจรถยนต์หาย',
        'โอนสาย รถเช่าระยะสั้น / รถเช่าสนามบิน /asap app',
        'ร้องเรียนพนักงาน',
        'ติดตามค่าปรับ',
        'ติดตามรถยนต์เข้าไปใส่อะไหล่',
        'สอบถามราคารถเช่า',
        'โอนสาย (แผนกอื่น)',
        'สายหลุด',
        'อื่นๆ (Other : ระบุเพิ่มเติมในรายละเอียด)',
    ];
    statusData = new FormControl('');
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<DetailTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
    ) {

        console.log('data', this.data)

        this._service.getService().subscribe((resp: any) => {
            this.serviceData = resp.data;

        })
        this._service.getServiceCenter().subscribe((resp: any) => {
            this.serviceCenterData = resp.data;

        })

    }

    ngOnInit(): void {
        this.note = this.data.note
        this.activities = this.data.activitys
        console.log(this.data.status);
        this.statusData.setValue(this.data.status)
        this.dataArray = this.data.ticket_topics.map(topic => topic.status);
      
    }

    onClose() {
        this.dialogRef.close();
    }
    changeStatus(event: any) {
        this.statusData.setValue(event.value)
    }

    isChecked(item: any): boolean {
        return this.dataArray.includes(item);
    }

    toggleCheckbox(item: string): void {

        if (this.isChecked(item)) {

            this.dataArray = this.dataArray.filter(value => value !== item);
        } else {

            this.dataArray.push(item);
        }
    }
    onSaveClick(): void {
        if (this.data) {
            const confirmation = this._fuseConfirmationService.open({
                "title": "เปลี่ยนสถานะ",
                "message": "คุณต้องการเปลี่ยนสถานะใช่หรือไม่ ",
                "icon": {
                    "show": false,
                    "name": "heroicons_outline:exclamation",
                    "color": "warning"
                },
                "actions": {
                    "confirm": {
                        "show": true,
                        "label": "ยืนยัน",
                        "color": "primary"
                    },
                    "cancel": {
                        "show": true,
                        "label": "ยกเลิก"
                    }
                },
                "dismissible": true
            });

            // Subscribe to the confirmation dialog closed action
            confirmation.afterClosed().subscribe((result) => {
                if (result === 'confirmed') {
                    this._service.updateStatusTicket(this.data.id, this.statusData.value).subscribe({
                        next: (resp: any) => {
                            this.dialogRef.close(resp);
                        },
                        error: (err: any) => {

                            this._fuseConfirmationService.open({
                                "title": "กรุณาระบุข้อมูล",
                                "message": err.error.message,
                                "icon": {
                                    "show": true,
                                    "name": "heroicons_outline:exclamation",
                                    "color": "warning"
                                },
                                "actions": {
                                    "confirm": {
                                        "show": false,
                                        "label": "ยืนยัน",
                                        "color": "primary"
                                    },
                                    "cancel": {
                                        "show": false,
                                        "label": "ยกเลิก",

                                    }
                                },
                                "dismissible": true
                            });
                        }
                    })
                }
            })
        } else {

        }


        // แสดง Snackbar ข้อความ "complete"

    }
    getDaysAgo(created_at: string): string {
        let createdAtDate;

        if (created_at) {
          // ถ้า created_at ไม่ใช่ null
          createdAtDate = new Date(created_at);
        } else {
          // ถ้า created_at เป็น null
          createdAtDate = new Date();
        }
        
        const currentDate = new Date();
    
        const timeDifference = currentDate.getTime() - createdAtDate.getTime();
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        // console.log(minutesDifference)
        if (minutesDifference < 60) {
          return `${minutesDifference} min ago`;
        } else if (hoursDifference < 24) {
          return `${hoursDifference} hour ago`;
        } else {
          const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
          return daysDifference === 1 ? 'Yesterday' : `${daysDifference} days ago`;
        }
    }
    sortBy(property: string) {
        this.activities.reverse();
        this._changeDetectorRef.markForCheck();
      }
      yourArray1: any[] = [];
      handleDataArrayChange(updatedArray: any): void {
          this.yourArray1 = updatedArray
          console.log(this.yourArray1)
    }
}
