import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBeerDialog } from './add-beer-dialog.component';

describe('AddBeerDialog', () => {
  let component: AddBeerDialog;
  let fixture: ComponentFixture<AddBeerDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBeerDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBeerDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
