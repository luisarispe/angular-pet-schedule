import { NgModule } from '@angular/core';
import { OwnersComponent } from './pages/owners/owners.component';
import { MaterialCdkModule } from 'src/app/material-cdk/material-cdk.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OwnersRoutingModule } from './owners.routing';
import { OwnersCreateComponent } from './pages/owners-create/owners-create.component';
import { OwnersDataSourceService } from './services/owners-data-source.service';

@NgModule({
  declarations: [OwnersComponent, OwnersCreateComponent],
  imports: [MaterialCdkModule, SharedModule, OwnersRoutingModule],
  providers: [OwnersDataSourceService],
})
export class OwnersModule {}
