import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FrndEventEditComponent } from './frnd-event-edit.component';

describe('FrndEventEditComponent', () => {
  let component: FrndEventEditComponent;
  let fixture: ComponentFixture<FrndEventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrndEventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrndEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
