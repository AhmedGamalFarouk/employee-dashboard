import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyOrders } from './buy-orders';

describe('BuyOrders', () => {
  let component: BuyOrders;
  let fixture: ComponentFixture<BuyOrders>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuyOrders]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyOrders);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
