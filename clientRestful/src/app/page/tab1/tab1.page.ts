import { Component, ViewChild } from '@angular/core';
import { Grupo } from 'src/app/model/Grupo';
import { IonSearchbar } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { UiService } from 'src/app/services/ui.service';
import { FormGroupPage } from 'src/app/form-group/form-group.page';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  public listado: Array<Grupo>
  @ViewChild('input', {static:false}) myInput: IonSearchbar;

  constructor(private api: ApiService,
    private ui: UiService) { }

  async ionViewDidEnter() {
    await this.loadAll();
  }

  public async loadAll() {
    await this.ui.showLoading();
    try {
      this.listado = await this.api.getGroup();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null;
      console.log(err);
      await this.ui.showToast(err.error);
      await this.ui.hideLoading();

    }

  }

  public async addGrupo(){
    const itemToBeCreated = await this.ui.showModal(FormGroupPage, {item: {}});
    console.log(itemToBeCreated);
    try{
      if(itemToBeCreated.data){
        await this.ui.showLoading();
        await this.api.createGroup(itemToBeCreated.data);
        await this.loadAll();
      }
    }catch(err){
      console.log(err);
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
      console.log(err);
    }
  }

  public async editGroup(group: Grupo){
    const itemToBeUpdated = await this.ui.showModal(FormGroupPage, {group});
    console.log('editar')
    console.log(itemToBeUpdated);
    try{
      if(itemToBeUpdated.data){
        await this.ui.showLoading();
        await this.api.editGroup(itemToBeUpdated.data);
        await this.loadAll();
      }
    }catch(err){
      console.log(err);
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }

  public async removeGroup(group: Grupo){
    await this.ui.showLoading();
    this.api
    .removeGroup(group)
    .then(async d=> await this.loadAll())
    .catch(async err => {await this.ui.showToast(err.error)
    console.log(err)})
    .finally(async()=>{
      await this.ui.hideLoading();
    })
  }

}
