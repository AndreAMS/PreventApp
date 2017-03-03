import { IVistoria } from '../../models/vistoria.model';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { AtividadeDAO } from '../../dao/atividade.dao';
import { VistoriaDAO } from '../../dao/vistoria.dao';
import { IVistoriaImovel } from '../../models/vistoriaImovel.model';
import { VistoriaPage } from '../vistoria/vistoria';
import { BarcodeScanner } from 'ionic-native';

@Component({
    templateUrl: 'tratamentoVetorial.html'
})
export class TratamentoVetorialPage {

    private _navCtrl: NavController;
    private _bairroId: string;
    private _atividadeId: string;
    imoveis: any;
    atividade: any;
    vistorias: any;
    vistoriaImoveis: IVistoriaImovel[] = [];

    constructor(private navCtrl: NavController, private navParams: NavParams, private loadingController: LoadingController, private imovelDAO: ImovelDAO, private atividadeDAO: AtividadeDAO, private vistoriaDAO: VistoriaDAO) {
        this._navCtrl = navCtrl;
        this._bairroId = this.navParams.get('bairroId');
        this._atividadeId = this.navParams.get('atividadeId');
    }

    ionViewDidLoad() {
        let loader = this.loadingController.create({
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
        });
    }

    goToVistoria(imovelId) {
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
                    const barcodeData = new BarcodeData(result.text, result.format);
                    //this.scanDetails(barcodeData);
                    console.log(barcodeData);
                }
            })
            .catch((err) => {
                alert(err);
            })
    }

}

export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}