import { AtividadeDAO } from '../dao/atividade.dao';
import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IAtividade} from '../models/atividade.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  providers: [AtividadeDAO]
})
export class AtividadeService {

  private _atividade: IAtividade;

  constructor(private _http: Http, private _atividadeDAO: AtividadeDAO) {
      this._atividadeDAO.initDB();    
  }

  public requestData(): void {

    this._atividadeDAO.getAll().then(data => {
      if (data.length === 0) {
        this.requestServerAtividade();
      }
    });

  }

   private requestServerAtividade() {

    new Promise(resolve => {
            this._http.get('assets/mock/atividades.json')
                .subscribe((response: Response) => resolve(response.json()));
        }).then(data => {

      let atividades: IAtividade[];
      atividades = <IAtividade[]>data;
      
      for (var atividade of atividades)
      {
         this._atividadeDAO.add(atividade);
      }

    });

  }

}
