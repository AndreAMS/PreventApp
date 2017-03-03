import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegiaoDAO } from '../../dao/regiao.dao';
import { BairroDAO } from '../../dao/bairro.dao';
import { QRCodeComponent } from 'angular2-qrcode';
import { BarcodeScanner } from 'ionic-native';

@Component({
    templateUrl: 'cadastroImoveis.html'
})
export class CadastroImoveisPage {

    regioes: any;
    bairros: any;
    imovel: {};

    private _navCtrl: NavController;

    constructor(private navCtrl: NavController, private regiaoDAO: RegiaoDAO, private bairroDAO: BairroDAO, private loadingController: LoadingController) {
        this._navCtrl = navCtrl;
        this.imovel = {};
    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Carregando os parametros...',
            spinner: 'dots'
        });

        loader.present().then(() => {
            this.regiaoDAO.getAll().then(data => {
                this.regioes = data;
                loader.dismiss();
            });
        });
    }

    loadBairro(id) {

        let loader = this.loadingController.create({
            content: 'Carregando os bairros...',
            spinner: 'dots'
        });

        loader.present().then(() => {
            this.bairroDAO.getByRegion(id).then(data => {
                this.bairros = data;
                loader.dismiss();
            });
        });

    }

    cadastrar() {
        console.log(this.imovel);
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