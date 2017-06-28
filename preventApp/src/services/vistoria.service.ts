import { VistoriaDAO } from '../dao/vistoria.dao';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IVistoria } from '../models/vistoria.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  providers: [VistoriaDAO]
})
export class VistoriaService {

  private _vistoria: IVistoria;

  constructor(private _http: Http, private _vistoriaDAO: VistoriaDAO) {
    this._vistoriaDAO.initDB();
  }

  public requestData(token): void {

    /*this._vistoriaDAO.getAll().then(data => {
      if (data.length === 0) {
        this.requestServerVistoria();
      }
    });*/


  }

  public sendData() {

    return new Promise(resolve => {
      var data = this._vistoriaDAO._vistoria;
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

      var dados = JSON.stringify(data);
      console.log(dados);

      this._http.post('http://52.45.198.8:8080/dengueprevent/api/savevistoria', dados, {headers: headers})
        .subscribe(data => {
              var d = data.json();  
              resolve(true);
          });

    });
  }

  private requestServerVistoria() {

    new Promise(
      resolve => {
        this._http.get('assets/mock/vistoria.json')
          .subscribe((response: Response) => resolve(response.json()));
      }).then(data => {

        let vistorias: IVistoria[];
        vistorias = <IVistoria[]>data;

        for (var vistoria of vistorias) {
          this._vistoriaDAO.add(vistoria);
        }

      });

  }

}
