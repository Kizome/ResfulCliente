import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Grupo } from '../model/Grupo';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.page.html',
  styleUrls: ['./form-group.page.scss'],
})
export class FormGroupPage {

  private group: Grupo;
  private mode: string;
  private form: FormGroup;

  constructor(private navParams: NavParams,
    private modal: ModalController,
    private formBuilder: FormBuilder) {
    this.group = navParams.get('group');
    console.log(this.group);
    //console.log(this.user.id)
    if (this.group && this.group.id) {
      this.mode = 'Editando';
    } else {
      this.mode = 'Creando';
      this.group = {
        id: '',
        nombre: ''
      }
    }

    this.form = this.formBuilder.group({
      id: new FormControl(this.group.id),
      nombre: new FormControl(
        this.group.nombre,
        Validators.compose([Validators.required, Validators.maxLength(128)])
      )
    })

  }

  get errorControl() {
    return this.form.controls;
  }

  get errorControlNombre() {
    if (this.errorControl.nombre.status === 'INVALID') {
      if (this.errorControl.nombre.errors.required) {
        return 'Campo "nombre" requerido';
      }
      if (this.errorControl.nombre.errors.maxLength) {
        return 'La longitud maxima del nombre es de 128 caracteres';
      }
    }
  }

  submitForm() {
    this.dismiss(this.form.value);
  }

  public dismiss(group: Grupo) {
    this.modal.dismiss(group);
  }

}
