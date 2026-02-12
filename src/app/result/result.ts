import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  imports: [],
  templateUrl: './result.html',
  styleUrl: './result.css',
})
export class Result implements OnInit {
  private data: any | null = null;
constructor(private router: Router) { }
  ngOnInit(): void {
    const data = localStorage.getItem('data'); 
    if (data !== null) { 
      const parsedData = JSON.parse(data); 
      this.data = parsedData
      console.log(parsedData); 
    }else{
      this.router.navigate(['/BadRequest']);
    }
  }
}
