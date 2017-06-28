import { Component } from '@angular/core';

import { NavController, NavParams, Alert, Platform, LoadingController } from 'ionic-angular';
import { CadastroImoveisPage } from '../cadastroImoveis/cadastroImoveis';
import { PesquisaLarvarialPage } from '../pesquisaLarvarial/pesquisaLarvarial';
import { TratamentoVetorialPage } from '../tratamentoVetorial/tratamentoVetorial';
import { PlanejamentoDAO } from '../../dao/planejamento.dao';
import { IPlanejamento } from '../../models/planejamento.model';
import { SyncService } from '../../services/sync.service';

declare var navigator: any;
declare var Connection: any;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    private _token: string;
    planejamento: any;

    constructor(public navCtrl: NavController, private navParams: NavParams, private platform: Platform, private syncService: SyncService, private loadingController: LoadingController, private planejamentoDAO: PlanejamentoDAO) {
        this._token = this.navParams.get('token');
    }

    ionViewDidLoad() {

        let loader = this.loadingController.create({
            content: 'Sincronizando as informações...',
            spinner: 'dots'
        });

        loader.present().then(() => {
            this.syncService.sincronizar(this._token).then(a => {
                this.planejamento = this.planejamentoDAO._planejamentos; 
                loader.dismiss();
            });
        });

    }

    atualizar() {
        this.syncService.enviar(this._token);
    }

    goToCadastro() {
        this.navCtrl.push(CadastroImoveisPage);
    }

    goToPesquisaLarvarial(bairroId) {
        this.navCtrl.push(PesquisaLarvarialPage, {
            bairroId: bairroId
        });
    }

    goToTratamentoVetorial(bairroId) {
        this.navCtrl.push(TratamentoVetorialPage, {
            bairroId: bairroId
        });
    }

}
