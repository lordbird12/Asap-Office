import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DropdownTimeComponent } from 'app/shared/dropdown-time/dropdown-time.component';
import { PageService } from '../page.service';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    NgControl,
    ReactiveFormsModule,
} from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import moment from 'moment';
import { CheckboxServiceComponent } from 'app/shared/checkbox-service/checkbox.component';
import { DateDiffPipe } from 'app/date-diff-pipe.pipe';
import { CancelDialogComponent } from '../cancel-dialog/dailog.component';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [
        FormsModule,
        NgSelectModule,
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        DropdownTimeComponent,
        MatAutocompleteModule,
        ReactiveFormsModule,
        CheckboxServiceComponent,
    ],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss'],
})
export class TicketCardComponent implements OnInit {
    serviceData: any[] = [];
    serviceCenterData: any[] = [];
    clientData: any[] = [];
    // myControl = new FormControl('');
    ProductControl = new FormControl('');
    statusData = new FormControl('');
    filteredOptionsProduct: Observable<string[]>;
    selectedProduct: string = '';
    productData: any[] = [];
    categoryData: any[] = [];
    productFilter: any[] = [];
    form: FormGroup;
    service: { service_id: number }[] = [];

    selectedCar: number;
    note_text: boolean = false;

    cars = [
        { id: 1, name: 'Volvo' },
        { id: 2, name: 'Saab' },
        { id: 3, name: 'Opel' },
        { id: 4, name: 'Audi' },
    ];



    //ทดสอบ 


    //ทดสอบ 



    myControl = new FormControl<string | any>('');
    myControl1 = new FormControl<string | any>('');
    options: any[] = [];
    filteredOptions: Observable<any[]>;
    filteredOptions1: Observable<any[]>;
    date: string ='';
    time: string ='';
    phone: string ='';
    service_center_id: string ='';
    constructor(
        private _service: PageService,
        private dialogRef: MatDialogRef<TicketCardComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private dialog: MatDialog
    ) {
      console.log(this.data.value)
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
            services: this._fb.array([]),
        });

        this._service.getCar().subscribe((resp: any) => {
            this.productData = resp.data;
        });
        this._service.getServiceCenter().subscribe((resp: any) => {
            this.serviceCenterData = resp.data;
            // this.filteredOptions1 = resp.data
        });
        this._service.getCustomer().subscribe((resp: any) => {
            this.clientData = resp.data;
        });
    }
    yourArray: string[] = ['Item 1', 'Item 2', 'Item 3']; // ตัวอย่างของ Array
    yourDataArray: string[] = ['Item 2']; // ตัวอย่างของข้อมูลที่มีอยู่
    onChangeClient(event: any) {
        const selectedOption = event.option.value;
        this.form.patchValue({
            car_id: selectedOption.car_id,
            client_id: selectedOption.client.id,
            name: selectedOption.client.name,
            phone: selectedOption.client.phone,
            image: selectedOption.car.pictureUrl,
            company: selectedOption.client.company,
        });
        this._changeDetectorRef.markForCheck();
    }
    onChangeServiceCenter(event: any) {
        const selectedOption = event.option.value;
        // console.log(selectedOption);

        this.form.patchValue({
            service_center_id: selectedOption.id,
        });
        this._changeDetectorRef.markForCheck();
    }

    displayFn(user: any): string {
        // console.log('user',user)

        return user && user.license_plate ? user.license_plate : '';
    }

    private _filter(name: string): any[] {
        const filterValue = name;

        return this.productData.filter((option) =>
            option.license_plate.toLowerCase().includes(filterValue)
        );
    }
    displayFn1(user: any): string {
        // console.log('user',user)

        return user && user.name ? user.name : '';
    }

    private _filter1(name: string): any[] {
        const filterValue = name;

        return this.serviceCenterData.filter((option) =>
            option.name.toLowerCase().includes(filterValue)
        );
    }

    testData: any[] = [];
    serviceData1: any[] = [];
    ngOnInit(): void {

        this.generateTimeOptions();
        // this.GetCar();
        this._service.getService().subscribe((resp: any) => {
            this.serviceData = resp.data;
        });
        if (this.data.value && this.productData) {
            this.date = this.data.value?.date;
            this.time = this.convertTime(this.data.value.time ?? '00:00:00');
            this.phone = this.data.value?.phone;
            this.service_center_id = this.data.value?.service_center_id;
            this.testData = this.data.value.activitys;

            this.Array1 = this.data.value.services.map(item => {
                return {
                    service_id: +item.service_id,
                    status: 'old'
                };
            });
            // console.log('Array1', this.Array1);
            this.Array2 = this.data.value.services.map(item => {
                return {
                    service_id: +item.service_id,
                    status: 'old'
                };
            });
            // console.log('Array2', this.Array2);
            this.serviceData1 = this.data.value.services.map(
                (item) => item.service
            );
            this.yourArray1 = this.serviceData1;
            // console.log('Array2', this.Array2)
            this.statusData.setValue(this.data.value.status);
            this.form.patchValue({
                ...this.data.value,
                car_id: +this.data.value.car_id,
                client_id: +this.data.value.client_id,
                service_center_id: +this.data.value.service_center_id,
                time: this.convertTime(this.data.value.time ?? '00:00:00'),
            });
            this.myControl1.patchValue(this.data.value.service_center)

            this.checknote(this.data.value.services);
        } else {
            this.statusData.setValue('New');
        }

        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map((value) => this._filter(value || ''))
        );

        this.filteredOptions1 = this.myControl1.valueChanges.pipe(
            startWith('1'),
            map((value) => this._filter1(value || ''))

        );

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
        });
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
        return this.productData.filter(
            (option) => option.license === filterValue
        );
    }

    timeOptions: object[] = [
        {
            code: '08:00',
            name: '8:00 am',
        },
        {
            code: '09:00',
            name: '9:00 am',
        },
        {
            code: '10:00',
            name: '10:00 am',
        },
        {
            code: '11:00',
            name: '11:00 am',
        },
        {
            code: '12:00',
            name: '12:00 pm',
        },
        {
            code: '01:00',
            name: '1:00 pm',
        },
        {
            code: '02:00',
            name: '2:00 pm',
        },
        {
            code: '03:00',
            name: '3:00 pm',
        },
        {
            code: '04:00',
            name: '4:00 pm',
        },
        {
            code: '05:00',
            name: '5:00 pm',
        },
        {
            code: '06:00',
            name: '6:00 pm',
        },
        {
            code: '07:00',
            name: '7:00 pm',
        },
    ];

    generateTimeOptions(): void {
        for (let hour = 6; hour <= 20; hour++) {
            const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;
            const time = `${formattedHour}:00`;
            // this.timeOptions.push(time);
        }
    }

    onClose() {
        this.dialogRef.close();
    }
    addFeature(serviceId: number) {
        const service = this.form.get('services') as FormArray;

        // ตรวจสอบว่า featureId มีอยู่ใน FormArray หรือไม่
        const index = service.value.findIndex(
            (value: any) => value.service_id === serviceId
        );
        // console.log(index)
        if (index === -1) {
            const value = this._fb.group({
                service_id: serviceId,
                note: '',
            });
            service.push(value);
            if (serviceId == 8) {
                this.note_text = true;
            }
            // console.log(this.form.value)
        } else {
            if (serviceId == 8) {
                this.note_text = false;
            }
            // ถ้ามีอยู่แล้วให้ลบออก
            service.removeAt(index);
        }
    }
    isChecked(serviceId: number): boolean {
        const service = this.form.get('services') as FormArray;
        return service.value.some(
            (value: any) => value.service_id === serviceId
        );
    }
    changeStatus(event: any) {
        this.statusData.setValue(event.value);
    }
    onSaveClick(): void {
        if (this.data.value) {
            if (this.statusData.value === 'Cancel') {
                this.CancelStatus();
            } else {
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
                        const reason = '';
                        let formValue = this.form.value
                        let date_select = moment(new Date(this.form.value.date)).format('YYYY-MM-DD')
      
                        if (this.date !== date_select) {
                            formValue.date = date_select; // ตัวแปร date ถูกอัพเดทเมื่อมีการเปลี่ยนแปลง
                        } else {
                            formValue.date = ''; // ถ้าเลือกค่าเดิมอีกครั้ง ให้ตัวแปร date เป็นค่าว่าง
                        }

                        if (this.time !== formValue.time) {
                            formValue.time = this.form.value.time; // ตัวแปร date ถูกอัพเดทเมื่อมีการเปลี่ยนแปลง
                        } else {
                            formValue.time = ''; // ถ้าเลือกค่าเดิมอีกครั้ง ให้ตัวแปร date เป็นค่าว่าง
                        }

                        if (this.phone !== formValue.phone) {
                            formValue.phone = this.form.value.phone; // ตัวแปร date ถูกอัพเดทเมื่อมีการเปลี่ยนแปลง
                        } else {
                            formValue.phone = ''; // ถ้าเลือกค่าเดิมอีกครั้ง ให้ตัวแปร date เป็นค่าว่าง
                        }

                        if (this.service_center_id !== this.myControl1.value) {
                            formValue.service_center_id = this.myControl1.value; // ตัวแปร date ถูกอัพเดทเมื่อมีการเปลี่ยนแปลง
                        } else {
                            formValue.service_center_id = ''; // ถ้าเลือกค่าเดิมอีกครั้ง ให้ตัวแปร date เป็นค่าว่าง
                        }

                        console.log(this.myControl1.value);
                        return;
                 
                        if (this.yourArray1) {
                            this.yourArray1.forEach(item => {
                                const foundIndex = this.Array2.findIndex(service => service.service_id === item.id);
                                if (foundIndex === -1) {
                                    // ไม่พบ id ใน Array2, เพิ่มใหม่
                                    this.Array2.push({
                                        service_id: item.id,
                                        status: 'new'
                                    });
                                } else {
                              
                                }
                            });
                            this.compareArrays()
                            // console.log('array2', this.newArray);
                        }
                        this._service
                            .updateStatus(
                                this.data.value.id,
                                this.statusData.value,
                                reason,
                                this.newArray,
                                this.form.value.note,
                                formValue.time,
                                formValue.date,
                                formValue.phone,
                                formValue.service_center_id,
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
            }
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

                    for (
                        let index = 0;
                        index < updatedData.services.length;
                        index++
                    ) {
                        if (updatedData.services[index].service_id == 8) {
                            updatedData.services[index].note =
                                this.form.value.note;
                        }
                    }


                    updatedData.date = moment(updatedData.date).format(
                        'YYYY-MM-DD'
                    );
                    this._service.create(updatedData).subscribe({
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
            const daysDifference = Math.floor(
                timeDifference / (1000 * 60 * 60 * 24)
            );
            return daysDifference === 1
                ? 'Yesterday'
                : `${daysDifference} days ago`;
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

    checknote(Array: any) {
        const service_other = Array.find((item) => item.service_id === '8');
        // console.log('Arary', service_other);
        if (service_other) {
            this.form.patchValue({
                note: service_other?.note ?? '',
            });
        } else {
            return;
        }
    }

    yourArray1: any[] = [];

    status: boolean = false;

    handleDataArrayChange(updatedArray: any): void {
        // console.log(updatedArray)
        this.yourArray1 = updatedArray
    }

    CancelStatus() {
        const dialogRef = this.dialog.open(CancelDialogComponent, {
            width: '500px', // กำหนดความกว้างของ Dialog
            data: {
                data: 1,
            }, // ส่งข้อมูลเริ่มต้นไปยัง Dialog
        });
        dialogRef.afterClosed().subscribe((result1) => {
            if (result1) {
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
                        const reason = result1;
                        this.service = this.yourArray1.map((item) => ({
                            service_id: item.id,
                        }));
                        this._service
                            .updateStatus(
                                this.data.value.id,
                                this.statusData.value,
                                reason,
                                this.service,
                                this.form.value.note,
                                formValue.time,
                                formValue.date,
                                formValue.phone,
                                formValue.service_center
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
            }
        });
    }

    Array1 = [

    ];

    Array2 = [

    ];
    newArray: any[] = [];

    compareArrays(): void {
        this.newArray = [];
        this.Array2 = this.Array2.filter(service => {
            return this.yourArray1.some(item => item.id === service.service_id);
        });
        // Loop through yourArray1
        for (const item1 of this.Array1) {
            let found = false;
            // Check if item1 exists in yourArray2
            for (const item2 of this.Array2) {
                if (item1.service_id === item2.service_id) {
                    this.newArray.push({ service_id: item2.service_id, status: 'old' });
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
                if (item2.service_id === newItem.service_id) {
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

    onDateTimeChange(newDate: any) {
        let date1 = ''
        let date_select = moment(new Date(newDate.value)).format('YYYY-MM-DD')
      
        if (this.date !== date_select) {
          date1 = date_select; // ตัวแปร date ถูกอัพเดทเมื่อมีการเปลี่ยนแปลง
        } else {
            date1 = ''; // ถ้าเลือกค่าเดิมอีกครั้ง ให้ตัวแปร date เป็นค่าว่าง
        }
       
        
      }
}
