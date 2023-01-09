import { Component, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { SideBarService } from 'src/app/core/services/side-bar.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private _sidebarService: SideBarService,
    private _router: Router,
    private _authService: AuthService
  ) {}

  toggleSideBar() {
    this._sidebarService.toggleSideBar();
  }
  logOut() {
    this._authService.signOut();
    this._router.navigateByUrl('auth');
  }
  profile() {
    this._router.navigateByUrl('profile');
  }
}
