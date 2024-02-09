import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-ticket-card',
    standalone: true,
    imports: [CommonModule, MatSelectModule, MatInputModule, MatDatepickerModule, MatButtonModule, MatIconModule],
    templateUrl: './ticket-card.component.html',
    styleUrls: ['./ticket-card.component.scss']
})
export class TicketCardComponent {

}
