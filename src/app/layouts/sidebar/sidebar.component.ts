import { Component } from '@angular/core';
import { Route } from '../../core/interfaces/route.interface';
import { UserService } from 'src/app/core/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  routes: Route[] = [
    {
      route: '/home',
      name: 'Inicio',
      icon: 'home',
      children: [],
    },
    {
      route: '',
      name: 'Mascotas',
      icon: 'cruelty_free',
      children: [
        {
          route: '/pets',
          name: 'Lista',
          icon: 'radio_button_unchecked',
        },
        {
          route: '/pets/create',
          name: 'Agregar',
          icon: 'radio_button_unchecked',
        },
      ],
    },
    {
      route: '',
      name: 'Propietarios',
      icon: 'account_box',
      children: [
        {
          route: '/owners',
          name: 'Lista',
          icon: 'radio_button_unchecked',
        },
        {
          route: '/owners/create',
          name: 'Agregar',
          icon: 'radio_button_unchecked',
        },
      ],
    },
    {
      route: '/schedules',
      name: 'Agendas',
      icon: 'calendar_today',
      children: [],
    },
  ];

  $user: Observable<User> = new Observable<User>();
  constructor(private _userService: UserService) {
    this.$user = this._userService.user$;
  }
}
