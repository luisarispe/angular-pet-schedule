import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SideBarService {
  private sideNav!: MatSidenav;
  constructor() {}

  public setSidenav(sidenav: MatSidenav) {
    this.sideNav = sidenav;
  }
  public toggleSideBar(): void {
    this.sideNav.toggle();
  }
}
