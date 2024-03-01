import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralManagerComponent } from './general-manager.component';

describe('GeneralManagerComponent', () => {
  let component: GeneralManagerComponent;
  let fixture: ComponentFixture<GeneralManagerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GeneralManagerComponent]
    });
    fixture = TestBed.createComponent(GeneralManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
