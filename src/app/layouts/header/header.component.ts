import { Component, Input } from '@angular/core';
import { SideBarService } from 'src/app/core/services/side-bar.service';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { SignOut } from 'src/app/store/user/user.actios';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(
    private _sidebarService: SideBarService,
    private _router: Router,
    private _store: Store
  ) {}

  toggleSideBar() {
    this._sidebarService.toggleSideBar();
  }
  logOut() {
    this._store.dispatch(new SignOut());
    this._router.navigateByUrl('auth');
  }
  profile() {
    this._router.navigateByUrl('profile');
  }
}
