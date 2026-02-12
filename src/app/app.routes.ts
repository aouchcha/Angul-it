import { Routes } from '@angular/router';
import { Home } from './home/home';
import { CaptchaHolder } from './captcha-holder/captcha-holder';
import { BadRequest } from './bad-request/bad-request';
import { Result } from './result/result';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'captcha',
        component: CaptchaHolder
    },
    {
        path: 'BadRequest',
        component: BadRequest
    },
    {
        path: 'result',
        component: Result
    }
];
