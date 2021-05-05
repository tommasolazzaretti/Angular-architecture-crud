import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CrudRoutingModule} from './crud-routing.module';
import {CrudComponent} from './crud.component';
import {ClrFormsModule} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [CrudComponent],
  imports: [
    CommonModule,
    CrudRoutingModule,
    ClrFormsModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CrudModule { }
