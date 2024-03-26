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
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxTopicComponent } from 'app/shared/checkbox-topic/checkbox.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatRadioModule } from '@angular/material/radio';

@Component({
    selector: 'app-booking-cancel',
    standalone: true,
    imports: [
        MatDividerModule,
        MatRadioModule,
        FormsModule,
        CommonModule,
        MatSelectModule,
        MatInputModule,
        MatDatepickerModule,
        MatButtonModule,
        MatIconModule,
        DropdownTimeComponent,
        CheckboxTopicComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './dailog.component.html',
    styleUrls: ['./dailog.component.scss'],
})
export class CancelDialogComponent implements OnInit {
    favoriteSeason: string;
    seasons: string[] = [
        'ศูนย์ซ่อมบริการปิด',
        'ไม่สามารถติดต่อลูกค้าได้',
        'ลูกค้าต้องการยกเลิก',
        'อื่นๆ โปรดระบุเหตุผล',
    ];
    serviceData: any[] = [];
    serviceCenterData: any[] = [];
    activities: any[] = [];
    dataArray: any[] = [];
    topics: any[] = [
        'รถเสียฉุกเฉิน',
        'อุบัติเหตุ',
        'ติดตามรถทดแทน',
        'ติดตามงานบริหารรถยนต์',
        'อื่นๆ',
    ];
    items: any[] = [];
    statusData = new FormControl('');
    checkAll = false;
    selectedItems: any[] = [];
    form: FormGroup;
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private dialogRef: MatDialogRef<CancelDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fb: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService
    ) {
        this.form = this._fb.group({
            reason: '',
        });

    }

    ngOnInit(): void {
        
        this.items = this.data.value;
        // this.updateSelectedItems()
    }

    onClose() {
        this.dialogRef.close();
    }

    checkAllItems() {
        for (const item of this.items) {
            item.isSelected = this.checkAll;
        }
        this.updateSelectedItems();
        this._changeDetectorRef.detectChanges();
    }

    updateSelectedItems() {
        this.selectedItems = this.items.filter((item) => item.isSelected);
        if (this.selectedItems.length !== this.items.length) {
            this.checkAll = false;
        }
    }
    uncheckAllItems() {
        this.checkAll = false;
        for (const item of this.items) {
            item.isSelected = false;
        }
        this.updateSelectedItems();
    }

    onSaveClick(): void {
        const data = {
            status: this.statusData.value,
            reason: this.form.value.reason,
        };
        this.dialogRef.close(data);
    }
}
