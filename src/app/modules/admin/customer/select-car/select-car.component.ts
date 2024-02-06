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
import { MatCheckboxModule } from '@angular/material/checkbox';

@Component({
    selector: 'app-select-car',
    templateUrl: './select-car.component.html',
    styleUrls: ['./select-car.component.scss'],
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
        MatCheckboxModule,
        NgxDropzoneModule,
    ],
})
export class SelectCarComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    addForm: FormGroup;
    isLoading: boolean = false;
    positions: any[];
    permissions: any[];
    car: any[];
    columns = [
        {
            name: 'name',
        },
    ];
    filterData = [];
    rawDataFilter: any[] = [];
    flashMessage: 'success' | 'error' | null = null;
    selectedFile: File = null;
    constructor(
        private dialogRef: MatDialogRef<SelectCarComponent>,
        @Inject(MAT_DIALOG_DATA) private data: any,
        private formBuilder: FormBuilder,
        private _service: PageService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _changeDetectorRef: ChangeDetectorRef
    ) {
        this.addForm = this.formBuilder.group({
            filter: [null],
            car_id: [],
        });
    }

    ngOnInit(): void {
        this._service.getCar().subscribe((resp: any) => {
            this.car = resp;
        });
    }
    check(event: any, item: any) {
        console.log(event);

        if (event.checked == true) {
            if (!this.addForm.value.car_id) {
                // ถ้า work_telesate ยังไม่มีอยู่ก่อนให้สร้างอาร์เรย์เปล่า
                this.addForm.value.car_id = [];
            }

            this.addForm.value.car_id.push(item);
            console.log(this.addForm.value, 'formData');
        } else {
            if (this.addForm.value.car_id) {
                const index = this.addForm.value.car_id.indexOf(item);
                if (index !== -1) {
                    this.addForm.value.car_id.splice(index, 1);
                    console.log(this.addForm.value, 'formData');
                }
            }
        }
    }
    onFilter(event) {
        //  console.log('event',event.target.value);
        // ตัวให้เป็นตัวเล็กให้หมด
        let val = event.target.value.toLowerCase();
        // หา ชื่อ คอลัมน์
        let keys = Object.keys(this.columns[0]);
        // หาจำนวนคอลัม
        let colsAmt = keys.length;
        // console.log('keys', keys);
        this.car = this.rawDataFilter.filter(function (item) {
            // console.log('item',item);
            for (let i = 0; i < colsAmt; i++) {
                //console.log(colsAmt);
                if (item[keys[i]]) {
                    if (
                        item[keys[i]].toString().toLowerCase().indexOf(val) !==
                            -1 ||
                        !val
                    ) {
                        // ส่งคืนตัวที่เจอ
                        return true;
                    }
                }
            }
        });
        // console.log('this.BomData', this.BomData);
    }
    addcar(): void {
        this.dialogRef.close(this.addForm.value.car_id);
    }
}
