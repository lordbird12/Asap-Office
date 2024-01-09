

import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { PageService } from '../page.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DataTablesModule } from 'angular-datatables';
import { FuseConfigService } from '@fuse/services/config';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Router } from '@angular/router';


@Component({
    selector: 'form',
    templateUrl: './form.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        CommonModule,
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
        DataTablesModule,
        MatCheckboxModule
    ],

})
export class FormComponent implements OnInit {
        addForm: FormGroup;
    MenuList: any = [];
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    fixedSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInput: FormControl = new FormControl('', [Validators.required]);
    fixedSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);
    dynamicSubscriptInputWithHint: FormControl = new FormControl('', [Validators.required]);

    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _Service: PageService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router
    ) {
        this.addForm = this._formBuilder.group({
            name: '',
            menu: this._formBuilder.array([])
        })
    }

    ngOnInit(): void {
        this._Service.getAllMenu().subscribe((resp: any) => {
            this.MenuList = resp;
            console.log(this.MenuList, 'menu')
            for (const menu of this.MenuList) {
                let item = this._formBuilder.group({
                    name: menu.name,
                    menu_id: menu.id,
                    view: false,
                    save: false,
                    edit: false,
                    delete: false,
                })
                this.permission().push(item)
            }
            // Mark for check
            this._changeDetectorRef.markForCheck();
        })
    }


    permission(): FormArray {
        return this.addForm.get('menu') as FormArray;
    }

    newPermission(): FormGroup {
        return this._formBuilder.group({
            name: '',
            menu_id: '',
            view: '',
            save: '',
            edit: '',
            delete: '',
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

    toggleAllSelection(data, i) {
        console.log(data.checked);
        let item = this.addForm.value.menu;
        if (data.checked === true) {
            item[i] = {
                view: true,
                save: true,
                edit: true,
                delete: true,
            }
            this.addForm.controls.menu.patchValue(
                item
            )
        } else {
            item[i] = {
                view: false,
                save: false,
                edit: false,
                delete: false,
            }
            this.addForm.controls.menu.patchValue(
                item
            )
        }
    }
    onSubmit(): void {
        const dialogRef = this._fuseConfirmationService.open({
            "title": "บันทึกข้อมูล",
            "message": "คุณต้องการบันทึกข้อมูลใช่หรือไม่ ?",
            "icon": {
              "show": true,
              "name": "heroicons_outline:exclamation-triangle",
              "color": "accent"
            },
            "actions": {
              "confirm": {
                "show": true,
                "label": "ตกลง",
                "color": "primary"
              },
              "cancel": {
                "show": true,
                "label": "ยกเลิก"
              }
            },
            "dismissible": true
          });
        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if(result === 'confirmed') {
                console.log('complete')
            } else {
                console.log('cancel');

            }
        });

    }


    backTo() {
        this._router.navigate(['admin/permission/list'])
    }
}

