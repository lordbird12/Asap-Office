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
import { BehaviorSubject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';

@Component({
    selector: 'app-company-filter',
    standalone: true,
    imports: [MatDividerModule, FormsModule, CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule, DropdownTimeComponent, FormsModule, CheckboxTopicComponent],
    templateUrl: './dailog.component.html',
    styleUrls: ['./dailog.component.scss']
})
export class CompanyDialogComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    dataArray: any[] = [];
    items: any[] = []
    statusData = new FormControl('');
    checkAll = false;
    selectedItems: any[] = [];

    private searchTextSubject = new BehaviorSubject<string>('บ');
    searchText$ = this.searchTextSubject.asObservable();
    filteredData: any[] = [];
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _service: PageService,
        private dialogRef: MatDialogRef<CompanyDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _fuseConfirmationService: FuseConfirmationService,
    ) {
        // console.log(this.data.value)
    }

    ngOnInit(): void {
        // this.items = this.data.value
        // this.updateSelectedItems()
        this.searchText$.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap((searchText: string) =>  {
                // ตรวจสอบว่า searchText ไม่ใช่ค่าว่าง
            if (searchText.trim() !== '') {
                // กระทำการ subscribe ไปยัง API
                return this._service.getKeywordCompany(searchText);
            } else {
                // ถ้า searchText เป็นค่าว่าง สร้าง Observable ที่ส่งกลับ array ว่าง
                return of([]);
            }
        })
        ).subscribe((resp: any) => {
            for (let index = 0; index < resp.data.length; index++) {
                const element = {
                    id: resp.data[index].id,
                    company: resp.data[index].company,
                    isSelected: false,
                }
                this.filteredData.push(element)
            }
        });
    }

    updateSearchText(searchText: string): void {
        this.searchTextSubject.next(searchText);
    }

    filterData(event: any) {
        this.items = this.items.filter(item => item.name === event.value)
        this._changeDetectorRef.markForCheck();
    }
    searchText = '';


    onClose() {
        this.dialogRef.close();

    }

    checkAllItems() {
        for (const item of this.filteredData) {
            item.isSelected = this.checkAll;
        }
        this.updateSelectedItems();
        this._changeDetectorRef.markForCheck();
    }

    updateSelectedItems() {
        this.selectedItems = this.filteredData.filter(item => item.isSelected);
        if (this.selectedItems.length !== this.filteredData.length) {
            this.checkAll = false;
        }
        // console.log(this.selectedItems)
    }
    uncheckAllItems() {
        this.checkAll = false
        for (const item of this.filteredData) {
            item.isSelected = false;
        }
        this.updateSelectedItems();
        this.searchText = ''
    }

    onSaveClick(): void {
        this.dialogRef.close(this.selectedItems)
    }
}
