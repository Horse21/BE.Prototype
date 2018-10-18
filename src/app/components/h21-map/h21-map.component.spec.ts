import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {H21MapComponent} from './h21-map.component';
import {describe} from "@angular/core/testing/src/testing_internal";

describe('H21MapComponent', () => {
  let component: H21MapComponent;
  let fixture: ComponentFixture<H21MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ H21MapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(H21MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
