import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MathCaptchaComponent } from '../math-captcha-component/math-captcha-component';
import { TextCapchaComponent } from '../text-capcha-component/text-capcha-component';
import { ImageCaptchaComponent } from '../image-captcha-component/image-captcha-component';

interface CaptchaHolderProps {
  captchaId: number;
  startTime: Date;
  levelFinished: number;
  faildAttempts: number;
}

@Component({
  selector: 'app-captcha-holder',
  imports: [
    MathCaptchaComponent,
    TextCapchaComponent,
    ImageCaptchaComponent
  ],
  templateUrl: './captcha-holder.html',
  styleUrl: './captcha-holder.css',
})
export class CaptchaHolder implements OnInit {

  data: any | null = null;
  formCaptcha = signal<CaptchaHolderProps>({
    captchaId: 1,
    startTime: new Date(),
    levelFinished: 1,
    faildAttempts: 0,
  });

  constructor(private router: Router) { }
  ngOnInit(): void {
    this.data = localStorage.getItem('data');
    if (this.data !== null) {
      this.data = JSON.parse(this.data);
      if (this.data.captchaId != this.data.levelFinished) {
        this.router.navigate(['/BadRequest']);
      }
      this.formCaptcha.update((state) => ({
        ...state,
        captchaId: this.data.captchaId,
        levelFinished: this.data.levelFinished,
        startTime: new Date(this.data.startTime)
      }));
      console.log((this.data));
    } else {
      localStorage.setItem('data', JSON.stringify(this.formCaptcha()));
    }
  }



}
