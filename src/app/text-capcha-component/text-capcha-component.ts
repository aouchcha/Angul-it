import { Component, signal } from '@angular/core';
import { CaptchaHolder } from '../captcha-holder/captcha-holder';
import { form, FormField, required } from '@angular/forms/signals';

interface ChallengeResult {
  success: boolean;
  message: string;
  result: string;
  notif: string;
  error: string;
}

@Component({
  selector: 'app-text-capcha-component',
  imports: [
    FormField,
  ],
  templateUrl: './text-capcha-component.html',
  styleUrl: './text-capcha-component.css',
})

export class TextCapchaComponent {
  constructor(private captchaHolder: CaptchaHolder) { }

  readonly TestText = this.generateCaptchaText();


  challengeModule = signal<ChallengeResult>({
    success: false,
    message: 'Type the word ' + this.TestText + ' to proceed:',
    result: '',
    notif: '',
    error: ''
  });

  challengeForm = form(this.challengeModule, (fieldPath) => {
    required(fieldPath.result, { message: 'Answer is required' });
  });

  generateCaptchaText(length = 5): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz' +
      '0123456789' +
      '!@#$%^&*';

    let result = '';

    for (let i = 0; i < length; i++) {
      const index = Math.floor(Math.random() * chars.length);
      result += chars[index];
    }

    return result;
  }

  submit() {
    const userResult = this.challengeModule().result;
    if (userResult === this.TestText) {
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
        error: 'Incorrect. Please try again: ' + this.challengeModule().message
      }));
    }
  }

  previous() {
    this.captchaHolder.formCaptcha.update((state) => ({
      ...state,
      captchaId: state.captchaId - 1,
      levelFinished: state.levelFinished - 1
    }));
    localStorage.setItem('data', JSON.stringify(this.captchaHolder.formCaptcha()));
  }

}
