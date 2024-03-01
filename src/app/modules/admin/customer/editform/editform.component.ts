import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import {
    FormArray,
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { PageService } from '../page.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectCarComponent } from '../select-car/select-car.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'edit-form-customer',
    templateUrl: './editform.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        MatInputModule,
        TextFieldModule,
        ReactiveFormsModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatOptionModule,
        MatChipsModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        MatRadioModule,
        CommonModule,
        NgxDropzoneModule,
        MatDividerModule,
    ],
})
export class EditFormComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    newcar: FormGroup;
    isLoading: boolean = false;
    positions: any[];
    permissions: any[];
    itemitem: any;
    id: any;
    flashMessage: 'success' | 'error' | null = null;
    selectedFile: File = null;
    constructor(
        private dialog: MatDialog,
        private _formBuilder: FormBuilder,
        private formBuilder: FormBuilder,
        private _service: PageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        public activatedRoute: ActivatedRoute
    ) {
        this._service.getPermission().subscribe((resp: any) => {
            this.permissions = resp.data;
        });
        this.addForm = this.formBuilder.group({
            company: [null],
            name: [null],
            phone: [null],
            email: [null],
            status: [null],
            expire_date: [null],
            cars: this.formBuilder.array([]),
        });
    }
    car(): FormArray {
        return this.addForm.get('cars') as FormArray;
    }
    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params) => {
            this.id = params.id;
            this._service.getById(this.id).subscribe((resp: any) => {
                const item = resp;
                console.log(resp);
                this.addForm.patchValue({
                    ...item,
                });
                for (const items of resp.cars) {
                    this.addCargetbyid(items);
                }
            });
        });
    }
    back() {
        this._router.navigateByUrl('admin/customer/list').then(() => {});
    }
    onSaveClick(): void {
        // this.flashMessage = null;
        // this._router.navigateByUrl('admin/customer/list').then(() => {});
        const datePipe = new DatePipe('en-US');

        const date = datePipe.transform(
            this.addForm.value.expire_date,
            'YYYY-MM-dd'
        );

        this.addForm.patchValue({
            expire_date: date,
        });

        // Open the confirmation dialog
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
                Object.entries(this.addForm.value).forEach(
                    ([key, value]: any[]) => {}
                );

                this._service.create(this.addForm.value).subscribe({
                    next: (resp: any) => {
                        this.showFlashMessage('success');
                        this._router
                            .navigateByUrl('admin/customer/list')
                            .then(() => {});
                    },
                    error: (err: any) => {
                        this.addForm.enable();
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
    addCargetbyid(data?: any) {
        const em = this.formBuilder.group({
            car_id: [null],
            name: [null],
            image: [null],
            province: [null],
            license: [null],
        });
        console.log('data', data);
        if (data) {
            em.patchValue({
                car_id: data.id,
                name: data.car?.brand_model?.name,
                image: data?.image,
                province: data.car?.province?.name,
                license: data?.car?.license,
            });
        }
        this.car().push(em);
        console.log(this.car());
    }
    addCar(data?: any) {
        const em = this.formBuilder.group({
            car_id: [null],
            name: [null],
            image: [null],
            province: [null],
            license: [null],
        });
        console.log('data', data);
        if (data) {
            em.patchValue({
                car_id: data?.id,
                name: data?.brand_model?.name,
                image: data?.image,
                province: data?.province?.name,
                license: data?.license,
            });
        }
        this.car().push(em);
        console.log(this.car());
    }
    removeCar(i: number): void {
        this.car().removeAt(i);
    }
    Selectcar() {
        // this._router.navigate(['admin/employee/form']);
        const dialogRef = this.dialog.open(SelectCarComponent, {
            width: '600px',
            height: '800px', // กำหนดความกว้างของ Dialog
        });

        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
                console.log(result, 'result');
            }
        });
    }
    openDialog() {
        console.log();

        // console.log(this.depositsForm.value.deposit[i]);
        const dialogRef = this.dialog.open(SelectCarComponent, {
            width: '600px',
            height: '800px',
        });

        // ปิด Dialog พร้อมรับค่า result
        dialogRef.afterClosed().subscribe((item) => {
            console.log('itemss', item);
            for (const items of item) {
                this.addCar(items);
            }
            this._changeDetectorRef.markForCheck();
        });
    }

    showFlashMessage(type: 'success' | 'error'): void {
        // Show the message
        this.flashMessage = type;

        // Mark for check
        this._changeDetectorRef.markForCheck();

        // Hide it after 3 seconds
        setTimeout(() => {
            this.flashMessage = null;

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 3000);
    }

    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);

        // this.addForm.patchValue({
        //     image: this.files[0]
        // })

        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = (e: any) => (this.url_logo = e.target.result);
        const file = this.files[0];
        this.addForm.patchValue({
            image: file,
        });
    }

    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
}
