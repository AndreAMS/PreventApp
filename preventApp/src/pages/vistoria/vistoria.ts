import { TratamentoVetorialPage } from '../tratamentoVetorial/tratamentoVetorial';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { VistoriaDAO } from '../../dao/vistoria.dao';
import { IVistoria } from '../../models/vistoria.model';

@Component({
    templateUrl: 'vistoria.html'
})
export class VistoriaPage {

    private _imovelId: number;
    private _bairroId: number;
    private _atividadeId: number;
    private _vistoriaId: number;
    imoveis: any;
    vistoria: {};
    
    private _navCtrl: NavController;
    
    constructor(private navCtrl: NavController, private navParams: NavParams, private loadingController: LoadingController, private imovelDAO: ImovelDAO, private vistoriaDAO: VistoriaDAO) {        
        this._navCtrl = navCtrl;
        this._imovelId = this.navParams.get('imovelId');
        this._bairroId = this.navParams.get('bairroId');
        this._atividadeId = this.navParams.get('atividadeId');
        this._vistoriaId = this.navParams.get('vistoriaId');
        this.vistoria = {};
    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {
            
            this.imovelDAO.getById(this._imovelId).then(data => {                    
                    this.imoveis = data;
                    loader.dismiss();
                });

            /*if (this._vistoriaId > 0)
            {
                this.vistoriaDAO.getById(this._vistoriaId).then(data => {                    
                    this.vistoria = data;
                    loader.dismiss();
                });
            }*/

        });        
    }    

    naoAtendimento() {
        var vistoria = new IVistoria();
        vistoria.ImovelId = this._imovelId;
        vistoria.DataHora = new Date().toLocaleDateString();
        vistoria.Status = "Não Atendimento";
        vistoria.Nova = "Sim";

        this.vistoriaDAO.add(vistoria);

        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }

    naoEncontrado() {
        var vistoria = new IVistoria();
        vistoria.ImovelId = this._imovelId;
        vistoria.DataHora = new Date().toLocaleDateString();
        vistoria.Status = "Não Encontrado";
        vistoria.Nova = "Sim";

        this.vistoriaDAO.add(vistoria);

        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }
}
