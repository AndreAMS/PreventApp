import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { IImovel } from '../../models/imovel.model';
import { RegiaoDAO } from '../../dao/regiao.dao';
import { BairroDAO } from '../../dao/bairro.dao';
import { ImovelDAO } from '../../dao/imoveis.dao';
import { HomePage } from '../../pages/home/home';
import { QRCodeComponent } from 'angular2-qrcode';
import { BarcodeScanner } from 'ionic-native';
import { UUID } from 'angular2-uuid';

@Component({
    templateUrl: 'cadastroImoveis.html'
})
export class CadastroImoveisPage {

    regioes: any;
    bairros: any;
    imovel: {};
    escaneado: Boolean;
    informarCodigo: Boolean;
    codigo: string;
    codigoManual: string;

    private _navCtrl: NavController;

    constructor(private navCtrl: NavController, private regiaoDAO: RegiaoDAO, private bairroDAO: BairroDAO, private imovelDAO: ImovelDAO, private loadingController: LoadingController) {
        this._navCtrl = navCtrl;
        this.imovel = {};
        this.escaneado = false;
        this.informarCodigo = false;
        this.codigoManual = "";
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
        var i = <IImovel>this.imovel;
        i.Codigo = UUID.UUID();  

        if (this.codigo == null)
            i.BarcodeData = this.codigoManual;
        else
            i.BarcodeData = this.codigo;            
        
        this.imovelDAO.add(i);
        
        this.navCtrl.push(HomePage);
    }

    escanearCodigo() {
        this.escaneado = true;
        this.codigo = "teste";
        BarcodeScanner.scan()
            .then((result) => {
                if (!result.cancelled) {
                    var barcodeCode = new BarcodeData(result.text, result.format);
                    this.codigo = <string>barcodeCode.text;
                    this.escaneado = true;
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    abrirAreaDigitacao() {
        if (this.informarCodigo)
            this.informarCodigo = false;
        else
            this.informarCodigo = true;
    }

}

export class BarcodeData {
  constructor(
    public text: String,
    public format: String
  ) {}
}