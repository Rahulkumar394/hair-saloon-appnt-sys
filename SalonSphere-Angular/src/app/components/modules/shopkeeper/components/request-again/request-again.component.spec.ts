import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAgainComponent } from './request-again.component';

describe('RequestAgainComponent', () => {
  let component: RequestAgainComponent;
  let fixture: ComponentFixture<RequestAgainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestAgainComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestAgainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
