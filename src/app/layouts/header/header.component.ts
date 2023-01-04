import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideBarService } from 'src/app/core/services/side-bar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private _sidebarService: SideBarService,
    private _router: Router
  ) {}

  toggleSideBar() {
    this._sidebarService.toggleSideBar();
  }
  logOut() {
    this._router.navigateByUrl('auth');
  }
}
