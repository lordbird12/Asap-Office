import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRippleModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import * as moment from 'moment';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { DataTablesModule } from 'angular-datatables';

import { pageRoute } from './page.routes';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgClass } from '@angular/common';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ChangeStatusPipe } from 'app/shared/status.pipe';
import { CustomTooltipDirective } from './custom-tooltip.directive';



@NgModule({
    declarations: [
        ListComponent,
        CustomTooltipDirective
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(pageRoute),
        DataTablesModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSortModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTooltipModule,
        DragDropModule,
        MatDialogModule,
        MatDatepickerModule,
        MatTableModule,
        MatTabsModule,
        MatSidenavModule,
        MatButtonToggleModule,
        MatChipsModule,
        MatDividerModule,
        NgxDropzoneModule,
        MatRadioModule,
        MatExpansionModule,
        MatIconModule,
        FormsModule,
        MatFormFieldModule,
        NgClass,
        TextFieldModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatSelectModule,
        MatChipsModule,
        MatDatepickerModule,
        MatPaginatorModule,
        MatTableModule,
        DataTablesModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        ChangeStatusPipe,
        MatTooltipModule,
    ],
})
export class Module {}
