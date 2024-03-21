import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipContentComponent } from 'app/modules/admin/dashboards/summary-service/company-detail/tooltip-content.component'; 

@NgModule({
    declarations: [TooltipContentComponent],
    imports: [CommonModule],
    exports: [TooltipContentComponent], // Export the component so it can be used in other modules
})
export class SharedModule {}
