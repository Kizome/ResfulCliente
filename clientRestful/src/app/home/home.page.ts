import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Usuario } from '../model/Usuario';
import { UiService } from '../services/ui.service';
import { IonSearchbar } from '@ionic/angular';
import { FormPage } from '../form/form.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listado: Array<Usuario>
  @ViewChild('input', {static:false}) myInput: IonSearchbar;

  constructor(private api: ApiService,
    private ui: UiService) { }

  async ionViewDidEnter() {
    await this.loadAll();
  }

  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.listado = await this.api.getItem();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null;
      await this.ui.showToast(err.error);

    }

  }

  

  public async buscaUser($event){
    let value = $event.detail.value;
    value = value.trim();
    if(value!==''){
      this.api.searchByNick(value)
      .then(d=>{
        this.listado = d;
      })
      .catch(
        async err=> await this.ui.showToast(err.error)
      )
      .finally(async () => {
        this.myInput.setFocus();
      });
    }else{
      await this.loadAll();
    }
  }

  public async addUser(){
    const itemToBeCreated = await this.ui.showModal(FormPage, {item: {}});
    console.log(itemToBeCreated);
    try{
      if(itemToBeCreated.data){
        await this.ui.showLoading();
        await this.api.createUser(itemToBeCreated.data);
        await this.loadAll();
      }
    }catch(err){
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
      console.log(err);
    }
  }

  public async editUser(user: Usuario){
    const itemToBeUpdated = await this.ui.showModal(FormPage, {user});
    console.log('editar')
    console.log(itemToBeUpdated);
    try{
      if(itemToBeUpdated.data){
        await this.ui.showLoading();
        await this.api.editUser(itemToBeUpdated.data);
        await this.loadAll();
      }
    }catch(err){
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }

  public async removeUser(usuario: Usuario){
    await this.ui.showLoading();
    this.api
    .removeUser(usuario)
    .then(async d=> await this.loadAll())
    .catch(async err => {await this.ui.showToast(err.error)
    console.log(err)})
    .finally(async()=>{
      await this.ui.hideLoading();
    })
  }
  

}
