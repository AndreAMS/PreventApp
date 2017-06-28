import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { RegiaoService } from '../services/regiao.service';
import { BairroService } from '../services/bairro.service';
import { ImovelService } from '../services/imoveis.service';
import { AtividadeService } from '../services/atividade.service';
import { VistoriaService } from '../services/vistoria.service';
import { PlanejamentoService } from '../services/planejamento.service';

@Component({
  providers: [RegiaoService, BairroService, ImovelService, VistoriaService]
})
export class SyncService {

  constructor(private _http: Http, private _regiaoService: RegiaoService, private _bairroService: BairroService, private _imovelService: ImovelService,
    private _atividadeService: AtividadeService, private _vistoriaService: VistoriaService, private _planejamentoService: PlanejamentoService) {

  }

  sincronizar(token) {
    return new Promise(resolve => {
      if (token !== null)
      {
        this._regiaoService.requestData();
        this._bairroService.requestData();
        this._imovelService.requestData();  

        this._planejamentoService.requestData(token).then(data => {
          resolve(true);
        });
      }    
      else
      {
        resolve(true);
      }
      
      //this._vistoriaService.requestData(token);
    });
  };

  enviar(token) {
      this._imovelService.sendData().then(data => {
        this._vistoriaService.sendData().then(data => {
          alert("Sincronização realizada com sucesso!");
        })
      });    
  }

  limpar() {
    
  }

}
