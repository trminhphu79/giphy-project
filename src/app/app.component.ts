import { Component } from '@angular/core';
import { BaseComponent } from '@utils/base';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
  title = 'giphy-tmp';
  constructor() {
    super()
  }
}
