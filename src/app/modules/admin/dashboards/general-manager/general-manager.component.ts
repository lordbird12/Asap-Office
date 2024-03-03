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
    imports: [CommonModule, MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule,
        RouterLink,
        MatIconModule, MatButtonModule, KpiChartComponent, ComplacenceChartComponent, ReactiveFormsModule],
    templateUrl: './general-manager.component.html',
    styleUrls: ['./general-manager.component.scss']
})
export class GeneralManagerComponent implements OnInit {

    formFieldHelpers: string[] = ['fuse-mat-dense'];
    departmests = [];
    employees = [];
    persons = [
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'พึงพอใจมาก', rate: 4.9 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
        { name: 'Daffa Naufal', team: 'Team A', case: '23,000', avgopen: '3:00m', avgclose: '3:00m', status: 'ปานกลาง', rate: 4.4 },
    ];

    data = null;
    form: FormGroup;
    constructor(
        private activatedRoute: ActivatedRoute,
        private fb: FormBuilder,
        private service: GeneralManagerService,
    ) { }

    ngOnInit(): void {
        this.data = this.activatedRoute.snapshot.data.data;
        this.departmests = this.activatedRoute.snapshot.data.department;

        this.form = this.fb.group({
            department_id: [""],
            user_id: [""],
            startDate: [],
            endDate: [],
        });

        this.form.valueChanges.subscribe({
            next: (data: any) => {
                if (data.startDate && data.endDate) {
                    this.service.getSummary().subscribe({
                        next: (resp: any) => {
                            this.data = resp;
                        }
                    });
                }
            }
        })
    }
}
