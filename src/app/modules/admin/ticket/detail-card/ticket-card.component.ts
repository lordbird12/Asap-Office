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

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss']
})
export class DetailTicketComponent implements OnInit{
    serviceData: any[] = []
    serviceCenterData: any[] = []
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<DetailTicketComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) 
    {

        console.log('data', this.data?.id)

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



    

}
