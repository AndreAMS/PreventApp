import { IVistoria } from '../../models/vistoria.model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { AtividadeDAO } from '../../dao/atividade.dao';
import { VistoriaDAO } from '../../dao/vistoria.dao';
import { BairroDAO } from '../../dao/bairro.dao';
import { IVistoriaImovel } from '../../models/vistoriaImovel.model';
import { VistoriaPage } from '../vistoria/vistoria';
import { HomePage } from '../home/home';
import { BarcodeScanner } from 'ionic-native';

@Component({
    templateUrl: 'tratamentoVetorial.html'
})
export class TratamentoVetorialPage {

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
        this._tipat_codigo = 1;        
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

        /*let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {

            this.atividadeDAO.getById(this._atividadeId).then(data => {
                this.atividade = data;
            });

            this.vistoriaDAO.getAll().then(data => {
                this.vistorias = data;

                this.imovelDAO.getAll().then(imovelData => {

                    imovelData.forEach(d => {
                        var vI = new IVistoriaImovel();
                        vI.imovel = d;

                        var stop: Boolean;
                        stop = false;

                        this.vistorias.forEach(v => {
                            if (!stop) {
                                if (v.ImovelId == d.Codigo) {
                                    stop = true;
                                    vI.vistoria = v;
                                }
                            }
                        });

                        this.vistoriaImoveis.push(vI);
                    });

                    loader.dismiss();
                });

            });
        });*/
    }

    goToVistoria(imovelId) {
        this.navCtrl.push(VistoriaPage, {
            imovelId: imovelId
        });
    }

    /*goToVistoria(imovelId) {
        this.navCtrl.push(VistoriaPage, {
            imovelId: imovelId,
            vistoriaId: 0,
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }

    editarVistoria(imovelId, vistoriaId) {
        this.navCtrl.push(VistoriaPage, {
            imovelId: imovelId,
            vistoriaId: vistoriaId,
            bairroId: this._bairroId,
            atividadeId: this._atividadeId
        });
    }

    getVistoriaByImovel(imovelId): any {
        var stop: Boolean;
        stop = false;

        this.vistorias.forEach(d => {
            if (!stop) {
                if (d.ImovelId === imovelId) {
                    stop = true;
                    console.log(d);
                    return d;
                }
            }
        });

        return null;
    }

    escanearCodigo() {
        BarcodeScanner.scan()
            .then((result) => {
                if (!result.cancelled) {
                    var barcodeCode = new BarcodeData(result.text, result.format);

                    this.imovelDAO.getByBarcodeCode(<string>barcodeCode.text).then(data => {

                        var stop: Boolean;
                        stop = false;

                        this.vistorias.forEach(d => {
                            if (!stop) {
                                if (d.ImovelId === data.Codigo) {
                                    stop = true;

                                    this.navCtrl.push(VistoriaPage, {
                                        imovelId: data.Codigo,
                                        vistoriaId: d.Codigo,
                                        bairroId: this._bairroId,
                                        atividadeId: this._atividadeId
                                    });

                                    return d;
                                }
                            }
                        });

                        if (stop == false) {
                            this.navCtrl.push(VistoriaPage, {
                                imovelId: data.Codigo,
                                vistoriaId: 0,
                                bairroId: this._bairroId,
                                atividadeId: this._atividadeId
                            });
                        }


                    });
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    getStyle(status) {
        if (status == "Realizada") {
            return "rgba(0,205,155,0.1)";
        } else {
            return "rgba(255,0,0,0.3)";
        }
    }

    goToHome() {
        this.navCtrl.push(HomePage);
    }*/

}

export class BarcodeData {
    constructor(
        public text: String,
        public format: String
    ) { }
}