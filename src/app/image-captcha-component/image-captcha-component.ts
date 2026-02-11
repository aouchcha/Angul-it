import { Component, signal, computed } from '@angular/core';

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
  // private numberOfImages = 9;

  private pool = {
    mongolian_Cats : [
      'assets/captcha/downSyndrom1.png',
      'assets/captcha/downSyndrom2.png',
    ],

    dogs: [
      'assets/captcha/dog1.png',
      'assets/captcha/dog2.png',
      'assets/captcha/dog3.png',
    ],
  
    Humans : [
      'assets/captcha/me.png',
      'assets/captcha/zone.png',
      'assets/captcha/sakami.png',
      'assets/captcha/zaid.png',
    ]
  }
  readonly categories = Object.keys(this.pool) as (keyof typeof this.pool)[];

  readonly targetCategory: keyof typeof this.pool = this.categories[Math.floor(Math.random() * this.categories.length)];
  
  challenge = signal<ImageChallenge>({
    question: `Select all images with ${this.targetCategory.replace('_', ' ')}:`,
    images: this.chooseImages()
  });
  
  chooseImages() {
    const images: Image[] = [];
    for (let i=0; i < 9; i++) {
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
  
  
  SelectedImages = signal<Set<number>>(new Set());

  toggle(img: Image) {    
    console.log({img});
    // console.log(this.SelectedImages);
    
    
    const set = new Set(this.SelectedImages());
    set.has(img.id) ? set.delete(img.id) : set.add(img.id);
    this.SelectedImages.set(set); 
    console.log({set});
    //loop through the selected images and log their id and isCorrect value
    this.challenge().images.forEach(image => {
      if (set.has(image.id)) {
        console.log(`Selected image: id=${image.id}, isCorrect=${image.isCorrect}`);
      }
    });
  }

  submit() {
    const isValid = this.challenge().images.every(img =>
      img.isCorrect === this.SelectedImages().has(img.id)
    );
    if (isValid) {
      alert('Captcha passed ✅');
    } else {
      alert('Try again ❌');
      this.SelectedImages.set(new Set());
      this.challenge.set({
        question: `Select all images with ${this.targetCategory.replace('_', ' ')}:`,
        images: this.chooseImages()
      });
    }
  }
  

  // //IMAGE DATA POOL
  // private pool = {
  //   mongolian_Cats: [
  //     'assets/captcha/downSyndrom1.png',
  //     'assets/captcha/downSyndrom2.png',
  //     'assets/captcha/downSyndrom1.png',
  //     'assets/captcha/downSyndrom2.png',
  //     'assets/captcha/downSyndrom1.png',
  //     'assets/captcha/downSyndrom2.png',
  //     'assets/captcha/downSyndrom1.png',
  //     'assets/captcha/downSyndrom2.png'
  //   ],
  //   Normal_Cats: [
  //     'assets/captcha/cat1.png',
  //     'assets/captcha/cat2.png'
  //   ],

  // };

  // //  STATE  
  // challenge = signal(this.generateChallenge());
  // selected = signal<Set<number>>(new Set());

  // //  TOGGLE IMAGE  
  // toggle(img: CaptchaImage) {
  //   const set = new Set(this.selected());
  //   set.has(img.id) ? set.delete(img.id) : set.add(img.id);
  //   this.selected.set(set);
  // }

  // //  VALIDATION  
  // isValid = computed(() =>
  //   this.challenge().images.every(img =>
  //     img.isCorrect === this.selected().has(img.id)
  //   )
  // );

  // //  VERIFY  
  // verify() {
  //   if (this.isValid()) {
  //     alert('Captcha passed ✅');
  //   } else {
  //     alert('Try again ❌');
  //   }
  // }

  // //  NEW CHALLENGE  
  // refresh() {
  //   this.selected.set(new Set());
  //   this.challenge.set(this.generateChallenge());
  // }

  // //  GENERATION LOGIC  
  // private generateChallenge() {
  //   const target = this.randomKey();
  //   const images: CaptchaImage[] = [];

  //   Object.entries(this.pool).forEach(([key, srcs]) => {
  //     srcs.forEach(src => {
  //       // console.log(src);
  //       // console.log(target);
  //       console.log(key);

  //       images.push({
  //         id: Math.random(),
  //         src,
  //         isCorrect: key === target
  //       });
  //     });
  //   });

  //   return {
  //     question: `Select all images with ${target}s`,
  //     images: this.shuffle(images)
  //   };
  // }

  // private randomKey() {
  //   const keys = Object.keys(this.pool);
  //   return keys[Math.floor(Math.random() * keys.length)];
  // }

  // private shuffle<T>(arr: T[]) {
  //   return [...arr].sort(() => Math.random() - 0.5);
  // }

}
