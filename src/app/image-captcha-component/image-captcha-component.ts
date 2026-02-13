import { Component, signal, computed } from '@angular/core';
import { CaptchaHolder } from '../captcha-holder/captcha-holder';
import { Router } from '@angular/router';

interface Image {
  id: number;
  src: string;
  isCorrect: boolean;
}

interface ImageChallenge {
  question: string;
  images: Image[];
}

@Component({
  selector: 'app-image-captcha',
  templateUrl: './image-captcha-component.html',
  styleUrl: './image-captcha-component.css'
})
export class ImageCaptchaComponent {
  constructor(private captchaHolder: CaptchaHolder, private router: Router) { }

  private readonly numberOfImages = 9;

  private pool = {
    mongolian_Cats: [
      'assets/captcha/downSyndrom1.png',
      'assets/captcha/downSyndrom2.png',
    ],

    dogs: [
      'assets/captcha/dog1.png',
      'assets/captcha/dog2.png',
      'assets/captcha/dog3.png',
    ],

    Humans: [
      'assets/captcha/me.png',
      'assets/captcha/zone.png',
      'assets/captcha/sakami.png',
      'assets/captcha/zaid.png',
    ]
  }
  private categories = Object.keys(this.pool) as (keyof typeof this.pool)[];

  private targetCategory: keyof typeof this.pool = this.categories[Math.floor(Math.random() * this.categories.length)];

  private images = this.chooseImages();

  challenge = signal<ImageChallenge>({
    question: `Select all images with ${this.targetCategory.replace('_', ' ')}:`,
    images: this.images
  });

  SelectedImages = signal<Set<number>>(new Set());

  notify = signal({
    success: '',
    error: ''
  })

  chooseImages() {
    const images: Image[] = [];
    for (let i = 0; i < this.numberOfImages; i++) {
      const category: keyof typeof this.pool = this.categories[Math.floor(Math.random() * this.categories.length)];
      const src = this.pool[category][Math.floor(Math.random() * this.pool[category].length)];
      images.push({
        id: i,
        src,
        isCorrect: category === this.targetCategory
      });
    }
    return images;
  }




  toggle(img: Image) {
    const set = new Set(this.SelectedImages());
    set.has(img.id) ? set.delete(img.id) : set.add(img.id);
    this.SelectedImages.set(set);
    this.notify.set({ success: '', error: '' });
  }

  isValid() {
    return this.challenge().images.every(img =>
      img.isCorrect === this.SelectedImages().has(img.id)
    );
  }

  generateChalenge() {
    this.targetCategory = this.categories[Math.floor(Math.random() * this.categories.length)];
    this.images = this.chooseImages();
    this.challenge.set({
      question: `Select all images with ${this.targetCategory.replace('_', ' ')}:`,
      images: this.images
    });

    this.notify.set({ success: '', error: '' });
    this.SelectedImages.set(new Set());
  }

  submit() {
    if (this.isValid()) {
      this.challenge.set({
        question: `Select all images with ${this.targetCategory.replace('_', ' ')}:`,
        images: this.images
      });
      this.notify.set({
        success: 'Captcha passed ✅',
        error: ''
      });
      this.captchaHolder.formCaptcha.update((state) => ({
        ...state,
        levelFinished: state.levelFinished + 1,
        finisTime: new Date()
      }));
      localStorage.setItem('data', JSON.stringify(this.captchaHolder.formCaptcha()));
    } else {
      this.generateChalenge();
      this.notify.set({
        success: '',
        error: 'Try again ❌'
      });
      this.captchaHolder.formCaptcha.update((state) => ({
        ...state,
        faildAttempts: state.faildAttempts + 1
      }));
      localStorage.setItem('data', JSON.stringify(this.captchaHolder.formCaptcha()));
    }
  }

  refresh = () => this.generateChalenge();

  result() {
    console.warn("I am in result");
    
    this.router.navigate(['/result']);
  }
}
