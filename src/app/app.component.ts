import { Component } from '@angular/core';

import { menuItems } from './app.menu';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng4redux demo app';
  menuItems = menuItems;
}
