import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmModalComponent} from './confirm-modal.component';
import {ClrModalModule} from '@clr/angular';

@NgModule({
  declarations: [ConfirmModalComponent],
  exports: [
    ConfirmModalComponent
  ],
  imports: [
    CommonModule,
    ClrModalModule
  ]
})

export class ConfirmModalModule { }
