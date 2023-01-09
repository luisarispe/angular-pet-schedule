import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProfileRoutingModule } from './profile.routing';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, MaterialCdkModule],
})
export class ProfileModule {}
