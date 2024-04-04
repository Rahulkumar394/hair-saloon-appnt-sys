import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateShopkeeperProfileComponent } from './update-shopkeeper-profile.component';

describe('UpdateShopkeeperProfileComponent', () => {
  let component: UpdateShopkeeperProfileComponent;
  let fixture: ComponentFixture<UpdateShopkeeperProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateShopkeeperProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateShopkeeperProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
