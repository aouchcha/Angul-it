import { TestBed } from '@angular/core/testing';

import { CaptchaHolder } from './captcha-holder';

describe('CaptchaHolder', () => {
  let service: CaptchaHolder;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchaHolder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
