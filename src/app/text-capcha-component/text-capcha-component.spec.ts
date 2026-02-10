import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextCapchaComponent } from './text-capcha-component';

describe('TextCapchaComponent', () => {
  let component: TextCapchaComponent;
  let fixture: ComponentFixture<TextCapchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextCapchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextCapchaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
