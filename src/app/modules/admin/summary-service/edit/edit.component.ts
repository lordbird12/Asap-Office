import { TextFieldModule } from '@angular/cdk/text-field';
import { NgClass } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    UntypedFormBuilder,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AuthService } from 'app/core/auth/auth.service';
import { Service } from '../page.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DataTablesModule } from 'angular-datatables';

@Component({
    selector: 'edit-product',
    templateUrl: './edit.component.html',
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
        CommonModule,
        NgxDropzoneModule,
        DataTablesModule,
    ],
})
export class EditComponent implements OnInit, AfterViewInit, OnDestroy {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    fixedSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInput: FormControl = new FormControl('', [
        Validators.required,
    ]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [
        Validators.required,
    ]);

    isLoading: boolean = false;
    dtOptions: DataTables.Settings = {};
    positions: any[];
    // public dataRow: any[];
    dataRow: any[] = [];

    item1Data: any = [];
    item2Data: any = [];
    itemSupplier: any = [];

    itemArea: any = [];
    itemShelve: any = [];
    itemFloor: any = [];
    itemChannel: any = [];

    formData: FormGroup;
    files: File[] = [];
    Id: any;
    warehouseData: any;
    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _Service: Service,
        private _matDialog: MatDialog,
        private _router: Router,
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    async ngOnInit(): Promise<void> {
        // this.Id = this._activatedRoute.snapshot.paramMap.get('id');

        // this.formData = this._formBuilder.group({
        //     category_product_id: ['', Validators.required],
        //     sub_category_product_id: ['', Validators.required],
        //     name: [''],
        //     detail: [''],
        //     qty: [''],
        //     sale_price: [''],
        //     cost: [''],
        //     type: [''],
        //     area_id: [''],
        //     shelve_id: [''],
        //     floor_id: [''],
        //     channel_id: [''],
        //     min: [''],
        //     max: [''],
        //     supplier_id: [''],
        //     images: '',
        // });

        this.loadTable();

        // this._Service.getWarehouse(this.Id).subscribe((resp: any) => {
        //     this.warehouseData = resp.data;
        //     this.getCategories();
        //     this.getSuppliers();
        //     this.getArea();
        //     this.formData.patchValue({
        //         ...resp.data,
        //         category_product_id: +resp.data.category_product_id
        //     })
        //     this._changeDetectorRef.detectChanges();
        // })

    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };
    loadTable(): void {
        const that = this;
        this.dtOptions = {
            pagingType: 'full_numbers', 
            pageLength: 25,
            serverSide: true,
            processing: true,
            language: {
                url: 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json',
            },
            ajax: (dataTablesParameters: any, callback) => {
                dataTablesParameters.type = 'Good';
                that._Service
                    .getPage(dataTablesParameters)
                    .subscribe((resp: any) => {
                        this.dataRow = resp.data;
                        this.pages.current_page = resp.current_page;
                        this.pages.last_page = resp.last_page;
                        this.pages.per_page = resp.per_page;
                        if (resp.current_page > 1) {
                            this.pages.begin =
                                resp.per_page * resp.current_page - 1;
                        } else {
                            this.pages.begin = 0;
                        }

                        callback({
                            recordsTotal: resp.total,
                            recordsFiltered: resp.total,
                            data: [],
                        });
                        this._changeDetectorRef.markForCheck();
                    });
            },
            // columns: [
            //     { data: 'action', orderable: false },
            //     { data: 'No' },
            //     { data: 'name' },
            //     { data: 'create_by' },
            //     { data: 'created_at' },
            // ],
        };
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {}

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
    }

    getCategories(): void {
        this._Service.getCategories().subscribe((resp) => {
            this.item1Data = resp.data;
        });
    }

    getSuppliers(): void {
        this._Service.getSuppliers().subscribe((resp) => {
            this.itemSupplier = resp.data;
        });
    }

    getArea(): void {
        this._Service.getBrand().subscribe((resp) => {
            this.itemArea = resp.data;
        });
    }

    /**
     * Get the form field helpers as string
     */
    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    somethingChanged(event: any): void {
        this.item2Data = event.value;
    }

    onSelect(event) {
        this.files.push(...event.addedFiles);
        // Trigger Image Preview
        setTimeout(() => {
            this._changeDetectorRef.detectChanges();
        }, 150);
        this.formData.patchValue({
            image: this.files[0],
        });
    }

    onRemove(event) {
        this.files.splice(this.files.indexOf(event), 1);
        this.formData.patchValue({
            image: '',
        });
    }
}
