import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { Usuario } from '../model/Usuario';
import { Puntuacion } from '../model/Puntuacion';

import {
  Validators,
  FormBuilder,
  FormGroup,
  FormControl
} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  private user: Usuario;
  private mode: string;
  private form: FormGroup;

  constructor(private navParams: NavParams,
    private modal: ModalController,
    private formBuilder: FormBuilder) {
    this.user = navParams.get('user');
    console.log(this.user);
    //console.log(this.user.id)
    if (this.user && this.user.id) {
      this.mode = 'Editando';
    } else {
      this.mode = 'Creando';
      this.user = {
        id: '',
        puntuaciones: [],
        nick: '',
        estado: ''
      }
    }

    if (this.mode === 'Creando') {
      this.form = this.formBuilder.group({
        id: new FormControl(this.user.id),
        nick: new FormControl(
          this.user.nick,
          Validators.compose([Validators.required, Validators.maxLength(128)])
        ),
        puntuaciones: new FormControl(this.user.puntuaciones),
        estado: new FormControl(
          this.user.estado,
          Validators.compose([Validators.required, Validators.maxLength(256)])
        )
      })
    } else {
      let puntua = this.user.puntuaciones
      this.form = this.formBuilder.group({
        id: new FormControl(this.user.id),
        nick: new FormControl(
          this.user.nick,
          Validators.compose([Validators.required, Validators.maxLength(128)])
        ),
        puntuaciones: new FormControl(puntua[0].cantidad),
        estado: new FormControl(
          this.user.estado,
          Validators.compose([Validators.required, Validators.maxLength(256)])
        )
      })
    }

  }

  get errorControl() {
    return this.form.controls;
  }

  get errorControlNick() {
    if (this.errorControl.nick.status === 'INVALID') {
      if (this.errorControl.nick.errors.required) {
        return 'Campo "nick" requerido';
      }
      if (this.errorControl.nick.errors.maxLength) {
        return 'La longitud maxima del nick es de 128 caracteres';
      }
    }
  }

  get errorControlEstado() {
    if (this.errorControl.estado.status === 'INVALID') {
      if (this.errorControl.estado.errors.required) {
        return 'Campo "estado" requerido';
      }
      if (this.errorControl.nick.errors.maxLength) {
        return 'La longitud maxima del nick es de 256 caracteres';
      }
    }
  }

  submitForm() {
    this.dismiss(this.form.value);
  }

  public dismiss(user: Usuario) {
    this.modal.dismiss(user);
  }

}
