import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideBarService } from 'src/app/core/services/side-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private _sidebarService: SideBarService) {}

  toggleSideBar() {
    this._sidebarService.toggleSideBar();
  }
}
