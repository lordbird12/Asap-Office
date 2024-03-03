import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DropdownTimeComponent } from 'app/shared/dropdown-time/dropdown-time.component';
import { PageService } from '../page.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, NgControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';
import { CheckboxServiceComponent } from 'app/shared/checkbox-service/checkbox.component';
import { DateDiffPipe } from 'app/date-diff-pipe.pipe';
import { CancelDialogComponent } from '../cancel-dialog/dailog.component';


@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent, MatAutocompleteModule, ReactiveFormsModule, CheckboxServiceComponent],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss'],


})
export class TicketCardComponent implements OnInit {
    serviceData: any[] = [];
    serviceCenterData: any[] = [];
    clientData: any[] = [];
    myControl = new FormControl('');
    ProductControl = new FormControl('');
    statusData = new FormControl('');
    filteredOptionsProduct: Observable<string[]>;
    selectedProduct: string = '';
    productData: any[] = [];
    categoryData: any[] = [];
    productFilter: any[] = [];
    form: FormGroup;
    service: { service_id: number }[] = [];
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<TicketCardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialog,
    ) {
        // console.log(this.data)
        this.form = this._fb.group({
            client_id: '',
            car_id: '',
            phone: '',
            name: '',
            service_center_id: '',
            reason: '',
            date: '',
            time: '',
            company: '',
            image: '',
            note: '',

            services: this._fb.array([])
        })

        this._service.getCar().subscribe((resp: any) => {
            this.productData = resp.data;
        })
        this._service.getServiceCenter().subscribe((resp: any) => {
            this.serviceCenterData = resp.data;

        })
        this._service.getCustomer().subscribe((resp: any) => {
            this.clientData = resp.data;
        })
    }
    yourArray: string[] = ['Item 1', 'Item 2', 'Item 3']; // ตัวอย่างของ Array
    yourDataArray: string[] = ['Item 2']; // ตัวอย่างของข้อมูลที่มีอยู่
    onChangeClient(event: any) {

        let formvalue = this.productData.find(item => item.car_id === event.value)
        this.form.patchValue({
            car_id: formvalue.car_id,
            client_id: formvalue.client.id,
            name: formvalue.client.name,
            phone: formvalue.client.phone,
            image: formvalue.car.pictureUrl,
            company: formvalue.client.company,
        })
    }

    testData: any[] = []
    serviceData1: any[] = []
    ngOnInit(): void {
        this.generateTimeOptions();
        // this.GetCar();
        this._service.getService().subscribe((resp: any) => {
            this.serviceData = resp.data;
        })
        console.log(this.data.value);

        if (this.data.value && this.productData) {
            this.testData = this.data.value.activitys;
            this.serviceData1 = this.data.value.services.map(item => item.service);
            this.yourArray1 = this.serviceData1
            this.statusData.setValue(this.data.value.status)
            this.form.patchValue({
                ...this.data.value,
                car_id: +this.data.value.car_id,
                client_id: +this.data.value.client_id,
                service_center_id: +this.data.value.service_center_id,
                time: this.convertTime(this.data.value.time ?? '00:00:00'),
                note: this.data.value.note ?? ''
            })
        } else {
            this.statusData.setValue('New')
        }
    }

    convertTime(inputTime: string): string {
        // แปลง string จากรูปแบบ 'HH:mm:ss' เป็น 'HH:mm'
        const timeArray = inputTime.split(':');
        const formattedTime = `${timeArray[0]}:${timeArray[1]}`;
        return formattedTime;
    }
    GetCar() {
        this._service.getCar().subscribe((resp: any) => {
            this.productData = resp.data;
        })
    }
    displayProduct(subject) {
        if (!subject) return '';
        let index = this.productData.findIndex(
            (state) => state.id === parseInt(subject)
        );
        return this.productData[index].license;
    }

    private _filterProduct(value: string): string[] {
        const filterValue = value;
        return this.productData.filter((option) =>
            option.license === filterValue
        );
    }



    timeOptions: string[] = [];
    generateTimeOptions(): void {
        for (let hour = 6; hour <= 20; hour++) {
            const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
            const time = `${formattedHour}:00`;
            this.timeOptions.push(time);
        }
    }

    onClose() {
        this.dialogRef.close();
    }
    addFeature(serviceId: number) {
        const service = this.form.get('services') as FormArray;

        // ตรวจสอบว่า featureId มีอยู่ใน FormArray หรือไม่
        const index = service.value.findIndex((value: any) => value.service_id === serviceId);
        // console.log(index)
        if (index === -1) {
            const value = this._fb.group({
                service_id: serviceId,
            });
            service.push(value);
            // console.log(this.form.value)

        } else {
            // ถ้ามีอยู่แล้วให้ลบออก
            service.removeAt(index);
        }
    }
    isChecked(serviceId: number): boolean {
        const service = this.form.get('services') as FormArray;
        return service.value.some((value: any) => value.service_id === serviceId);
    }
    changeStatus(event: any) {
        this.statusData.setValue(event.value)
    }
    onSaveClick(): void {
        if (this.data.value) {
            if (this.statusData.value === 'Cancel') {
                this.CancelStatus()
            } else {
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
                        const reason = '';
                        this.service = this.yourArray1.map(item => ({ service_id: item.id }))
                        this._service.updateStatus(this.data.value.id, this.statusData.value, reason, this.service, this.form.value.note).subscribe({
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
                    updatedData.date = moment(updatedData.date).format('YYYY-MM-DD');
                    this._service.create(updatedData).subscribe({
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

    getDaysAgo(created_at: string): string {
        const createdAtDate = new Date(created_at);
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

    // sortBy(property: string) {
    //     console.log(this.testData)
    //     this.testData.sort((a, b) => a[property].getTime() - b[property].getTime());


    //     this._changeDetectorRef.markForCheck();
    //   }

    sortBy(property: string) {
        this.testData.reverse();
        this._changeDetectorRef.markForCheck();
    }

    yourArray1: any[] = [];


    status: boolean = false;
    handleDataArrayChange(updatedArray: any[]): void {
        // this.status = !this.status;
        this.yourArray1 = updatedArray;
        console.log(this.yourArray1);
        
    }

    CancelStatus() {
        const dialogRef = this.dialog.open(CancelDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog
            data: {
                data: 1,
            }, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        });
        dialogRef.afterClosed().subscribe(result1 => {
            if (result1) {
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
                        const reason = result1
                        this.service = this.yourArray1.map(item => ({ service_id: item.id }))
                        this._service.updateStatus(this.data.value.id, this.statusData.value, reason, this.service, this.form.value.note).subscribe({
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
        })
    }
}
