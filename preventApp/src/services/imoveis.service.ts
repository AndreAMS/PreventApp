import { ImovelDAO } from '../dao/imoveis.dao';
import { Component, Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { IImovel } from '../models/imovel.model';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

@Component({
    providers: [ImovelDAO]
})
export class ImovelService {

    private _imovel: IImovel;

    constructor(private _http: Http, private _imovelDAO: ImovelDAO) {
        this._imovelDAO.initDB();
        console.log(this._imovelDAO);
    }

    public requestData(): void {

        this._imovelDAO.getAll().then(data => {
            this.requestServerImoveis();            
        });
        
    }

    public sendData() {

        return new Promise(resolve => {

            var data = this._imovelDAO._imoveis;
            var headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Access-Control-Allow-Origin','*');
            headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

            console.log(data.length);
            var dados = JSON.stringify(data);
            console.log(dados);

            this._http.post('http://52.45.198.8:8080/dengueprevent/api/saveimovel', dados, {headers: headers})
            .subscribe(data => {
                resolve(true);
            });

        })
    }

    private requestServerImoveis() {

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin','*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

        var data = "{ \"token\": \"teste\" }";

        this._http.post('http://52.45.198.8:8080/dengueprevent/api/imovel', data, {headers: headers})
        .subscribe(data => {
                var d = data.json();  

                for(var r in d.list) {
                    var codigo = d.list[r].imovCodigo;
                    var exists = this._imovelDAO._imoveis.filter(r => r.imovCodigo === codigo).length > 0 ? true: false;
                    
                    if (!exists)
                    {
                        let imovel: IImovel;
                        imovel = new IImovel();
                        imovel.imovCodigo = d.list[r].imovCodigo;
                        imovel.imovCep = d.list[r].imovCep;
                        imovel.imovLogradouro = d.list[r].imovLogradouro;
                        imovel.imovNumero = d.list[r].imovNumero;
                        imovel.imovComplemento = d.list[r].imovComplemento;
                        imovel.imovStatus = d.list[r].imovStatus;
                        imovel.imovQuadra = d.list[r].imovQuadra;
                        imovel.imovPontoEstrategico = d.list[r].imovPontoEstrategico;
                        imovel.imovNomeContato = d.list[r].imovNomeContato;
                        imovel.imovEmailContato = d.list[r].imovEmailContato;
                        imovel.imovTelefoneContato = d.list[r].imovTelefoneContato;
                        imovel.imovCelularContato = d.list[r].imovCelularContato;
                        imovel.bairCodigo = d.list[r].bairCodigo;
                        imovel.etiqIdentificacao = d.list[r].etiqIdentificacao;

                        this._imovelDAO.add(imovel);
                    }

                }
        });
    }

}

