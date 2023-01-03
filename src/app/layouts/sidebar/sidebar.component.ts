import { Component } from '@angular/core';
import { Route } from '../../core/interfaces/route.interface';

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
          route: '/propietarios',
          name: 'Lista',
          icon: 'radio_button_unchecked',
        },
        {
          route: '/propietarios/create',
          name: 'Agregar',
          icon: 'radio_button_unchecked',
        },
      ],
    },
  ];
}
