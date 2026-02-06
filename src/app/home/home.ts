import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class Home {
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    usermame: ['', [Validators.required]],
  });
  

  submit(): void {
    if (!this.form.valid) return; 
    console.log(this.form.value);
  } 
}
