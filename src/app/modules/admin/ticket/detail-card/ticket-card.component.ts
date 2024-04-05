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
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NgControl,
    ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxTopicComponent } from 'app/shared/checkbox-topic/checkbox.component';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        DropdownTimeComponent,
        FormsModule,
        CheckboxTopicComponent,
    ],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss'],
})
export class DetailTicketComponent implements OnInit {
    note: string = '';
    phone: string = '';
    serviceData: any[] = [];
    serviceCenterData: any[] = [];
    activities: any[] = [];
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
    Array1 = [];

    Array2 = [];
    newArray: any[] = [];
    form: FormGroup;
    statusData = new FormControl('');
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<DetailTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fb: FormBuilder,
    ) {
        // console.log('data', this.data);

        this._service.getService().subscribe((resp: any) => {
            this.serviceData = resp.data;
        });
        this._service.getServiceCenter().subscribe((resp: any) => {
            this.serviceCenterData = resp.data;
        });

        this.form = this._fb.group({
            phone: '',
        });
    }
    serviceData1: any[] = [];

    ngOnInit(): void {
        this.note = this.data.note;
        this.activities = this.data.activitys;
        this.phone = this.data.phone;
        this.statusData.setValue(this.data.status);
        this.dataArray = this.data.ticket_topics.map((topic) => topic.status);

        this.Array1 = this.data.ticket_topics.map((item) => {
            return {
                topic: item.status,
                status: 'old',
            };
        });
        this.Array2 = this.data.ticket_topics.map((item) => {
            return {
                topic: item.status,
                status: 'old',
            };
        });

        this.serviceData1 = this.data.ticket_topics.map(
            (item) => item.status
        );
        this.yourArray1 = this.serviceData1;
        this.form.patchValue({
            phone: +this.phone,
        });
    }

    compareArrays(): void {
        this.newArray = [];
        this.Array2 = this.Array2.filter((service) => {
            return this.yourArray1.some((item) => item === service.topic);
        });
        // Loop through yourArray1
        for (const item1 of this.Array1) {
            let found = false;
            // Check if item1 exists in yourArray2
            for (const item2 of this.Array2) {
                if (item1.topic === item2.topic) {
                    this.newArray.push({
                        topic: item2.topic,
                        status: 'old',
                    });
                    found = true;
                    break;
                }
            }

            // If item1 does not exist in yourArray2, add it with status 'remove'
            if (!found) {
                this.newArray.push({ ...item1, status: 'remove' });
            }
        }

        // Loop through yourArray2 to find new items
        for (const item2 of this.Array2) {
            let found = false;

            // Check if item2 exists in newArray
            for (const newItem of this.newArray) {
                if (item2.topic === newItem.topic) {
                    found = true;
                    break;
                }
            }
            // If item2 does not exist in newArray, add it with status 'new'
            if (!found) {
                this.newArray.push({ ...item2, status: 'new' });
            }
        }
    }

    onClose() {
        this.dialogRef.close();
    }
    changeStatus(event: any) {
        this.statusData.setValue(event.value);
    }

    isChecked(item: any): boolean {
        return this.dataArray.includes(item);
    }

    toggleCheckbox(item: string): void {
        if (this.isChecked(item)) {
            this.dataArray = this.dataArray.filter((value) => value !== item);
        } else {
            this.dataArray.push(item);
        }
    }
    onSaveClick(): void {
        const confirmation = this._fuseConfirmationService.open({
            title: 'เปลี่ยนสถานะ',
            message: 'คุณต้องการเปลี่ยนสถานะใช่หรือไม่ ',
            icon: {
                show: false,
                name: 'heroicons_outline:exclamation',
                color: 'warning',
            },
            actions: {
                confirm: {
                    show: true,
                    label: 'ยืนยัน',
                    color: 'primary',
                },
                cancel: {
                    show: true,
                    label: 'ยกเลิก',
                },
            },
            dismissible: true,
        });

        // Subscribe to the confirmation dialog closed action
        confirmation.afterClosed().subscribe((result) => {
            if (result === 'confirmed') {
                let formValue = this.form.value;
                if (this.phone !== ""+formValue.phone) {
                    formValue.phone = this.form.value.phone; // ตัวแปร date ถูกอัพเดทเมื่อมีการเปลี่ยนแปลง
                } else {
                    formValue.phone = ''; // ถ้าเลือกค่าเดิมอีกครั้ง ให้ตัวแปร date เป็นค่าว่าง
                }

                if (this.yourArray1) {
                    this.yourArray1.forEach((item) => {
                        const foundIndex = this.Array2.findIndex(
                            (service) => service.topic === item
                        );
                        if (foundIndex === -1) {
                            // ไม่พบ id ใน Array2, เพิ่มใหม่
                            this.Array2.push({
                                topic: item,
                                status: 'new',
                            });
                        } else {
                        }
                    });
                    this.compareArrays();
                    // console.log('array2', this.Array2);
                    // console.log('new2', this.newArray);
        
                }

                this._service
                    .updateStatusTicket(this.data.id, this.statusData.value,this.newArray,formValue.phone)
                    .subscribe({
                        next: (resp: any) => {
                            this.dialogRef.close(resp);
                        },
                        error: (err: any) => {
                            this._fuseConfirmationService.open({
                                title: 'กรุณาระบุข้อมูล',
                                message: err.error.message,
                                icon: {
                                    show: true,
                                    name: 'heroicons_outline:exclamation',
                                    color: 'warning',
                                },
                                actions: {
                                    confirm: {
                                        show: false,
                                        label: 'ยืนยัน',
                                        color: 'primary',
                                    },
                                    cancel: {
                                        show: false,
                                        label: 'ยกเลิก',
                                    },
                                },
                                dismissible: true,
                            });
                        },
                    });
            }
        });

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
            const daysDifference = Math.floor(
                timeDifference / (1000 * 60 * 60 * 24)
            );
            return daysDifference === 1
                ? 'Yesterday'
                : `${daysDifference} days ago`;
        }
    }
    sortBy(property: string) {
        this.activities.reverse();
        this._changeDetectorRef.markForCheck();
    }
    yourArray1: any[] = [];
    handleDataArrayChange(updatedArray: any): void {
        this.yourArray1 = updatedArray;
        console.log(this.yourArray1);
    }
}
