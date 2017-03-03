import { RegiaoDAO } from '../dao/regiao.dao';
import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IRegiao} from '../models/regiao.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  providers: [RegiaoDAO]
})
export class RegiaoService {

  private _regiao: IRegiao;

  constructor(private _http: Http, private _regiaoDAO: RegiaoDAO) {
      this._regiaoDAO.initDB();
  }

  public requestData(): void {

    this.requestServerRegiao();

  }

   private requestServerRegiao() {

    new Promise(resolve => {
            this._http.get('assets/mock/regiao.json')
                .subscribe((response: Response) => resolve(response.json()));
        }).then(data => {

      let regioes: IRegiao[];
      regioes = <IRegiao[]>data;

      //this._regiaoDAO.clean();
      
      for (var regiao of regioes)
      {
        this._regiaoDAO.add(regiao);
      }

    });
  }

}
