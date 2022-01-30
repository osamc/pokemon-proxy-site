import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProxyViewComponent } from './proxy-view.component';

describe('ProxyViewComponent', () => {
  let component: ProxyViewComponent;
  let fixture: ComponentFixture<ProxyViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProxyViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProxyViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
