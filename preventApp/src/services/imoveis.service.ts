import { ImovelDAO } from '../dao/imoveis.dao';
import { Component, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
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
    }

    public requestData(): void {

        this._imovelDAO.getAll().then(data => {
            if (data.length === 0) {
                this.requestServerImoveis();
            }
        });
        
    }

    private requestServerImoveis() {

        new Promise(resolve => {
            this._http.get('assets/mock/imoveis.json')
                .subscribe((response: Response) => resolve(response.json()));
        }).then(data => {

            let imoveis: IImovel[];
            imoveis = <IImovel[]>data;

            for (var imovel of imoveis) {
                this._imovelDAO.add(imovel);
            }

        });
    }

}
