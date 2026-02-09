import { Component, signal } from '@angular/core';
import { form, FormField, required, SchemaPath, validate } from '@angular/forms/signals';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface LoginData {
  username: string;
}

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FormField
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {

  constructor(private router: Router) {}

  loginModule = signal<LoginData>({
    username: ''
  })
  loginForm = form(this.loginModule, (fieldPath) => {
    required(fieldPath.username, {message: 'Username is required'});
    this.TrimCheck(fieldPath.username);
  });

  TrimCheck(path: SchemaPath<string>, options?: {message?: string}) {
     validate(path, ({value}) => {
      if (typeof value() === 'string' && value().trim() === '') {
        return {
          kind:'emptyUsename', 
          message: 'Username cannot be only whitespace' 
        };
      }
      return null;
    });
  }


  submit() {
    console.log(this.loginModule());
    this.router.navigate(['/captcha']);
  }
}
