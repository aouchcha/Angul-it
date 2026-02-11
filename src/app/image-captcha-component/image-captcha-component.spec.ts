import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCaptchaComponent } from './image-captcha-component';

describe('ImageCaptchaComponent', () => {
  let component: ImageCaptchaComponent;
  let fixture: ComponentFixture<ImageCaptchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCaptchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageCaptchaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
