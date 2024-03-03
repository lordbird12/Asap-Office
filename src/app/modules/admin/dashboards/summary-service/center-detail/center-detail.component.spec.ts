import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CenterDetailComponent } from './companit-detail.component';

describe('CenterDetailComponent', () => {
  let component: CenterDetailComponent;
  let fixture: ComponentFixture<CenterDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CenterDetailComponent]
    });
    fixture = TestBed.createComponent(CenterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
