import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gestionmanagers';

  constructor(private router: Router) {}
  isLoginPage() {
    return this.router.url === '/login';
  }
}
