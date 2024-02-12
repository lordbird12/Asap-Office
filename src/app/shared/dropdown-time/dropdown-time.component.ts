import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-dropdown-time',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './dropdown-time.component.html',
  styleUrls: ['./dropdown-time.component.scss']
})
export class DropdownTimeComponent {

}
