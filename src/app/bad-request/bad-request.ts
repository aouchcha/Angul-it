import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bad-request',
  imports: [],
  templateUrl: './bad-request.html',
  styleUrl: './bad-request.css',
})
export class BadRequest implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
      localStorage.removeItem('data');
  }

  home() {
    this.router.navigate(['/']);
  }
}
