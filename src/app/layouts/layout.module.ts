import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layouts.component';
import { MaterialCdkModule } from '../material-cdk/material-cdk.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuComponent } from './sidebar/menu/menu.component';

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SidebarComponent,
    MenuComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialCdkModule],
  exports: [FooterComponent, HeaderComponent, LayoutComponent],
})
export class LayoutModule {}
