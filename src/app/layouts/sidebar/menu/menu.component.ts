import { Component, Input } from '@angular/core';
import { Route } from '../../../core/interfaces/route.interface';
import { SideBarService } from 'src/app/core/services/side-bar.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  @Input('menu') menu!: Route;
  hiddenSubM = false;

  constructor(private _sidebarService: SideBarService) {}

  openSubMenu() {
    this.hiddenSubM = this.hiddenSubM ? false : true;
  }

  toggleSideBar() {
    this._sidebarService.toggleSideBar();
  }
}
