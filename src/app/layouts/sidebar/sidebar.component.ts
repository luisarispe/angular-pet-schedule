import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  hiddenSubM = false;
  changeSubMenu() {
    this.hiddenSubM = this.hiddenSubM ? false : true;
    console.log(this.hiddenSubM);
  }
}
