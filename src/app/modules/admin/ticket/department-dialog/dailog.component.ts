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
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckboxTopicComponent } from 'app/shared/checkbox-topic/checkbox.component';
import { MatDividerModule } from '@angular/material/divider';

@Component({
    selector: 'app-department-filter',
    standalone: true,
    imports: [MatDividerModule, FormsModule, CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent, FormsModule, CheckboxTopicComponent],
    templateUrl: './dailog.component.html',
    styleUrls: ['./dailog.component.scss']
})
export class DepartmentDialogComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    dataArray: any[] = [];
    items: any[] = []
    statusData = new FormControl('');
    checkAll = false;
    selectedItems: any[] = [];

    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private dialogRef: MatDialogRef<DepartmentDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {
        console.log(this.data.value)
    }

    ngOnInit(): void {
        this.items = this.data.value
        this.updateSelectedItems()
    }

    filterData(event : any) {
        this.items = this.items.filter(item => item.name === event.value)
        this._changeDetectorRef.markForCheck();
    }
    searchText = '';
    get filteredData(): any[] {
        const searchLower = this.searchText.toLowerCase();
    
        return this.items.filter(item => item.name.toLowerCase().includes(searchLower));
      }

    onClose() {
        this.dialogRef.close();

    }

    checkAllItems() {
        for (const item of this.items) {
            item.isSelected = this.checkAll;
        }
        this.updateSelectedItems();
        this._changeDetectorRef.markForCheck();
    }

    updateSelectedItems() {
        this.selectedItems = this.items.filter(item => item.isSelected);
        if(this.selectedItems.length !== this.items.length) {
            this.checkAll = false;
        }
        console.log(this.selectedItems)
    }
    uncheckAllItems() {
        this.checkAll = false
        for (const item of this.items) {
          item.isSelected = false;
        }
        this.updateSelectedItems();
        this.searchText = ''
      }

    onSaveClick(): void {
        this.dialogRef.close(this.selectedItems)
    }
}
