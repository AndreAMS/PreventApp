import { BairroDAO } from '../dao/bairro.dao';
import { Component, Injectable  } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
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
      this.requestServerBairro();
    });
  
  }

  private requestServerBairro() {

    var headers = new Headers();
     headers.append('Content-Type', 'application/json');
     headers.append('Access-Control-Allow-Origin','*');
     headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

     var data = "{ \"token\": \"teste\" }";

     this._http.post('http://52.45.198.8:8080/dengueprevent/api/bairro', data, {headers: headers})
      .subscribe(data => {
              var d = data.json();  

              for(var r in d.list) {
                var codigo = d.list[r].bairCodigo;
                var exists = this._bairroDAO._bairros.filter(r => r.bairCodigo === codigo).length > 0 ? true: false;
                
                if (!exists)
                {
                    let bairro: IBairro;
                    bairro = new IBairro();
                    bairro.bairCodigo = d.list[r].bairCodigo;
                    bairro.bairNome = d.list[r].bairNome;
                    bairro.regCodigo = d.list[r].regCodigo;
                    this._bairroDAO.add(bairro);
                }

              }
      });


  }

}
