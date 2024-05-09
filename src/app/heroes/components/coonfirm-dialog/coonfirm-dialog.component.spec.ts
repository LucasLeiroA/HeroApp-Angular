import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoonfirmDialogComponent } from './coonfirm-dialog.component';

describe('CoonfirmDialogComponent', () => {
  let component: CoonfirmDialogComponent;
  let fixture: ComponentFixture<CoonfirmDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoonfirmDialogComponent]
    });
    fixture = TestBed.createComponent(CoonfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
