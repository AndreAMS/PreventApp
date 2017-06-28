import { PlanejamentoDAO } from '../dao/planejamento.dao';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IPlanejamento } from '../models/planejamento.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
  providers: [PlanejamentoDAO]
})
export class PlanejamentoService {

  private _planejamento: IPlanejamento;

  constructor(private _http: Http, private _planejamentoDAO: PlanejamentoDAO) {
    this._planejamentoDAO.initDB();
  }

  public requestData(token) {

    return new Promise(resolve => {

      for (var p in this._planejamentoDAO._planejamentos)
      {
          this._planejamentoDAO._planejamentos[p].Date = new Date();
          this._planejamentoDAO.delete(this._planejamentoDAO._planejamentos[p]);
      }

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Access-Control-Allow-Origin','*');
      headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

      var data = "{ \"token\": \"" + token + "\" }";

      this._http.post('http://52.45.198.8:8080/dengueprevent/api/planejamento', data, {headers: headers})
        .subscribe(data => {
                var d = data.json();  

                console.log("--- Planejamento ---");
                console.log(d);

                for(var r in d.list) {
                  var codigo = d.list[r].plan_codigo;
                  var exists = this._planejamentoDAO._planejamentos.filter(r => r.plan_codigo === codigo).length > 0 ? true: false;
                  
                  /*if (!exists)
                  {*/
                      let planejamento: IPlanejamento;
                      planejamento = new IPlanejamento();
                      planejamento.Date = new Date();
                      planejamento.plan_codigo = d.list[r].plan_codigo;
                      planejamento.plan_datainicio = d.list[r].plan_datainicio;
                      planejamento.tipat_codigo = d.list[r].tipat_codigo;
                      planejamento.tipat_nome = d.list[r].tipat_nome;
                      planejamento.plan_dataconclusao = d.list[r].plan_dataconclusao;
                      planejamento.plan_baiCodigo =  d.list[r].plan_baiCodigo;
                      planejamento.plan_Ativo = 1;
                      this._planejamentoDAO.add(planejamento);                      
                  /*}
                  else
                  {
                    let planejamento: any;
                    planejamento = this._planejamentoDAO._planejamentos.filter(r => r.plan_codigo === codigo)[0];
                    console.log(planejamento);
                    planejamento.plan_Ativo = 1;
                    planejamento.Date = new Date();
                    this._planejamentoDAO.update(planejamento);
                  }*/

                }

                /*this._planejamentoDAO.getAll().then(data => {
                    this._planejamentoDAO._planejamentos = data;
                    resolve(true);
                });*/
                resolve(true);
      });

    });
    
  }

  
}
