import { BairroDAO } from '../dao/bairro.dao';
import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { IBairro } from '../models/bairro.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  providers: [BairroDAO]
})
export class BairroService {

  private _bairro: IBairro;

  constructor(private _http: Http, private _bairroDAO: BairroDAO) {
    this._bairroDAO.initDB();
  }

  public requestData(): void {

    this._bairroDAO.getAll().then(data => {
      if (data.length === 0) {
        this.requestServerBairro();
      }
    });
  
  }

  private requestServerBairro() {

    new Promise(resolve => {
      this._http.get('assets/mock/bairro.json')
        .subscribe((response: Response) => resolve(response.json()));
    }).then(data => {

      let bairros: IBairro[];
      bairros = <IBairro[]>data;

      for (var bairro of bairros) {
        this._bairroDAO.add(bairro);
      }

    });

  }

}
