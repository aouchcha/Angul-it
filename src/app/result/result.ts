import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CaptchaHolderService } from '../captcha-holder'; 
interface DataToShow {
  fails: number;
  time_Taken: string;
  percentage: string;
}

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {

  ngOnInit(): void {
    const data = localStorage.getItem('data');
    if (data !== null) {
      const parsedData = JSON.parse(data);
      console.warn({"finish": parsedData.finisTime}, typeof parsedData.finisTime);

      if (parsedData.finisTime === undefined) {
        console.warn('yow yow');
        
      }
      
      if (parsedData.captchaId != parsedData.levelFinished || parsedData.finisTime === undefined) {
        this.router.navigate(['/BadRequest']);
      }
      this.Data.set(this.calculeData(parsedData.faildAttempts, parsedData.startTime, parsedData.finisTime))
    } else {
      this.router.navigate(['/BadRequest']);
    }
  };
  constructor(private router: Router, private captchaHolder: CaptchaHolderService) { }

  Data = signal<DataToShow>({
    fails: 0,
    time_Taken: "0s",
    percentage: '100',
  })

  

  successRate(faild_attempt: number): number {
    return (3 / (faild_attempt + 3)) * 100;
  }

  formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);

    if (seconds < 60) {
      return `${seconds}s`;
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes < 60) {
      return `${minutes}m ${remainingSeconds}s`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  }


  calculeData(faild_attempt: number, start: Date, finish: Date): DataToShow {
    const durationMs = new Date(finish).getTime() - new Date(start).getTime();

    return {
      fails: faild_attempt,
      time_Taken: this.formatDuration(durationMs),
      percentage: this.successRate(faild_attempt).toFixed(0)
    }
  }


  home() {
    this.router.navigate(['/'])
  }

  restart() {
    localStorage.setItem('data', JSON.stringify(this.captchaHolder.formCaptcha()));
    this.router.navigate(['/captcha'])
  }



  // dataToShow = signal<DataToShow>({

  // })



}
