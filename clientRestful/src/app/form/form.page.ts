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
import { Grupo } from '../model/Grupo';
import { ApiService } from '../services/api.service';
import { stringify } from 'querystring';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage {
  public user: Usuario;
  public mode: string;
  public form: FormGroup;
  public puntuaciones : Puntuacion[];
  public gruposDisponibles: Grupo[];
  public gruposSeleccionados: String[];
  

  constructor(private navParams: NavParams,
    private modal: ModalController,
    private formBuilder: FormBuilder,
    private api: ApiService) {
    this.user = navParams.get('user');

    this.probando();
  }

  ngOnInit() {
    this.gruposDisponibles = [];
    this.gruposSeleccionados = [];
    this.puntuaciones = [];
    
    this.form = this.formBuilder.group({
      nick: ['', Validators.compose([Validators.required, Validators.maxLength(128)])],
      grupos: [''],
      puntuaciones: [''],
      estado: ['', Validators.maxLength(256)]
    })

    if (this.user) {
      this.mode = "Editar usuario";
        this.form.get("nick").setValue(this.user.nick); 
        this.form.get("estado").setValue(this.user.estado);
        this.user.grupos.forEach(element => {
          this.gruposSeleccionados.push(element.nombre);
        });
        
        this.form.get("grupos").setValue(this.user.grupos);
        this.form.get("puntuaciones").setValue(this.user.puntuaciones);
      
    }  else{
      this.user = {"id":"", "nick":"", "puntuaciones":[], "grupos":[], "estado":""};
      this.mode = "Crear usuario";
    }
  }

  public async probando() {


    try {
      this.gruposDisponibles = await this.api.getGroup();
    } catch (err) {

    }
  }

  getGruposPorNombre() : Grupo[] {
    let grupito : Grupo[] = [];
    console.log(this.gruposSeleccionados);
    for(let nombre of this.gruposSeleccionados)
    this.gruposDisponibles.forEach(element => {
      if(element.nombre==nombre){        
        element.usuarios = null;
        grupito.push(element);
      }
    });
    return grupito;
  }



  submitForm() {
    this.user.nick = this.form.get("nick").value;
    this.user.estado = this.form.get("estado").value;
    this.user.puntuaciones = [];
    this.user.grupos = this.getGruposPorNombre();
    this.modal.dismiss(this.user);
  }

}
