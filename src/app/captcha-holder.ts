import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaptchaHolderService {

  formCaptcha = signal({
    captchaId: 1,
    startTime: new Date(),
    levelFinished: 0,
    faildAttempts: 0,
  });

}
