import { IVistoria } from '../../models/vistoria.model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { AtividadeDAO } from '../../dao/atividade.dao';
import { VistoriaDAO } from '../../dao/vistoria.dao';
import { BairroDAO } from '../../dao/bairro.dao';
import { IVistoriaImovel } from '../../models/vistoriaImovel.model';
import { VistoriaPesquisaPage } from '../vistoriaPesquisa/vistoriaPesquisa';
import { HomePage } from '../home/home';
import { BarcodeScanner } from 'ionic-native';

@Component({
    templateUrl: 'pesquisaLarvarial.html'
})
export class PesquisaLarvarialPage {
    
    private _navCtrl: NavController;
    private _bairroId: string;
    private _tipat_codigo: number;
    imoveis: any;
    bairro: any;
    atividade: any;
    vistoria: any;
    vistoriaImoveis: IVistoriaImovel[] = [];

    constructor(private navCtrl: NavController, private navParams: NavParams, private loadingController: LoadingController, private imovelDAO: ImovelDAO, private atividadeDAO: AtividadeDAO, private vistoriaDAO: VistoriaDAO, private bairroDAO: BairroDAO) {
        this._navCtrl = navCtrl;
        this._bairroId = "8"; // this.navParams.get('bairroId');
        this.bairro = this.bairroDAO._bairros.filter(r =>  r.bairCodigo == this._bairroId);
        this._tipat_codigo = 2;        
    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {
             this.imoveis = this.imovelDAO._imoveis.filter(r => r.bairCodigo = this._bairroId);

             this.imoveis.forEach(i => {
                 var vI = new IVistoriaImovel();
                 vI.imovel = i;
                 if (this.bairro.length > 0){
                    vI.bairro = this.bairro[0];
                 }
                 this.vistoria = this.vistoriaDAO._vistoria.filter(r=> r.imov_id === i._id && r.tipat_codigo === this._tipat_codigo);
                 
                 console.log("-- Vistoria - Tratamento Vetorial -- Imovel:" + i._id);
                 console.log(this.vistoria);
                 if (this.vistoria.length > 0){
                     vI.vistoria = this.vistoria[0];
                 }

                 this.vistoriaImoveis.push(vI);                 
             });

             loader.dismiss();
        });       
    }

    goToVistoria(imovelId) {
        this.navCtrl.push(VistoriaPesquisaPage, {
            imovelId: imovelId
        });
    }
    
}
