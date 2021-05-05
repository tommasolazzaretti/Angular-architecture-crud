import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {ItemCardModule} from '../../global/components/item-card/item-card.module';
import {ConfirmModalModule} from '../../global/components/confirm-modal/confirm-modal.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ItemCardModule,
    ConfirmModalModule
  ],
  providers: []
})
export class DashboardModule { }
