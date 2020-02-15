import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HTTP) { }

  public getItem(id?: number | string): Promise<Usuario[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiItem;
      if (id) {
        endpoint += id;
      }
      this.http
        .get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            console.log(JSON.parse(d.data));
            resolve(JSON.parse(d.data));
          } else {
            resolve(null);
          }

        })
        .catch(err => reject(err));
    });


  }

  public searchByNick(value: string): Promise<Usuario[] | null> {
    return this.getItem('search/' + value)
  }

  public removeUser(usuario: Usuario): Promise<void> {
    const id: any = usuario.id ? usuario.id : usuario;
    const endpoint = environment.endpoint + environment.apiItem + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    })
  }

  public createUser(usuario: Usuario): Promise<void> {
    const endpoint = environment.endpoint + environment.apiItem;
    return new Promise((resolve, reject) => {
      if (usuario) {
        this.http.setDataSerializer('json');
        this.http
          .post(endpoint, usuario, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe usuario');
      }
    })
  }

  public editUser(usuario: Usuario): Promise<void> {
    const endpoint = environment.endpoint + environment.apiItem;
    return new Promise((resolve, reject) => {
      if (usuario) {
        this.http.setDataSerializer('json');
        this.http
          .put(endpoint, usuario, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe usuario');
      }
    })
  }

  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
  }

}
