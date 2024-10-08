import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { KpiChartComponent } from './kpi-chart/kpi-chart.component';
import { ComplacenceChartComponent } from './complacence-chart/complacence-chart.component';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GeneralManagerService } from './general-manager.service';

@Component({
    selector: 'app-general-manager',
    standalone: true,
    imports: [
        CommonModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        RouterLink,
        MatIconModule,
        MatButtonModule,
        KpiChartComponent,
        ComplacenceChartComponent,
        ReactiveFormsModule,
    ],
    templateUrl: './general-manager.component.html',
    styleUrls: ['./general-manager.component.scss'],
})
export class GeneralManagerComponent implements OnInit {
    formFieldHelpers: string[] = ['fuse-mat-dense'];
    departmests = [];
    employees = [];
    persons = [
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'พึงพอใจมาก',
            rate: 4.9,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
        {
            name: 'Daffa Naufal',
            team: 'Team A',
            case: '23,000',
            avgopen: '3:00m',
            avgclose: '3:00m',
            status: 'ปานกลาง',
            rate: 4.4,
        },
    ];
    startDate: any;
    endDate: any;
    departmentId: any;
    userId: any;
    data = null;
    form: FormGroup;
    constructor(
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private service: GeneralManagerService
    ) {}

    ngOnInit(): void {
        this.data = this.activatedRoute.snapshot.data.data;
        this.departmests = this.activatedRoute.snapshot.data.department;

        this.form = this.fb.group({
            department_id: ['null'],
            user_id: ['null'],
            startDate: [],
            endDate: [],
        });

        this.form.valueChanges.subscribe({
            next: (data: any) => {
                this.startDate = data.startDate;
                this.endDate = data.endDate;
                if (data.startDate && data.endDate) {
                    this.service
                        .getSummary2(
                            this.startDate,
                            this.endDate,
                            this.departmentId,
                            this.userId
                        )
                        .subscribe({
                            next: (resp: any) => {
                                this.data = resp;
                            },
                        });
                }
            },
        });

        this.service.getEmployee().subscribe((resp: any) => {
            this.employees = resp;
        });
    }

    minutesToMMSS(minutes: number) {
        let totalSeconds = minutes * 60;
        let mm = Math.floor(totalSeconds / 60);
        let ss = totalSeconds % 60;

        // Add leading zeros if necessary
        let mmStr = String(mm).padStart(2, '0');
        let ssStr = String(ss).padStart(2, '0');

        return mmStr + ':' + ssStr;
    }

    onUserChange(userId: string) {
        this.userId = userId;
        this.service
            .getSummary2(
                this.startDate ?? null,
                this.endDate ?? null,
                this.departmentId ?? null,
                this.userId ?? null
            )
            .subscribe({
                next: (resp: any) => {
                    this.data = resp;
                },
            });
    }

    onDepChange(depId: string) {
        this.departmentId = depId;
        this.service
            .getSummary2(
                this.startDate ?? null,
                this.endDate ?? null,
                this.departmentId ?? null,
                this.userId ?? null
            )
            .subscribe({
                next: (resp: any) => {
                    this.data = resp;
                },
            });
    }
}
