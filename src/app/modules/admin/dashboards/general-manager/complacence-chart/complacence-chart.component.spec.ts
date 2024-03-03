import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplacenceChartComponent } from './complacence-chart.component';

describe('ComplacenceChartComponent', () => {
  let component: ComplacenceChartComponent;
  let fixture: ComponentFixture<ComplacenceChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComplacenceChartComponent]
    });
    fixture = TestBed.createComponent(ComplacenceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
