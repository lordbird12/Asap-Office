import { Component, Inject, OnInit } from '@angular/core';
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
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss']
})
export class DetailTicketComponent implements OnInit {
    serviceData: any[] = []
    serviceCenterData: any[] = []
    activities : any[] = []
    topics: any[] = [
        'รถเสียฉุกเฉิน',
        'อุบัติเหตุ',
        'ติดตามรถทดแทน',
        'ติดตามงานบริหารรถยนต์',
        'อื่นๆ',
    ];
    statusData = new FormControl('');
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<DetailTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fuseConfirmationService: FuseConfirmationService,
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
        this.dataArray = this.data.ticket_topic
        this.activities = this.data.activitys
        this.statusData.setValue(this.data.status)
    }

    onClose() {
        this.dialogRef.close();
    }
    changeStatus(event: any) {
        this.statusData.setValue(event.value)
      }
    dataArray: any[] = [];
    isChecked(item: any): boolean {
        console.log('item',item)
        // console.log(this.dataArray)
        // return this.dataArray.includes(item);
        return this.dataArray.some(dataItem => dataItem.status === item);
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
                    this._service.updateStatusTicket(this.data.id , this.statusData.value).subscribe({
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

}
