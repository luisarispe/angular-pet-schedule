import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { LayoutComponent } from './layouts/layouts.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'pets',
        loadChildren: () =>
          import('./modules/pets/pets.module').then((m) => m.PetsModule),
      },
      {
        path: 'owners',
        loadChildren: () =>
          import('./modules/owners/owners.module').then((m) => m.OwnersModule),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
