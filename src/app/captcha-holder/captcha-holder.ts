import { Component, signal } from '@angular/core';
import { MathCaptchaComponent } from '../math-captcha-component/math-captcha-component';
interface CaptchaHolderProps {
  captchaId: number;
}

@Component({
  selector: 'app-captcha-holder',
  imports: [
    MathCaptchaComponent
  ],
  templateUrl: './captcha-holder.html',
  styleUrl: './captcha-holder.css',
})
export class CaptchaHolder {
  formCaptcha = signal<CaptchaHolderProps>({
    captchaId: 1
  });
}
