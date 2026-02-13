import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';

import { form, FormField, required } from '@angular/forms/signals';
import { CaptchaHolder } from '../captcha-holder/captcha-holder';
interface ChallengeResult {
  success: boolean;
  message: string;
  result: number;
  notif: string;
  error: string;
}

@Component({
  selector: 'app-math-captcha-component',
  imports: [FormField],
  templateUrl: './math-captcha-component.html',
  styleUrl: './math-captcha-component.css',
})
export class MathCaptchaComponent implements AfterViewInit {
  @ViewChild('myInput') input!: ElementRef<HTMLInputElement>;
  ngAfterViewInit() {
    this.input.nativeElement.focus();
  }
  constructor(private captchaHolder: CaptchaHolder) { }

  readonly number1 = Math.random() * 10;
  readonly number2 = Math.random() * 10;
  readonly resultToCheck = Math.floor(this.number1) + Math.floor(this.number2);

  challengeModule = signal<ChallengeResult>({
    success: false,
    message: Math.floor(this.number1) + ' + ' + Math.floor(this.number2) + ' = ?',
    result: 0,
    notif: '',
    error: ''
  });

  challengeForm = form(this.challengeModule, (fieldPath) => {
    required(fieldPath.result, { message: 'Answer is required' });
  });

  submit() {
    const userResult = this.challengeModule().result;
    if (userResult === this.resultToCheck) {
      this.challengeModule.update((state) => ({
        ...state,
        success: true,
        notif: 'Correct! You may proceed.'
      }));
      this.captchaHolder.formCaptcha.update((state) => ({
        ...state,
        captchaId: state.captchaId + 1,
        levelFinished: state.levelFinished + 1
      }));
      localStorage.setItem('data', JSON.stringify(this.captchaHolder.formCaptcha()));


    } else {
      this.challengeModule.update((state) => ({
        ...state,
        success: false,
        error: 'Incorrect. Please try again: ' + Math.floor(this.number1) + ' + ' + Math.floor(this.number2) + ' = ?'
      }));
      this.captchaHolder.formCaptcha.update((state) => ({ 
        ...state,
        faildAttempts: state.faildAttempts + 1 
      })); 
      localStorage.setItem('data', JSON.stringify(this.captchaHolder.formCaptcha()));
    }
  }
}
