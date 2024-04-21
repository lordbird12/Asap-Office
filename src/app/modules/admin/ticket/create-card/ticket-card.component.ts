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
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    ReactiveFormsModule,
} from '@angular/forms';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        DropdownTimeComponent,
        ReactiveFormsModule,
        MatAutocompleteModule,
    ],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss'],
})
export class CreateComponent implements OnInit {
    serviceData: any[] = [];
    serviceCenterData: any[] = [];
    clientData: any[] = [];
    productData: any[] = [];
    statusData = new FormControl('');
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
    form: FormGroup;
    myControl = new FormControl<string | any>('');
    options: any[] = [];
    filteredOptions: Observable<any[]>;
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<CreateComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.form = this._fb.group({
            client_id: '',
            car_id: '',
            phone: '',
            name: '',
            company: '',
            note: '',
            cliphoneent_id: '',
            status: 'New',
            ticket_topics: this._fb.array([]),
        });
        console.log('data', this.data?.id);

        this._service.getService().subscribe((resp: any) => {
            this.serviceData = resp.data;
        });
        this._service.getServiceCenter().subscribe((resp: any) => {
            this.serviceCenterData = resp.data;
        });

        this._service.getCustomer().subscribe((resp: any) => {
            this.clientData = resp.data;
        });
        this._service.getCar().subscribe((resp: any) => {
            this.productData = resp.data;
            console.log('get_car', this.productData);
        });
    }

    onChangeClient(event: any) {
        const selectedOption = event.option.value;
console.log(selectedOption);
        this.form.patchValue({
            car_id: selectedOption.car_id,
            client_id: selectedOption.client.id,
            // name: selectedOption.client.name,
            // phone: selectedOption.client.phone,
            image: selectedOption.car.pictureUrl,
            company: selectedOption.client.company,
        });
        this._changeDetectorRef.markForCheck();
    }

    ngOnInit(): void {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );
    }

    displayFn(user: any): string {
        // console.log('user',user)

        return user && user.license_plate ? user.license_plate : '';
    }

    private _filter(name: string): any[] {
        const filterValue = name;

        return this.productData.filter((option) =>
            option.license_plate?.toLowerCase().includes(filterValue)
        );
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
        console.log(serviceId);
        const index = service.value.findIndex(
            (value: any) => value.topic === serviceId
        );
        console.log(index);
        if (index === -1) {
            const value = this._fb.group({
                topic: serviceId,
                status: '',
            });
            service.push(value);
        } else {
            // ถ้ามีอยู่แล้วให้ลบออก
            service.removeAt(index);
        }
    }

    onSaveClick(): void {
        if (this.data) {
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
                    this._service
                        .updateStatusTicket(
                            this.data.id,
                            this.statusData.value,
                            null,
                            null,
                            null
                        )
                        .subscribe({
                            next: (resp: any) => {
                                this.dialogRef.close(resp);
                            },
                            error: (err: any) => {
                                this.form.enable();
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
        } else {
            const confirmation = this._fuseConfirmationService.open({
                title: 'เพิ่มข้อมูล',
                message: 'คุณต้องการเพิ่มข้อมูลใช่หรือไม่ ',
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
                    const updatedData = this.form.value;
                    // updatedData.date = moment(updatedData.date).format('YYYY-MM-DD');
                    this._service.createTicket(updatedData).subscribe({
                        next: (resp: any) => {
                            this.dialogRef.close(resp);
                        },
                        error: (err: any) => {
                            this.form.enable();
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
        }

        // แสดง Snackbar ข้อความ "complete"
    }
}
