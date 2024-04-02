import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopkeeperProfileComponent } from './shopkeeper-profile.component';

describe('ShopkeeperProfileComponent', () => {
  let component: ShopkeeperProfileComponent;
  let fixture: ComponentFixture<ShopkeeperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShopkeeperProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopkeeperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
