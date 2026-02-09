import { Component, signal } from '@angular/core';

import { form, FormField, required, SchemaPath, validate } from '@angular/forms/signals';
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
export class MathCaptchaComponent {
  constructor(private captchaHolder: CaptchaHolder) {}

  readonly number1 = Math.random() * 10;
  readonly number2 = Math.random() * 10;
  readonly resultToCheck = Math.floor(this.number1) + Math.floor(this.number2);
  
  challengeModule = signal<ChallengeResult>({
    success: false,
    message: Math.floor( this.number1 )+ ' + ' + Math.floor( this.number2 )+ ' = ?',
    result: 0,
    notif: '',
    error: ''
  });

  challengeForm = form(this.challengeModule, (fieldPath) => {
    required(fieldPath.result, {message: 'Answer is required'});
  });
  
 submit() {
    // console.log(this.number1);
    // console.log(this.number2);
    // console.log(Math.floor(this.number1));
    // console.log(Math.floor(this.number2));
    

    const userResult = this.challengeModule().result;
    // console.log(userResult);
    // console.log(this.resultToCheck);
    
    
    if (userResult === this.resultToCheck) {
      this.challengeModule.update((state) => ({
        ...state,
        success: true,
        notif: 'Correct! You may proceed.'
      }));
      this.captchaHolder.formCaptcha.update((state) => ({
        ...state,
        captchaId: state.captchaId + 1
      }));
    } else {
      this.challengeModule.update((state) => ({
        ...state,
        success: false,
        error: 'Incorrect. Please try again: ' + Math.floor( this.number1 )+ ' + ' + Math.floor( this.number2 )+ ' = ?'
      }));
    }
  }
}
