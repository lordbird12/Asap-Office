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
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent, ReactiveFormsModule],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss']
})
export class CreateComponent implements OnInit{
    serviceData: any[] = []
    serviceCenterData: any[] = []
    clientData: any[] = []
    productData: any[] = []
    statusData = new FormControl('');
    topics: any[] = [
        'รถเสียฉุกเฉิน',
        'อุบัติเหตุ',
        'ติดตามรถทดแทน',
        'ติดตามงานบริหารรถยนต์',
        'อื่นๆ',
    ]
    form : FormGroup;
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<CreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb:FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
    ) 
    {
        this.form = this._fb.group({
            client_id: '',
            car_id: '',
            phone: '',
            note: '',
            cliphoneent_id: '',
            status: 'New',
            ticket_topics: this._fb.array([])
        })
        console.log('data', this.data?.id)

        this._service.getService().subscribe((resp: any)=>{
           this.serviceData = resp.data;
            
        })
        this._service.getServiceCenter().subscribe((resp: any)=>{
           this.serviceCenterData = resp.data;
            
        })

        this._service.getCustomer().subscribe((resp: any)=>{
            this.clientData = resp.data;
             
         })
         this._service.getCar().subscribe((resp: any)=>{
            this.productData = resp.data;
         })
    }

    onChangeClient(event: any) {
        console.log(event.value)
        let formvalue = this.clientData.find(item =>  item.id === event.value)
        console.log(formvalue)
        this.form.patchValue({
            client_id: formvalue.id,
            phone: formvalue.phone,
        })
     

    }
    ngOnInit(): void {

    }

    onClose() {
        this.dialogRef.close();
    } 

    isChecked(serviceId: number): boolean {
        const service = this.form.get('ticket_topics') as FormArray;
        return service.value.some((value: any) => value.topic === serviceId);
      }

    
      addFeature(serviceId: string) {
        const service = this.form.get('ticket_topics') as FormArray;
        // ตรวจสอบว่า featureId มีอยู่ใน FormArray 
        console.log(serviceId)
        const index = service.value.findIndex((value: any) => value.topic === serviceId);
        console.log(index)
        if (index === -1) {
            const value = this._fb.group({
                topic: serviceId,
            }); 
            service.push(value);
            console.log(this.form.value)
           
        } else {
          // ถ้ามีอยู่แล้วให้ลบออก
          service.removeAt(index);
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
                            this.form.enable();
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
            const confirmation = this._fuseConfirmationService.open({
                "title": "เพิ่มข้อมูล",
                "message": "คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ",
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
                    const updatedData = this.form.value;
                    // updatedData.date = moment(updatedData.date).format('YYYY-MM-DD');
                    this._service.createTicket(updatedData).subscribe({
                        next: (resp: any) => {
                            this.dialogRef.close(resp);
                        },
                        error: (err: any) => {
                            this.form.enable();
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
        }


        // แสดง Snackbar ข้อความ "complete"

    }
}
