import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrogetPasswordComponent } from './froget-password.component';

describe('FrogetPasswordComponent', () => {
  let component: FrogetPasswordComponent;
  let fixture: ComponentFixture<FrogetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrogetPasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FrogetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
