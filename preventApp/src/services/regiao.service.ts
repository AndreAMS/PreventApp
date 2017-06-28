import { RegiaoDAO } from '../dao/regiao.dao';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IRegiao } from '../models/regiao.model';
import { Observable } from 'rxjs/Observable';
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

    this._regiaoDAO.getAll().then(data => {
      this.requestServerRegiao();
    });
    
  }

  private requestServerRegiao() {
     var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Access-Control-Allow-Origin','*');
     headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

     var data = "{ \"token\": \"teste\" }";

     this._http.post('http://52.45.198.8:8080/dengueprevent/api/regiao', data, {headers: headers})
      .subscribe(data => {
              var d = data.json();  

              for(var r in d.list) {
                var codigo = d.list[r].regCodigo;
                var exists = this._regiaoDAO._regioes.filter(r => r.regCodigo === codigo).length > 0 ? true: false;
                
                if (!exists)
                {
                    let regiao: IRegiao;
                    regiao = new IRegiao();
                    regiao.regCodigo = d.list[r].regCodigo;
                    regiao.regNome = d.list[r].regNome;
                    regiao.regAtivo = d.list[r].regAtivo;
                    this._regiaoDAO.add(regiao);
                }

              }
      });

  }

}
