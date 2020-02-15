import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormGroupPageRoutingModule } from './form-group-routing.module';

import { FormGroupPage } from './form-group.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormGroupPageRoutingModule
  ],
  declarations: [FormGroupPage]
})
export class FormGroupPageModule {}
