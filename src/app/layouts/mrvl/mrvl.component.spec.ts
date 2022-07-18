/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MrvlComponent } from './mrvl.component';

describe('MrvlComponent', () => {
  let component: MrvlComponent;
  let fixture: ComponentFixture<MrvlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MrvlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MrvlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
