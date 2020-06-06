import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketconfigComponent } from './marketconfig.component';

describe('MarketconfigComponent', () => {
  let component: MarketconfigComponent;
  let fixture: ComponentFixture<MarketconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
