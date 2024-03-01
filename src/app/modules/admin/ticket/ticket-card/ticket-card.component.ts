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
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent implements OnInit{
    serviceData: any[] = [];
    serviceCenterData: any[] = [];
    form: FormGroup
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<TicketCardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder
    ) 
    {


        this.form = this._fb.group({
            client_id: '',
            car_id: '',
            phone: '',
            name: '',
            service_center_id: '',
            reason: '',
            time: '',
            services: this._fb.array([])
        })

        this._service.getService().subscribe((resp: any)=>{
           this.serviceData = resp.data;
            
        })
        this._service.getServiceCenter().subscribe((resp: any)=>{
           this.serviceCenterData = resp.data;
            
        })

    }

    ngOnInit(): void {

    }

    onClose() {
        this.dialogRef.close();
    } 
    addFeature(serviceId: number) {
        const service = this.form.get('services') as FormArray;
        
        // ตรวจสอบว่า featureId มีอยู่ใน FormArray หรือไม่
        const index = service.value.findIndex((value: any) => value.service_id === serviceId);
        console.log(index)
        if (index === -1) {
            const value = this._fb.group({
                service_id: serviceId,
            }); 
            service.push(value);
            console.log(this.form.value)
           
        } else {
          // ถ้ามีอยู่แล้วให้ลบออก
          service.removeAt(index);
        }
      }
    isChecked(serviceId: number): boolean {
        const service = this.form.get('services') as FormArray;
        return service.value.some((value: any) => value.service_id === serviceId);
      }

    

}
