import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetrackComponent } from './timetrack.component';

describe('TimetrackComponent', () => {
  let component: TimetrackComponent;
  let fixture: ComponentFixture<TimetrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimetrackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimetrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
