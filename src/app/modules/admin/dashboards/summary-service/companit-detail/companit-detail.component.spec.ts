import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanitDetailComponent } from './companit-detail.component';

describe('CompanitDetailComponent', () => {
  let component: CompanitDetailComponent;
  let fixture: ComponentFixture<CompanitDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CompanitDetailComponent]
    });
    fixture = TestBed.createComponent(CompanitDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
