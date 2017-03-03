import { VistoriaDAO } from '../dao/vistoria.dao';
import {Component, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {IVistoria} from '../models/vistoria.model';
import {Observable} from 'rxjs/Observable';
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

  public requestData(): void {

    this.requestServerVistoria();

  }

   private requestServerVistoria() {

    new Promise(
        resolve => {
            this._http.get('assets/mock/vistoria.json')
                .subscribe((response: Response) => resolve(response.json()));
        }).then(data => {

      let vistorias: IVistoria[];
      vistorias = <IVistoria[]>data;

      //this._vistoriaDAO.clean();
      
      for (var vistoria of vistorias)
      {
         this._vistoriaDAO.add(vistoria);
      }

    });

  }

}
