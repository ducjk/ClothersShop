import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexCustomerComponent } from './index.component';

describe('IndexCustomerComponent', () => {
  let component: IndexCustomerComponent;
  let fixture: ComponentFixture<IndexCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IndexCustomerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IndexCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
