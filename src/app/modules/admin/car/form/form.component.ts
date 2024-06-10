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
    FormControl,
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
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
    MatAutocompleteModule,
    MatAutocompleteSelectedEvent,
} from '@angular/material/autocomplete';
import {
    debounceTime,
    distinctUntilChanged,
    switchMap,
    tap,
} from 'rxjs/operators';

@Component({
    selector: 'form-employee',
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
        MatAutocompleteModule,
    ],
})
export class FormComponent implements OnInit {
    /**
     * Constructor
     */
    options$: Observable<string[]>;
    myControl = new FormControl();
    options: string[] = [];
    filteredOptions: Observable<string[]>;
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    addForm2: FormGroup;
    isLoading: boolean = false;
    positions: any[];
    departments: any[];
    permissions: any[];
    brandmodel: any[];
    brands: any[];
    province: any[];
    company: any[];
    flashMessage: 'success' | 'error' | null = null;
    selectedFile: File = null;
    constructor(
        private formBuilder: FormBuilder,
        private _service: PageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _router: Router
    ) {
        this.addForm = this.formBuilder.group({
            license: [null],
            brand_model_id: [null],
            province_id: [null],
            expire_date: [null],
            client_id: [null],
            image: [null],
            brand: [null],
            status: 'Available',
        });
    }
    ngOnInit(): void {
        this._service.getBrand().subscribe((resp: any) => {
            this.brands = resp;
        });
        this._service.getBrandModel().subscribe((resp: any) => {
            this.brandmodel = resp;
        });
        this._service.getProvince().subscribe((resp: any) => {
            this.province = resp;
        });
        this._service.getCompany().subscribe((resp: any) => {
            this.company = resp;
        });

        this.options$ = this.myControl.valueChanges.pipe(
            debounceTime(300), // Add a small delay before making the API call to avoid sending too many requests
            distinctUntilChanged(), // Only emit if the value has changed
            tap(() => {
                // You can perform any actions here when the value changes, like showing a loading spinner
            }),
            switchMap((value) => {
                // Call the API with the input value
                return this._service.getData(value).pipe(
                    tap((data) => console.log(data)) // Log the data received from the API
                );
            })
        );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    onOptionSelected(event: MatAutocompleteSelectedEvent): void {
        const selectedOptionId = event.option.value;
        console.log(selectedOptionId);
        let arr: string[] = selectedOptionId.toString().split(":");

        this.myControl.setValue(arr[1]);
        // Do something with the selected option ID
    }
    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
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

    onSaveClick(): void {
        this.flashMessage = null;

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
                this._service.create(formData).subscribe({
                    next: (resp: any) => {
                        this.showFlashMessage('success');
                        this._router
                            .navigateByUrl('admin/car/list')
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

    files: File[] = [];
    url_logo: string;
    onSelect(event: { addedFiles: File[] }): void {
        this.files.push(...event.addedFiles);
        setTimeout(() => {
            this._changeDetectorRef.detectChanges();
        }, 150);
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

    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter((option) =>
            option.toLowerCase().includes(filterValue)
        );
    }
}
