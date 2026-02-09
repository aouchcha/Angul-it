import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CaptchaHolder } from './captcha-holder/captcha-holder';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'captcha',
        component: CaptchaHolder
    }
];
