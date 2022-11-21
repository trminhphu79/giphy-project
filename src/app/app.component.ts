import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BaseComponent } from '@utils/base';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'giphy-tmp'
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    });
  }
}
