import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-general-manager',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-manager.component.html',
  styleUrls: ['./general-manager.component.scss']
})
export class GeneralManagerComponent {
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
}
