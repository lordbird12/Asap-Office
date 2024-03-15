import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    Inject,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
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
import { CommonModule, NgClass } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { PageService } from '../page.service';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { forkJoin, lastValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'form-employee',
    styleUrls: ['./form.component.scss'],
    templateUrl: './form.component.html',
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
        MatTabsModule,
    ],
})
export class FormComponent implements OnInit {
    /**
     * Constructor
     */
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    passwordForm: FormGroup;
    isLoading: boolean = false;
    positions: any;
    departments: any;
    permissions: any[];
    brandmodel: any[];
    province: any[];
    company: any[];
    iduser: any;
    selectedFile: File = null;
    constructor(
        private formBuilder: FormBuilder,
        private _service: PageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router,
        private toastr: ToastrService
    ) {
        this.iduser = JSON.parse(localStorage.getItem('user'));
        this.addForm = this.formBuilder.group({
            id: [''],
            image: [''],
            password: [''],
            old_password: [''],
            code: [''],
            departmentName:  { disabled: true, value: '' },
            department_id: [''],
            positionName: { disabled: true, value: '' },
            position_id:[''],
            fname: [''],
            lname: [''],
            email: [''],
            phone: [''],
        });
    }
    async ngOnInit(): Promise<void> {
        console.log(this.iduser);

        this._service.getById(this.iduser.id).subscribe(async (resp: any) => {
            const item = resp;
            const initialData = await lastValueFrom(
                forkJoin(
                    this._service.getbyidPosition(item.position_id),
                    this._service.getbyidDepartment(item.department_id)
                )
            );
            (this.positions = initialData[0]),
                (this.departments = initialData[1]),
                console.log(item);
            this.addForm.patchValue({
                id: resp.id,
                department_id: resp.department_id,
                code: resp.code,
                position_id: resp.position_id,
                fname: resp.fname,
                lname: resp.lname,
                email: resp.email,
                phone: resp.phone,
                departmentName: this.departments.name,
                positionName: this.positions.name,
            });
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    getDisabledValue() {
        //your condition, in this case textarea will be disbaled.
        return true;
    }
    onSaveClick(): void {
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
                const formData = new FormData();
                Object.entries(this.addForm.value).forEach(
                    ([key, value]: any[]) => {
                        if (
                            value !== '' &&
                            value !== 'null' &&
                            value !== null
                        ) {
                            formData.append(key, value);
                        }
                        if (key === 'image') {
                            formData.append(key, this.selectedFile);
                        }
                    }
                );
                this._service.updateuser(formData).subscribe({
                    next: (resp: any) => {
                        this.toastr.success('ดำเนินการสำเร็จ');

                        this._router
                            .navigateByUrl('admin/account/form')
                            .then(() => {});
                    },
                    error: (err: any) => {
                        this.toastr.error('ไม่สามารถบันทึกข้อมูล')
                        // this._fuseConfirmationService.open({
                        //     title: 'เกิดข้อผิดพลาด',
                        //     message: err.error.message,
                        //     icon: {
                        //         show: true,
                        //         name: 'heroicons_outline:exclamation',
                        //         color: 'warning',
                        //     },
                        //     actions: {
                        //         confirm: {
                        //             show: false,
                        //             label: 'ยืนยัน',
                        //             color: 'primary',
                        //         },
                        //         cancel: {
                        //             show: false,
                        //             label: 'ยกเลิก',
                        //         },
                        //     },
                        //     dismissible: true,
                        // });
                    },
                });
            }
        });

        // แสดง Snackbar ข้อความ "complete"
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
    back() {
        this._router.navigateByUrl('admin/car/list').then(() => {});
    }
    onRemove(file: File): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
}
