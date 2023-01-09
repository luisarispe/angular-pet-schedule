import { NgModule } from '@angular/core';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthRoutingModule } from './auth.routing';

@NgModule({
  declarations: [SignInComponent],
  imports: [MaterialCdkModule, SharedModule, AuthRoutingModule],
})
export class AuthModule {}
