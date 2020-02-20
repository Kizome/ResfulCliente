import { Component, ViewChild } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Usuario } from '../model/Usuario';
import { UiService } from '../services/ui.service';
import { IonSearchbar } from '@ionic/angular';
import { FormPage } from '../form/form.page';
import { Puntuacion } from '../model/Puntuacion';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listado: Array<Usuario>
  @ViewChild('input', { static: false }) myInput: IonSearchbar;

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
      console.log(err);
      await this.ui.showToast(err.error);

    }

  }



  public async buscaUser($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      this.api.searchByNick(value)
        .then(d => {
          this.listado = d;
        })
        .catch(
          async (err) => {
            console.log(err);
          await this.ui.showToast(err.error);
          }
        )
        .finally(async () => {
          this.myInput.setFocus();
        });
    } else {
      await this.loadAll();
    }
  }

  public async addUser() {
    const itemToBeCreated = await this.ui.showModal(FormPage, { item: {} });
    let user: Usuario;
    if (itemToBeCreated.data) {

      user = itemToBeCreated.data;
    }

    try {
      // idgrup = itemToBeCreated.data.idgrupos;
      // grup = itemToBeCreated.data.grupos;
      // itemToBeCreated.data.grupos = []

      if (user) {
        
        await this.ui.showLoading();
        // itemToBeCreated.data.grupos.push({id:idgrup, nombre: grup})
        console.log(user);
        await this.api.createUser(user);
        await this.loadAll();
      }
    } catch (err) {
      console.log(err);
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }

  public async editUser(user: Usuario) {
    const itemToBeUpdated = await this.ui.showModal(FormPage, { user });
    console.log('editar')
    console.log(itemToBeUpdated);
    try {
      if (itemToBeUpdated.data) {
        await this.ui.showLoading();
        await this.api.editUser(itemToBeUpdated.data);
        await this.loadAll();
      }
    } catch (err) {
      console.log(err);
      await this.ui.hideLoading();
      await this.ui.showToast(err.error);
    }
  }

  public async removeUser(usuario: Usuario) {
    await this.ui.showLoading();
    this.api
      .removeUser(usuario)
      .then(async d => await this.loadAll())
      .catch(async err => {
        console.log(err);
        await this.ui.showToast(err.error);
      })
      .finally(async () => {
        console.log("???????????");
        await this.ui.hideLoading();
      })
  }


}
