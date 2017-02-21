import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RegiaoDAO } from '../../dao/regiao.dao';
import { BairroDAO } from '../../dao/bairro.dao';

@Component({
    templateUrl: 'cadastroImoveis.html'
})
export class CadastroImoveisPage {

    regioes: any;
    bairros: any;

    private _navCtrl: NavController;

    constructor(private navCtrl: NavController, private regiaoDAO: RegiaoDAO, private bairroDAO: BairroDAO, private loadingController: LoadingController) {
        this._navCtrl = navCtrl;
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

}
