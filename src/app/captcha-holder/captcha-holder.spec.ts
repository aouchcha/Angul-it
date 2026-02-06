import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchaHolder } from './captcha-holder';

describe('CaptchaHolder', () => {
  let component: CaptchaHolder;
  let fixture: ComponentFixture<CaptchaHolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaptchaHolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaptchaHolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
